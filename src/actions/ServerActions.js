import { State } from '../modules';

let ServerActions = {

  /**
   * Add a server to the store
   * @param {Object} server Server name and ip
   */
  add(server) {
    let { name, ip } = server;
    State.select('servers').push({ name, ip });
  }

};

export default ServerActions;
