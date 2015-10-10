import React from 'react';
import Header from '../UI/Header.jsx';
import { AccountActions, UIActions } from '../../actions';

class AddAcount extends React.Component {

  saveHandler() {
    let username = this.refs.username.value;
    let password = this.refs.password.value;

    // prevent empty submissions
    if (!username.length || !password.length) {
      if (navigator.notification) {
        navigator.notification.alert(
          'Username and password required',
          () => {},
          'Error'
        );
      }
      return;
    }

    // add account to store and reset modal
    AccountActions.add({ username, password });
    UIActions.hideModal();
    this.refs.username.value = '';
    this.refs.password.value = '';
  }

  render() {
    let toggle = this.props.visible ? 'visible' : '';

    return (
      <div className={ `modal ${toggle}`}>
        <Header title='Add Account' showCancel={ true } />

        <div className='container'>
          <div className='formgroup'>
            <label>Minecraft Username/Email</label>
            <input type="text" ref='username' />
          </div>

          <div className='formgroup'>
            <label>Password</label>
            <input type="password" ref='password' />
          </div>

          <div className='btn btn-primary' onTouchEnd={ ::this.saveHandler }>
            Save
          </div>
        </div>
      </div>
    );
  }

}

export default AddAcount;
