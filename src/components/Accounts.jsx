import React from 'react';
import { UIActions } from '../actions';
import { Emitter } from '../modules';
import Header from './UI/Header.jsx';
import AddAccount from './Modals/AddAccount.jsx';

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

  render() {
    return (
      <div>
        <Header title='Accounts' showToggle={ true } button={(
          <div className='icon right' onTouchEnd={ ::this.addHandler }>
            <i className={ `fa fa-plus` }></i>
          </div>
        )} />

        <div className='container'>
          <div className='empty no-select'>
            <p><i className='fa fa-users'></i></p>
            <p>You haven't added any accounts!</p>
            <p className='instructions'>
              1. Tap the '+' button on the top right<br />
              2. Input your account information and tap 'Save'.
            </p>
          </div>
        </div>

        <AddAccount visible={ this.state.adding } />

      </div>
    );
  }
}

export default Accounts;
