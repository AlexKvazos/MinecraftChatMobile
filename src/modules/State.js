import Baobab from 'baobab';

// load stored data from localStorage
let servers = localStorage.servers ? JSON.parse(localStorage.servers) : null;
let accounts = localStorage.accounts ? JSON.parse(localStorage.accounts) : null;

let state = new Baobab({
  connected: false,
  servers: servers || [],
  accounts: accounts || []
});

export default state;