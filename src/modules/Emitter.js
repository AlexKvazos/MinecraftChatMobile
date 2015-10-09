/**
 * Application's global event emitter
 */

import { EventEmitter } from 'events';

const emitter = new EventEmitter();
emitter.setMaxListeners(0);

export default emitter;
