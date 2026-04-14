// add delayed functionality here
/* global WDPRO */

import { loadScript } from './aem.js';
import {
  findClosestHeading,
  processLinkTextWithHeading,
  cleanTextWithHyphens,
} from '../utils/analyticsModifier.js';
import isLowerEnv from '../utils/envs.js';

/**
 * Adds name attribute and click tracking to all <a> tags
 * Name attribute format: &lid=RN_{pageType}_{linkText}
 * RN is static, pageType from URL path (1st segment), linkText is cleaned HTML text
 */
function setupLinkTracking() {
  // Get page type from URL path - extract 1st segment after root
  // e.g., /events/disneyworld/... -> 'events'
  const pathSegments = window.location.pathname.split('/').filter((segment) => segment);
  const pageType = pathSegments.length > 0 ? pathSegments[0].toLowerCase() : 'homepage';

  // Process all anchor tags
  document.querySelectorAll('a').forEach((link) => {
    // Skip if element has blog-home-clear-filters class
    if (link.classList.contains('blog-home-clear-filters')) {
      return;
    }

    // Skip if link is inside header tag
    if (link.closest('header')) {
      return;
    }

    // Add name attribute if it doesn't exist
    if (!link.hasAttribute('name')) {
      // Get link text and clean it
      let linkText = '';

      // Get text content, removing HTML tags and extra whitespace
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = link.innerHTML;
      linkText = tempDiv.textContent || tempDiv.innerText || '';

      // Find the closest heading and process link text with heading context
      // Skip heading text if link is inside .footer-links
      const isInFooterLinks = link.closest('.footer-links');
      if (isInFooterLinks) {
        // For footer links, just clean the link text without heading context
        linkText = cleanTextWithHyphens(linkText);
      } else {
        const headingText = findClosestHeading(link);
        linkText = processLinkTextWithHeading(linkText, headingText);
      }

      // If no text content, try to use title or href as fallback
      if (!linkText) {
        linkText = link.title || link.getAttribute('aria-label') || 'Link';
        linkText = linkText
          .replace(/[^a-zA-Z0-9\s]/g, '')
          .replace(/\s+/g, ' ')
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join('')
          .replace(/\s/g, '');
      }

      // Set the name attribute with format: &lid=RN_{pageType}_{linkText}
      if (linkText) {
        link.setAttribute('name', `&lid=RD_${pageType}_${linkText}`);
      }
    }

    // Add click tracking
    link.addEventListener('click', function handleLinkClick() {
      if (window.s_wdpro && typeof window.s_wdpro.trackClick === 'function') {
        window.s_wdpro.trackClick(this);
      }
    });
  });
}

// Setup link tracking (name attributes and click tracking)
setupLinkTracking();

(async () => {
  // add martech tags to the page
  await loadScript(`https://${isLowerEnv() ? 'stage.' : ''}go4.disney.go.com/`);
  // delay remaining initialization by 3 seconds
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });

  // pathSegments
  const pathSegments = window.location.pathname.split('/').filter((segment) => segment);
  // Calculate pageId: last path segment, or "home" if path is empty or just "/"
  let pageId = 'home';
  if (pathSegments.length > 0) {
    pageId = pathSegments[pathSegments.length - 1];
  }

  // Calculate siteSections: "content" + pathname without last segment
  let siteSections = 'content';
  if (pathSegments.length > 1) {
    // Get all segments except the last one
    const pathWithoutLast = pathSegments.slice(0, -1).join('/');
    siteSections = `content/${pathWithoutLast}`;
  }

  const DFTWH = [];

  // Determine report suite based on origin
  const { origin } = window.location;
  const reportSuiteId = origin === 'https://www.disneymeetingsandevents.com'
    ? 'wdgwdpromeetings,wdgwdprosec,wdgsec'
    : 'wdgwdpromeetingsdev,wdgwdprosecdev';

  DFTWH.data = {
    utils: {
      baseURI: 'https://www.rundisney.com',
      title: 'Run Disney',
      mediaEngineUrl: 'https://cdn1.parksmedia.wdprapps.disney.com/media/flashComponents/mediaEngine/',
      cdnUrl: 'https://cdn2.parksmedia.wdprapps.disney.com/media/dftwh/v/734.0.0.0/',
    },
    footer: {
      src: '//a.dilcdn.com/g/us/home/footer.js',
      color: 'light',
      copyright: '© Disney. All rights reserved.',
    },
    analytics: {
      pageId,
      siteSections,
      site: 'RD',
      reportSuiteId,
      configuration: [],
      properties: [],
    },
  };

  const model = {
    configuration: {
      SiteCatalyst: {
        reportSuiteId: DFTWH.data.analytics.reportSuiteId,
        SiteCatalyst: { turnOff: true },
      },
    },
    pageId: DFTWH.data.analytics.pageId,
    siteSection: DFTWH.data.analytics.siteSections,
    site: DFTWH.data.analytics.site,
  };

  if (DFTWH.data.searchAnalyticsProperties !== undefined) {
    model.internalSearchKeywords = DFTWH.data.searchAnalyticsProperties.prop7;
    model.internalSearchType = DFTWH.data.searchAnalyticsProperties.eVar5;
    model.events = 'event2';
    model.internalSearchNumResults = DFTWH.data.searchAnalyticsProperties.prop8;
    model.linkId = DFTWH.data.searchAnalyticsProperties.prop9;
  }

  // Adding custom configurations (replace $.extend)
  Object.assign(model.configuration, DFTWH.data.analytics.configuration);

  // Adding custom properties (replace $.extend)
  Object.assign(model, DFTWH.data.analytics.properties);

  if (window.WDPRO && WDPRO.Analytics && WDPRO.Analytics.Framework) {
    WDPRO.Analytics.Framework.update(model);
  }
})();
