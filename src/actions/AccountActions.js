import { State } from '../modules';

let AccountActions = {

  /**
   * Add an account to the store
   * @param {Object} account Account username and password
   */
  add(account) {
    let { username, password } = account;

    // load accounts disk storage
    let accounts = localStorage.accounts
      ? JSON.parse(localStorage.accounts)
      : [];
    accounts.push({ username, password });

    // push to applicaton state and save to disk
    State.select('accounts').push({ username, password });
    localStorage.accounts = JSON.stringify(accounts);
  }

};

export default AccountActions;
