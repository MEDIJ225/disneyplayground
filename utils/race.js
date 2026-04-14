import isLowerEnv from './envs.js';

const getRaceRegistrationLink = (eventId) => `https://${isLowerEnv() ? 'stage-' : ''}registration.rundisney.com/?event=${eventId}`;

export default getRaceRegistrationLink;
