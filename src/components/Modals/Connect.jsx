import React from 'react';
import { branch } from 'baobab-react/decorators';
import { UIActions } from '../../actions';
import Header from '../UI/Header.jsx';

@branch({
  cursors: {
    servers: ['servers'],
    accounts: ['accounts']
  }
})
class Connect extends React.Component {
  constructor() {
    super();
    this.state = {
      showCustom: false
    };
  }

  connectHandler() {
    let serverIndex = this.refs.server.value;
    let accountIndex = this.refs.account.value;

    // account we will use to sign in
    let acount = this.props.accounts[accountIndex];

    // server we will sign into
    let server = serverIndex === 'custom'
      ? this.refs.customServer.value
      : this.props.servers[serverIndex].ip;

    UIActions.hideModal();
  }

  serverChangeHandler() {
    if (this.refs.server.value === 'custom') {
      this.setState({ showCustom: true });
    } else {
      this.setState({ showCustom: false });
    }
  }

  render() {
    let toggle = this.props.visible ? 'visible' : '';

    return (
      <div className={ `modal ${toggle}`}>
        <Header title='Connect' showCancel={ true } />

        <div className='container'>
          <div className='formgroup'>
            <label>Server</label>
            <select ref='server' onChange={ ::this.serverChangeHandler }>
              { this.props.servers.map((server, index) => {
                return <option key={ index } value={ index }>{ server.name }</option>;
              }) }
              <option value='custom'>Enter custom IP...</option>
            </select>
            { this.state.showCustom
               ? (<input type="text" ref='customServer' />)
               : null }
          </div>

          <div className='formgroup'>
            <label>Account</label>
            <select ref='account'>
              { this.props.accounts.map((account, index) => {
                return <option key={ index } value={ index }>{ account.username }</option>;
              }) }
            </select>
          </div>

          <div className='btn btn-primary' onTouchEnd={ ::this.connectHandler }>
            Connect
          </div>
        </div>
      </div>
    );
  }

}

export default Connect;
