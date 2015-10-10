import { State } from '../modules';

let ServerActions = {

  /**
   * Add a server to the store
   * @param {Object} server Server name and ip
   */
  add(server) {
    let { name, ip } = server;

    // load servers disk storage
    let servers = localStorage.servers
      ? JSON.parse(localStorage.servers)
      : [];
    servers.push({ name, ip });

    // push to application state and save to disk
    State.select('servers').push({ name, ip });
    localStorage.servers = JSON.stringify(servers);
  },

  /**
   * Delete a server from the store
   * @param  {int}   index Server index
   */
  delete(index) {
    let servers = localStorage.servers
      ? JSON.parse(localStorage.servers)
      : [];
    servers.splice(index, 1);

    State.select('servers').splice([index, 1]);
    localStorage.servers = JSON.stringify(servers);
  }

};

export default ServerActions;
