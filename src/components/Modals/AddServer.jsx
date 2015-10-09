import React from 'react';
import Header from '../UI/Header.jsx';
import { ServerActions, UIActions } from '../../actions';

class AddServer extends React.Component {

  saveHandler() {
    let servername = this.refs.servername.value;
    let serverip   = this.refs.serverip.value;

    // prevent empty submissions
    if (!servername.length || !serverip.length) {
      if (navigator.notification) {
        navigator.notification.alert(
          'Server Name and IP required',
          () => {},
          'Error'
        );
      }
      return;
    }

    // add server to store and reset modal
    ServerActions.add({ name: servername, ip: serverip });
    UIActions.hideModal();
    this.refs.servername.value = '';
    this.refs.serverip.value = '';
  }

  render() {
    let toggle = this.props.visible ? 'visible' : '';

    return (
      <div className={ `modal ${toggle}`}>
        <Header title='Add Server' showCancel={ true } />

        <div className='container'>
          <div className='formgroup'>
            <label>Server Name</label>
            <input type="text" ref='servername' />
          </div>

          <div className='formgroup'>
            <label>Server IP</label>
            <input type="text" ref='serverip' />
          </div>

          <div className='btn btn-primary' onTouchEnd={ ::this.saveHandler }>
            Save
          </div>
        </div>
      </div>
    );
  }

}

export default AddServer;
