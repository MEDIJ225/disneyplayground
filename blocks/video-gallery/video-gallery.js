import { getYouTubeVideoId } from '../video/video.js';
import { createElement } from '../../utils/dom.js';
import createShareButton from '../../utils/share.js';

function isMp4Url(url) {
  return url && url.trim().toLowerCase().endsWith('.mp4');
}

function getThumbnailSrc(video) {
  const { url } = video;
  const thumb = video.thumbnail;
  let thumbSrc;

  if (isMp4Url(url)) {
    // MP4 case
    thumbSrc = thumb;
  } else {
    // YouTube case
    const vid = getYouTubeVideoId(url);
    const quality = thumb === 'high' ? 'hqdefault' : 'mqdefault';
    thumbSrc = `https://img.youtube.com/vi/${vid}/${quality}.jpg`;
  }

  return thumbSrc;
}

// Fetch YouTube data
async function loadYouTubeData(block) {
  try {
    if (!block) throw new Error('YouTube gallery block not found.');

    const anchor = block.querySelector('p a');
    if (!anchor || !anchor.href) throw new Error('URL anchor not found inside the gallery block.');

    const response = await fetch(anchor.href);
    anchor.style.display = 'none';

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

// Render playlist thumbnails
function renderPlaylistThumbnails(videos, currentIndex, onSelect) {
  const playlistWrapper = createElement('div', { class: 'video-player__playlist' });

  videos.forEach((video, i) => {
    // Create wrapper for the thumbnail image (pseudo-elements will be applied to this wrapper)
    const thumbWrapper = createElement('div', {
      class: 'video-player__playlist-thumb-wrapper', // wrapper class
    });

    const thumbImg = createElement('img', {
      src: getThumbnailSrc(video),
      alt: video.title || `Video ${i + 1}`,
      class: 'video-player__playlist-thumb-img',
      loading: 'lazy',
    });

    // mark active wrapper
    if (i === currentIndex) {
      thumbWrapper.classList.add('active');
    }

    // Click handling
    thumbWrapper.addEventListener('click', () => {
      if (i !== currentIndex) onSelect(i);
    });

    // Append image into wrapper, and wrapper into playlist
    thumbWrapper.appendChild(thumbImg);
    playlistWrapper.appendChild(thumbWrapper);
  });

  // Always scroll to the start
  playlistWrapper.scrollLeft = 0;

  return playlistWrapper;
}

function renderVideoPlayer(videos, videoIndex) {
  const video = videos[videoIndex];
  const vid = getYouTubeVideoId(video.url);
  const title = video.title || '';

  const section = document.querySelector('.section.video-gallery-container');
  if (!section) return;
  const main = document.querySelector('main');
  if (!main) return;

  // Hide hero image if present
  const heroPicture = main.querySelector('picture');
  if (heroPicture) heroPicture.style.display = 'none';

  // Remove old player if any
  const existingPlayer = main.querySelector('.video-player__outer');
  if (existingPlayer) existingPlayer.remove();

  // Create outer container
  const playerOuter = createElement('div', { class: 'video-player__outer section' });

  // Create inner constrained container
  const playerContainer = createElement('div', { class: 'video-player__container' });

  // Title
  const videoTitle = createElement('div', { class: 'video-player__title' }, title);

  // Close button
  const closeButton = createElement('button', {
    class: 'video-player__close-button',
    'aria-label': 'Close video player',
  }, '×');
  closeButton.addEventListener('click', () => {
    playerOuter.remove();
    if (heroPicture) heroPicture.style.display = '';
  });

  let playerElement;

  // If MP4 link
  if (isMp4Url(video.url)) {
    playerElement = createElement('video', {
      src: video.url,
      controls: 'true',
      autoplay: 'true',
      playsinline: 'true',
      class: 'video-player__html5',
    });

    const shareBtn = createShareButton();
    shareBtn.classList.add('video-share');

    playerContainer.appendChild(shareBtn);
  } else if (vid) {
    // YouTube iframe
    playerElement = createElement('iframe', {
      src: `https://www.youtube.com/embed/${vid}?autoplay=1&modestbranding=1&rel=0&controls=1&showinfo=0&iv_load_policy=3`,
      title,
      frameborder: '0',
      allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
      allowfullscreen: '',
      class: 'video-player__iframe',
    });
  }
  // Navigation
  const nav = createElement('div', { class: 'video-player__nav' });
  const prevBtn = createElement('button', { class: 'video-player__nav--prev', 'aria-label': 'Previous video' }, '‹');
  const nextBtn = createElement('button', { class: 'video-player__nav--next', 'aria-label': 'Next video' }, '›');

  prevBtn.disabled = videoIndex === 0;
  nextBtn.disabled = videoIndex === videos.length - 1;

  prevBtn.addEventListener('click', () => renderVideoPlayer(videos, videoIndex - 1));
  nextBtn.addEventListener('click', () => renderVideoPlayer(videos, videoIndex + 1));

  nav.append(prevBtn, nextBtn);

  // Playlist thumbnails
  const playlist = renderPlaylistThumbnails(
    videos,
    videoIndex,
    (newIndex) => renderVideoPlayer(videos, newIndex),
  );

  // 🎯 Label above the first thumbnail: "All (X)"
  const totalLabel = createElement(
    'div',
    { class: 'video-player__playlist-label' },
    `All (${videos.length})`,
  );

  // Assemble
  playerContainer.append(videoTitle, closeButton, playerElement, totalLabel, playlist);

  playerOuter.append(playerContainer, nav);

  // ✅ Insert video player into <main> (before all content)
  main.insertBefore(playerOuter, main.firstChild);

  playerOuter.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}

// Create a video thumbnail
function createVideoItem(video, videoIndex, videos) {
  const title = video.title || '';
  const caption = video.caption || '';
  const duration = video.duration || '';

  const item = createElement('div', { class: 'video-gallery__item' });
  const thumb = createElement('div', { class: 'video-gallery__thumb' });

  const img = createElement('img', {
    src: getThumbnailSrc(video),
    alt: title,
    loading: 'lazy',
    class: 'video-gallery__thumbnail',
  });

  thumb.appendChild(img);

  if (duration) {
    const durationDiv = createElement('div', { class: 'video-gallery__duration' }, duration);
    thumb.appendChild(durationDiv);
  }

  thumb.addEventListener('click', () => {
    renderVideoPlayer(videos, videoIndex);
  });

  item.appendChild(thumb);

  if (title) {
    const titleDiv = createElement('div', { class: 'video-gallery__title' }, title);
    item.appendChild(titleDiv);
  }

  if (caption) {
    const captionDiv = createElement('div', { class: 'video-gallery__caption' }, caption);
    item.appendChild(captionDiv);
  }

  return item;
}

// Load a batch of video thumbnails
function loadNextBatch(videos, container, currentIndex, batchSize, loadMoreBtn) {
  const batch = videos.slice(currentIndex.index, currentIndex.index + batchSize);
  batch.forEach((video, i) => {
    const item = createVideoItem(video, currentIndex.index + i, videos);
    container.appendChild(item);
  });
  currentIndex.index += batchSize;

  if (currentIndex.index >= videos.length) {
    loadMoreBtn.style.display = 'none';
  }
}
// Entry point
export default async function decorate(block) {
  const youtubeData = await loadYouTubeData(block);
  const videos = youtubeData?.data || [];

  if (!Array.isArray(videos) || videos.length === 0) {
    block.innerHTML = '<p>No videos available.</p>';
    return;
  }
  const container = createElement('div', { class: 'video-gallery-grid' });
  const batchSize = 4;
  const currentIndex = { index: 0 };
  const loadMoreBtn = createElement('button', { class: 'video-gallery__load-more' }, 'View More');

  loadNextBatch(videos, container, currentIndex, batchSize, loadMoreBtn);
  loadMoreBtn.addEventListener('click', () => {
    loadNextBatch(videos, container, currentIndex, batchSize, loadMoreBtn);
  });
  const wrapper = createElement('div');
  wrapper.append(container, loadMoreBtn);
  block.appendChild(wrapper);
}
