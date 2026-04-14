import { createElement } from '../../utils/dom.js';
import createShareButton from '../../utils/share.js';

/**
 * Extract YouTube video ID from various URL formats
 * @param {string} url The YouTube URL
 * @returns {string|null} The video ID or null if not a YouTube URL
 */
export function getYouTubeVideoId(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/,
    /youtube\.com\/v\/([^&?/]+)/,
  ];

  let videoId = null;
  patterns.some((pattern) => {
    const match = url.match(pattern);
    if (match) {
      [, videoId] = match;
      return true;
    }
    return false;
  });

  return videoId;
}

/**
 * Check if URL is a YouTube URL
 * @param {string} url The URL to check
 * @returns {boolean} True if YouTube URL
 */
function isYouTubeUrl(url) {
  return url.includes('youtube.com') || url.includes('youtu.be');
}

/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const link = block.querySelector('a[href]');
  const videoUrl = link?.href;
  if (!videoUrl) return;

  block.textContent = '';
  const wrapper = createElement('div', { class: 'video-wrapper' });
  const shareBtn = createShareButton();
  shareBtn.classList.add('video-share');

  if (isYouTubeUrl(videoUrl)) {
    const videoId = getYouTubeVideoId(videoUrl);
    if (!videoId) return;

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    const iframe = createElement('iframe', {
      src: embedUrl,
      frameborder: '0',
      allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
      allowfullscreen: '',
      title: 'YouTube video player',
    });

    wrapper.classList.add('youtube-video');
    wrapper.append(iframe);
  } else {
    const hasPoster = videoUrl.includes('Video.mp4');
    const posterUrl = hasPoster ? videoUrl.replace('Video.mp4', 'Thumbnail.png') : null;

    const videoTitleEl = createElement('div', {
      id: 'video-title',
      class: 'sr-only',
    });

    videoTitleEl.textContent = link.getAttribute('title') || 'Video';

    const videoInstructionsEl = createElement('div', {
      id: 'video-instructions',
      class: 'sr-only',
    });

    videoInstructionsEl.textContent = 'Press Enter or Space to play or pause the video.';

    const videoEl = createElement('video', {
      src: videoUrl,
      controls: '',
      playsinline: '',
      controlsList: 'nodownload',
      preload: posterUrl ? 'metadata' : 'auto',
      ...(posterUrl ? { poster: posterUrl } : {}),
    });
    // Add ARIA programmatically
    wrapper.setAttribute('role', 'button');
    wrapper.setAttribute('aria-labelledby', 'video-title');
    wrapper.setAttribute('aria-describedby', 'video-instructions');

    wrapper.append(videoEl, videoTitleEl, videoInstructionsEl, shareBtn);
  }

  block.append(wrapper);
}
