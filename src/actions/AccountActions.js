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
  },

  /**
   * Delete an account from the store
   * @param  {int}   index Account index
   */
  delete(index) {
    let accounts = localStorage.accounts
      ? JSON.parse(localStorage.accounts)
      : [];
    accounts.splice(index, 1);

    State.select('accounts').splice([index, 1]);
    localStorage.accounts = JSON.stringify(accounts);
  }

};

export default AccountActions;
