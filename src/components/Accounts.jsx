import React from 'react';
import { branch } from 'baobab-react/decorators';
import { UIActions, AccountActions } from '../actions';
import { Emitter } from '../modules';
import Header from './UI/Header.jsx';
import AddAccount from './Modals/AddAccount.jsx';

@branch({
  cursors: {
    accounts: ['accounts']
  }
})
class Accounts extends React.Component {
  constructor() {
    super();
    this.state = {
      adding: false
    };
  }

  componentDidMount() {
    Emitter.on('ui:modal:hide', ::this.hideHandler);
  }

  componentWillUnmount() {
    Emitter.removeAllListeners('ui:modal:hide');
  }

  hideHandler() {
    UIActions.closeKeyboard();
    this.setState({ adding: false });
  }

  addHandler() {
    this.setState({ adding: true });
  }

  handleAccountTap(index, account) {
    if (window.plugins && window.plugins.actionsheet) {
      window.plugins.actionsheet.show({
        title: `What do you want to do with ${account.username}?`,
        addDestructiveButtonWithLabel: 'Remove account',
        addCancelButtonWithLabel: 'Cancel'
      }, (btnIndex) => {
        if (btnIndex === 1) {
          AccountActions.delete(index);
        }
      });
    }
  }

  renderAccount(account, index) {
    return (
      <div key={ index } className='server' onTouchEnd={ this.handleAccountTap.bind(this, index, account) }>
        <div className='icon'>
          <i className='fa fa-user'></i>
        </div>
        <div className='info'>
          <h3>{ account.username }</h3>
          <p>
            Last Used: { account.lastconnect ? account.lastconnect : 'Never' }
          </p>
        </div>
      </div>
    );
  }

  render() {
    let { accounts } = this.props;

    return (
      <div>
        <Header title='Accounts' showToggle={ true } button={(
          <div className='icon right' onTouchEnd={ ::this.addHandler }>
            <i className={ `fa fa-plus` }></i>
          </div>
        )} />

        <div className='container'>

          { accounts.map(::this.renderAccount) }

          { accounts.length ? null : (
            <div className='empty no-select'>
              <p><i className='fa fa-users'></i></p>
              <p>You haven't added any accounts!</p>
              <p className='instructions'>
                1. Tap the '+' button on the top right<br />
                2. Input your account information and tap 'Save'.
              </p>
            </div>
          ) }
        </div>

        <AddAccount visible={ this.state.adding } />

      </div>
    );
  }
}

export default Accounts;
