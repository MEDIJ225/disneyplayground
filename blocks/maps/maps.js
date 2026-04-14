import { fetchPlaceholders } from '../../scripts/aem.js';
import { createElement } from '../../utils/dom.js';
import { getTag } from '../../utils/taxonomy.js';

const placeholders = await fetchPlaceholders();
let map;
let prevInfowindow = false;
let markerImage;

function loadMapScript(scriptUrl) {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve();
      return;
    }
    const mapscript = document.createElement('script');
    mapscript.src = scriptUrl;
    mapscript.async = true;
    mapscript.defer = true;
    mapscript.onload = () => resolve();
    mapscript.onerror = () => reject(new Error('Google Maps SDK failed to load.'));
    const appScript = document.querySelector('main');
    if (appScript) {
      appScript.parentNode.insertBefore(mapscript, appScript);
    } else {
      document.head.appendChild(mapscript);
    }
  });
}

function loadMapLink(linkUrl) {
  return new Promise((resolve) => {
    if (window.google && window.google.maps) {
      resolve();
      return;
    }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = linkUrl;
    document.head.appendChild(link);
  });
}

function initializeMap(mapConfig) {
  const wdwTypeOptions = {
    getTileUrl(coord, zoom) {
      const { x, y } = coord;
      const { tilesUrl } = mapConfig;
      return `${tilesUrl}/${zoom}/${x}/${y}.jpg`;
    },
    tileSize: new window.google.maps.Size(256, 256),
    maxZoom: mapConfig.maxZoom,
    minZoom: mapConfig.initialZoom,
  };
  const wdwMapType = new window.google.maps.ImageMapType(wdwTypeOptions);
  const mapOptions = {
    center: new window.google.maps.LatLng(
      mapConfig.initialCoordinates.x,
      mapConfig.initialCoordinates.y,
    ),
    zoom: mapConfig.minZoom,
    streetViewControl: false,
    mapTypeControl: false,
    panControl: false,
    zoomControl: false,
    scaleControl: false,
  };

  if (!mapConfig.isPromoUnit) {
    mapOptions.panControl = true;
    mapOptions.panControlOptions = {
      position: window.google.maps.ControlPosition.TOP_RIGHT,
    };
    mapOptions.zoomControl = true;
    mapOptions.zoomControlOptions = {
      style: window.google.maps.ZoomControlStyle.LARGE,
      position: window.google.maps.ControlPosition.TOP_RIGHT,
    };
  }

  const mapElement = document.getElementById('map-canvas');
  map = new window.google.maps.Map(mapElement, mapOptions);
  map.mapTypes.set('disneymap', wdwMapType);
  map.setMapTypeId('disneymap');
}
let tagDataArray;
async function setMarkers(rawTags) {
  const markers = [];
  tagDataArray = await Promise.all(rawTags.map((mapData) => getTag(mapData)));
  tagDataArray.forEach((tagData, index) => {
    if (tagData) {
      const mapObj = Object.fromEntries(
        tagData.map_data.split(',').map((item) => item.split('=')),
      );
      const infowindowMarker = new window.google.maps.InfoWindow({
        content: mapObj.content,
      });
      markers[index] = new window.google.maps.Marker({
        position: new window.google.maps.LatLng(mapObj.longitude, mapObj.latitude),
        map,
        icon: markerImage,
        draggable: false,
        animation: window.google.maps.Animation.DROP,
      });
      window.google.maps.event.addListener(markers[index], 'click', () => {
        if (prevInfowindow) {
          prevInfowindow.close();
        }
        prevInfowindow = infowindowMarker;
        infowindowMarker.open(map, markers[index]);
      });
      window.google.maps.event.addListener(markers[index], 'dblclick', () => {
        if (map.getZoom() < mapObj.zoom) {
          map.panTo(markers[index].getPosition());
          map.setZoom(mapObj.zoom);
        }
      });
    }
  });
}

async function getMapLocationConfig(rawTags, mapConfig) {
  tagDataArray = await Promise.all(rawTags.map((mapData) => getTag(mapData)));
  const mapObj = Object.fromEntries(tagDataArray[0].map_data.split(',').map((item) => item.split('=')));
  mapConfig.initialCoordinates.x = mapObj.longitude;
  mapConfig.initialCoordinates.y = mapObj.latitude;
  mapConfig.initialZoom = parseInt(mapObj.zoom, 10);
  mapConfig.minZoom = parseInt(mapObj.zoom, 10);
  mapConfig.content = mapObj.content;

  return mapConfig;
}

let mapConfig;
export default async function decorate(block) {
  const mapScriptUrl = placeholders?.mapScript;
  const mapLink = placeholders?.mapLink;
  const mapDiv = createElement('div', { class: 'map-canvas', id: 'map-canvas' });
  const mapTitle = createElement('div', { class: 'map-title', id: 'map-title' });
  markerImage = placeholders?.mapMarker;
  block.appendChild(mapTitle);
  block.appendChild(mapDiv);
  const mapTitleCont = document.querySelector('.map-title');
  const tagContainer = block.querySelector('div > div');
  const rawTags = tagContainer.textContent.split(',').map((t) => t.trim());
  const newSpan = createElement('span', { class: 'map-titlespan' });
  mapTitleCont.appendChild(newSpan);
  await loadMapScript(mapScriptUrl);
  await loadMapLink(mapLink);

  if (block.classList.contains('dlr')) {
    mapConfig = {
      name: 'Disneyland',
      tilesUrl: placeholders?.dlrTilesurl,
      initialCoordinates: {
        x: placeholders?.dlrLongtitude,
        y: placeholders?.dlrLatitude,
      },
      initialZoom: parseInt(placeholders?.dlrZoom, 10),
      minZoom: parseInt(placeholders?.dlrZoom, 10),
      maxZoom: 20,
      isPromoUnit: placeholders?.dlrPromounit,
    };
    if (!(rawTags) || rawTags.length === 1) {
      await getMapLocationConfig(rawTags, mapConfig);
      document.querySelector('.map-titlespan').innerHTML += mapConfig.content;
    } else {
      document.querySelector('.map-titlespan').innerHTML += 'Map';
    }
  } else if (block.classList.contains('wdw')) {
    mapConfig = {
      name: 'Walt Disney World',
      tilesUrl: placeholders?.wdwTilesurl,
      initialCoordinates: {
        x: placeholders?.wdwLongtitude,
        y: placeholders?.wdwLatitude,
      },
      initialZoom: parseInt(placeholders?.wdwZoom, 10),
      minZoom: parseInt(placeholders?.wdwZoom, 10),
      maxZoom: 20,
      isPromoUnit: placeholders?.wdwPromounit,
    };
    if (!(rawTags) || rawTags.length === 1) {
      await getMapLocationConfig(rawTags, mapConfig);
      document.querySelector('.map-titlespan').innerHTML += mapConfig.content;
    } else {
      document.querySelector('.map-titlespan').innerHTML += 'Map';
    }
  }
  initializeMap(mapConfig);
  if (mapConfig.isPromoUnit) {
    const magnifyingGlass = document.createElement('div');
    magnifyingGlass.setAttribute('class', 'map-zoom-icon');
    map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(magnifyingGlass);
  }
  await setMarkers(rawTags);
}
