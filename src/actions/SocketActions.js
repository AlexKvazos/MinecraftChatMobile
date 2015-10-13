import { State, Socket } from '../modules';

let SocketActions = {

  /**
   * Connect to a server
   * @param  {int}    serverIndex  Server index
   * @param  {int}    accountIndex Account index
   */
  connect(server, account) {

    if (!Socket.connected) {
      if (navigator.notification) {
        navigator.notification.alert(
          'The server is unreachable. Please try again later...',
          () => {},
          'Error'
        );
      }
      return;
    }

    // initialize connection event
    State.set('connecting', true);
    Socket.emit('server:connect', {
      username: account.username,
      password: account.password,
      hostname: server.ip.indexOf(':') > -1 ? server.ip.split(':')[0] : server.ip,
      port: server.ip.indexOf(':') > -1 ? server.ip.split(':')[1] : 25565
    });
  },

  /**
   * Gracefully disconnect from the current server
   */
  disconnect() {
    Socket.emit('bot:disconnect');
    State.set('conecting', false);
    State.set('connected', false);
    State.set('messages', []);
  },

  /**
   * Only way to be 100% sure that we do not connect is to reinitilize
   * the Socket connection. Any other method can leak memory on the server
   * and/or client.
   */
  cancelConnect() {
    Socket.disconnect();
    Socket.connect();
  },

  sendMessage(message) {
    Socket.emit('chat', { message });
  }

};

export default SocketActions;
