import io from 'socket.io-client';
import State from './State';
import Emitter from './Emitter';

// connect to service
let socket = io('https://minecraftchat.net');

/**
 * Emitted when the minecraft client succesfully connects to server
 */
socket.on('bot:connect', (data) => {
  if (window.cordova) {
    window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
  }
  State.set('connecting', false);
  State.set('connected', {
    host: data.host,
    port: data.port,
    username: data.username
  });
  console.log('bot connected');
});

/**
 * Emitted when the miencraft client disconnects from the server
 */
socket.on('bot:disconnect', () => {
  if (window.cordova) {
    window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
  }
  State.set('messages', []);
  State.set('connecting', false);
  State.set('connected', false);
  console.log('bot disconnected');
});

/**
 * Emitted when the socket gets disconnected
 */
socket.on('disconnect', () => {
  if (window.cordova) {
    window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
  }
  State.set('messages', []);
  State.set('connecting', false);
  State.set('connected', false);
  console.log('socket disconnected');
});

/**
 * Emitted when the minecraft client recieves a message
 */
socket.on('bot:message', (message) => {
  State.select('messages').push(message);
  Emitter.emit('newMessage');
});

/**
 * Emitted when the minecraft client encounters an error
 */
socket.on('buffer:error', function(error) {
  if (typeof error === 'object') {
    switch (error.code) {
      case 'ENOTFOUND':
        error = 'The server hostname could not be resolved.';
        break;
      case 'ETIMEDOUT':
        error = 'Connection to the server timed out.';
        break;
      case 'ECONNREFUSED':
        error = 'Connection to the server has been refused.';
        break;
      default:
        error = JSON.stringify(error);
        break;
    }
  }
  if (navigator.notification) {
    navigator.notification.alert(error, () => {
      State.set('connecting', false);
      State.set('connected', false);
    }, 'Error');
  }
});


export default socket;
