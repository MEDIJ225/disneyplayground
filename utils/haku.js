import { fetchPlaceholders } from '../scripts/aem.js';
import isLowerEnv from './envs.js';

/**
 * Get the Haku API endpoint from placeholders
 * @returns {Promise<string>} The Haku API endpoint URL
 */
async function getHakuEndpoint() {
  const placeholders = await fetchPlaceholders();
  return `${isLowerEnv() ? placeholders.hakuEndpointLower : placeholders.hakuEndpoint}`;
}

/**
 * Fetch event category data from the Haku API
 * @param {string} eventId - The event ID
 * @returns {Promise<any>} The event categories data
 */
export default async function fetchEventCategories(eventId) {
  const endpoint = await getHakuEndpoint();
  if (!endpoint) {
    throw new Error('Haku endpoint not configured');
  }

  const url = `${endpoint}/events/${eventId}/event_categories`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Haku API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
