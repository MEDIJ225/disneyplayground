import { getMetadata, fetchPlaceholders } from '../../scripts/aem.js';
import { createElement, createIcon } from '../../utils/dom.js';
import { formatCategoryLabel, navigateToBlogWithParams } from '../../blocks/blog-filter/blog-filter.js';
import createShareButton from '../../utils/share.js';
import { getTag } from '../../utils/taxonomy.js';

export default async function decorateBlogPostTemplate() {
  const placeholders = await fetchPlaceholders();
  const authorTag = getMetadata('author');
  const date = getMetadata('date');
  const main = document.querySelector('main');
  const firstSection = main.querySelector('.section:first-of-type');
  // If first section contains crisis-messaging-container, pick second section
  const hero = firstSection && firstSection.classList.contains('crisis-messaging-container')
    ? firstSection.nextElementSibling
    : firstSection;

  const heroImg = hero?.querySelector('picture img');
  if (heroImg) {
    heroImg.setAttribute('loading', 'eager');
  }

  const byText = placeholders.by || 'by';

  const authorData = await getTag(authorTag);
  const authorName = authorData ? authorData.title : authorTag;
  // Check if authorName contains "rundisney" and replace with <em>run</em>Disney
  // eslint-disable-next-line no-unused-vars, max-len
  // const authorNameLower = authorName ? authorName.toLowerCase() : '';
  // eslint-disable-next-line no-unused-vars, max-len
  // const iauthorName = authorNameLower.includes('rundisney') ? authorName.replace('run', '<em>run</em>') : authorName;

  const blogPostInfo = createElement('div', { class: 'blog-post-info' }, [
    createElement('div', { class: 'stay-connected' }, [
      createElement('div', { class: 'social-media' }, [
        createElement('span', { class: 'stay-connected-label' }, placeholders.stayConnected || 'Stay Connected'),
        createElement('div', { class: 'social-icons' }, [
          createElement('a', { href: placeholders.followRundisneyFacebookUrl || 'https://www.facebook.com/RunDisney/', target: '_blank', 'aria-label': placeholders.followRundisneyFacebook || 'Follow RunDisney on Facebook' }, [createIcon('facebook'), createElement('span', {}, 'Facebook')]),
          createElement('a', { href: placeholders.followRundisneyInstagramUrl || 'https://www.instagram.com/rundisney/', target: '_blank', 'aria-label': placeholders.followRundisneyInstagram || 'Follow RunDisney on Instagram' }, [createIcon('instagram'), createElement('span', {}, 'Instagram')]),
          createElement('a', { href: placeholders.subscribeRundisneyYoutubeUrl || 'https://www.youtube.com/user/runDisney', target: '_blank', 'aria-label': placeholders.subscribeRundisneyYoutube || 'Subscribe to RunDisney on YouTube' }, [createIcon('youtube'), createElement('span', {}, 'YouTube')]),
        ]),
      ]),
      createElement('div', { class: 'share' }, [
        createShareButton(),
      ]),
    ]),
    createElement('div', { class: 'blog-metadata' }, [
      createElement(
        'div',
        {
          class: ['author', authorName && authorName.toLowerCase() !== 'rundisney' ? 'author-other' : null].filter(Boolean),
          ...(authorName ? { 'aria-label': `${byText} ${authorName}` } : {}),
        },
        // eslint-disable-next-line no-unused-vars, max-len
        // [
        // eslint-disable-next-line max-len
        //   createElement('img', { src: '/images/Navy_Mickey.jpg', alt: 'Mickey Mouse Running', class: 'author-image' }),
        //   createElement('span', {}, `${byText} ${iauthorName}`)],
      ),
      createElement('div', { class: 'date' }, [
        createElement('span', {}, date),
      ]),
    ]),
  ]);

  const featuredBlogsWrapper = main.querySelector('.featured-blogs-container');
  const tags = getMetadata('article:tag');
  const postTags = tags.split(',').map((tag) => tag.trim());

  if (featuredBlogsWrapper) {
    const viewAllPostsIn = placeholders.viewAllPostsIn || 'View all posts in';
    const categorySuffix = placeholders.categorySuffix || 'category';

    const categoryElements = await Promise.all(postTags.map(async (tag, index) => {
      const tagData = await getTag(tag);
      const displayName = tagData ? tagData.title : formatCategoryLabel(tag);

      const tagLink = createElement('a', {
        href: '#',
        title: `${viewAllPostsIn} ${displayName}`,
        'aria-label': `${viewAllPostsIn} ${displayName} ${categorySuffix}`,
      }, displayName);

      tagLink.addEventListener('click', (e) => {
        e.preventDefault();
        navigateToBlogWithParams([tag], []);
      });

      if (index < postTags.length - 1) {
        return [tagLink, createElement('span', {}, ', ')];
      }

      return tagLink;
    }));

    const categoriesElement = createElement('div', { class: 'post-categories' }, [
      createElement('span', { class: 'categories-label' }, placeholders.categoriesLabel || 'Categories:'),
      createElement('div', {}, categoryElements.flat()),
    ]);

    // Create author h2 element above post-categories
    if (authorName) {
      const authorH2 = createElement('h3', { class: 'article-author' }, `${authorName}`);
      featuredBlogsWrapper.before(authorH2);
    }

    featuredBlogsWrapper.before(categoriesElement);
  }

  hero.append(blogPostInfo);

  const blogLink = createElement('a', {
    href: '/blog',
    'aria-label': placeholders.blogTitle || 'Disney Meetings & Events Blog',
  }, placeholders.blogTitle || 'Disney Meetings & Events Blog');

  hero.prepend(createElement('div', { class: 'blog-post-title' }, blogLink));
}
