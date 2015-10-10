import io from 'socket.io-client';
import { State } from '../modules';

// connect to service
let socket = io('https://minecraftchat.net');

// save connection state on connect
socket.on('bot:connect', (data) => {
  State.set('connecting', false);
  State.set('connected', {
    host: data.host,
    port: data.port,
    username: data.username
  });
});

socket.on('bot:disconnect', () => {
  State.set('connecting', false);
  State.set('connected', false);
});

socket.on('disconnect', () => {
  State.set('connecting', false);
  State.set('conected', false);
});

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

let SocketActions = {

  /**
   * Connecto to a server
   * @param  {int}    serverIndex  Server index
   * @param  {int}    accountIndex Account index
   */
  connect(server, account) {

    if (!socket.connected) {
      if (navigator.notification) {
        navigator.notification.alert(
          'The server is unreachable. Please try again later...',
          () => {},
          'Error'
        );
      }
      return;
    }

    State.set('connecting', true);
    socket.emit('server:connect', {
      username: account.username,
      password: account.password,
      hostname: server.ip.indexOf(':') > -1 ? server.ip.split(':')[0] : server.ip,
      port: server.ip.indexOf(':') > -1 ? server.ip.split(':')[1] : 25565
    });
  },

  /**
   * Only way to be 100% sure that we do not connect is to reinitilize
   * the socket connection. Any other method can leak memory on the server
   * and/or client.
   */
  cancelConnect() {
    socket.disconnect();
    socket.connect();
  }

};

export default SocketActions;
