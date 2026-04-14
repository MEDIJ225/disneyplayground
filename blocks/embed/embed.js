/*
 * Embed Block
 * Show videos and social posts directly on your page
 * https://www.hlx.live/developer/block-collection/embed
 */

const loadScript = (url, callback, type) => {
  const head = document.querySelector('head');
  const script = document.createElement('script');
  script.src = url;
  if (type) {
    script.setAttribute('type', type);
  }
  script.onload = callback;
  head.append(script);
  return script;
};

const getDefaultEmbed = (url) => `<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;">
  <iframe src="${url.href}" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" allowfullscreen=""
  scrolling="no" allow="encrypted-media" title="Content from ${url.hostname}" loading="lazy">
  </iframe>
  </div>`;

const embedYoutube = (url, autoplay) => {
  const usp = new URLSearchParams(url.search);
  const suffix = autoplay ? '&muted=1&autoplay=1' : '';
  let vid = usp.get('v') ? encodeURIComponent(usp.get('v')) : '';
  const embed = url.pathname;
  if (url.origin.includes('youtu.be')) {
    [, vid] = url.pathname.split('/');
  }
  const embedHTML = `<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;">
  <iframe src="https://www.youtube.com${vid ? `/embed/${vid}?rel=0&v=${vid}${suffix}` : embed}" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;"
  allow="autoplay; fullscreen; picture-in-picture; encrypted-media; accelerometer; gyroscope; picture-in-picture" allowfullscreen="" scrolling="no" title="Content from Youtube" loading="lazy"></iframe>
  </div>`;
  return embedHTML;
};

const embedVimeo = (url, autoplay) => {
  const [, video] = url.pathname.split('/');
  const suffix = autoplay ? '?muted=1&autoplay=1' : '';
  const embedHTML = `<div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;">
  <iframe src="https://player.vimeo.com/video/${video}${suffix}"
  style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;"
  frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen
  title="Content from Vimeo" loading="lazy"></iframe>
  </div>`;
  return embedHTML;
};

const embedTwitter = (url) => {
  const embedHTML = `<blockquote class="twitter-tweet"><a href="${url.href}"></a></blockquote>`;
  loadScript('https://platform.twitter.com/widgets.js');
  return embedHTML;
};

const embedGiphy = (url) => {
  // Extract the gif ID from various Giphy URL formats
  // https://giphy.com/embed/ghXSaacPodnRm
  // https://giphy.com/gifs/some-title-ghXSaacPodnRm
  // https://media.giphy.com/media/ghXSaacPodnRm/giphy.gif
  let giphyId = '';

  if (url.pathname.includes('/embed/')) {
    // Format: https://giphy.com/embed/ID
    [, giphyId] = url.pathname.split('/embed/');
  } else if (url.pathname.includes('/gifs/')) {
    // Format: https://giphy.com/gifs/title-ID
    const parts = url.pathname.split('/gifs/')[1].split('-');
    giphyId = parts[parts.length - 1];
  } else if (url.pathname.includes('/media/')) {
    // Format: https://media.giphy.com/media/ID/giphy.gif
    [giphyId] = url.pathname.split('/media/')[1].split('/');
  }

  // Default dimensions - can be customized
  const width = 480;
  const height = 267;

  const embedHTML = `<div style="width: 100%; height: 0; padding-bottom: ${(height / width) * 100}%; position: relative;">
    <iframe src="https://giphy.com/embed/${giphyId}"
    width="100%" height="100%"
    style="position: absolute; top: 0; left: 0;"
    frameBorder="0"
    class="giphy-embed"
    allowFullScreen
    title="Content from Giphy"
    loading="lazy"></iframe>
  </div>
  <a href="https://giphy.com/${giphyId}" target="_blank" rel="noopener noreferrer">via GIPHY</a>`;
  return embedHTML;
};

const embedInstagram = (url) => {
  // Extract the post ID from Instagram URL
  // Format: https://www.instagram.com/p/POST_ID/
  const postMatch = url.pathname.match(/\/p\/([^/]+)/);
  const postId = postMatch ? postMatch[1] : '';
  const permalink = `https://www.instagram.com/p/${postId}/`;

  // Use Instagram's official blockquote embed method (includes captions automatically)
  const embedHTML = `<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="${permalink}" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:calc(100% - 2px);"></blockquote>`;
  return embedHTML;
};

const loadEmbed = (block, link, autoplay) => {
  if (block.classList.contains('embed-is-loaded')) {
    return;
  }

  const EMBEDS_CONFIG = [
    {
      match: ['youtube', 'youtu.be'],
      embed: embedYoutube,
    },
    {
      match: ['vimeo'],
      embed: embedVimeo,
    },
    {
      match: ['twitter'],
      embed: embedTwitter,
    },
    {
      match: ['giphy'],
      embed: embedGiphy,
    },
    {
      match: ['instagram'],
      embed: embedInstagram,
    },
  ];

  const config = EMBEDS_CONFIG.find((e) => e.match.some((match) => link.includes(match)));
  const url = new URL(link);
  if (config) {
    block.innerHTML = config.embed(url, autoplay);
    block.classList = `block embed embed-${config.match[0]}`;
    // Load Instagram embed script for blockquote method
    if (config.match[0] === 'instagram') {
      const existingScript = document.querySelector('script[src*="instagram.com/embed.js"]');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = '//www.instagram.com/embed.js';
        script.async = true;
        script.onload = () => {
          if (window.instgrm && window.instgrm.Embeds) {
            window.instgrm.Embeds.process();
          }
        };
        document.head.appendChild(script);
      } else if (window.instgrm && window.instgrm.Embeds) {
        window.instgrm.Embeds.process();
      }
    }
  } else {
    block.innerHTML = getDefaultEmbed(url);
    block.classList = 'block embed';
  }
  block.classList.add('embed-is-loaded');
};

export default function decorate(block) {
  const placeholder = block.querySelector('picture');
  const link = block.querySelector('a').href;
  block.textContent = '';

  if (placeholder) {
    const wrapper = document.createElement('div');
    wrapper.className = 'embed-placeholder';
    wrapper.innerHTML = '<div class="embed-placeholder-play"><button type="button" title="Play"></button></div>';
    wrapper.prepend(placeholder);
    wrapper.addEventListener('click', () => {
      loadEmbed(block, link, true);
    });
    block.append(wrapper);
  } else {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        observer.disconnect();
        loadEmbed(block, link);
      }
    });
    observer.observe(block);
  }
}
