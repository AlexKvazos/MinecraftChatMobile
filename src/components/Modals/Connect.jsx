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
  constructor(props) {
    super();
    this.state = {
      activeServer: 0,
      activeAccount: 0
    };
  }

  connectHandler() {
    let acount = this.props.accounts[this.state.activeAccount];
    let server = this.props.servers[this.state.activeServer];

    UIActions.hideModal();
  }

  serverChangeHandler(index) {
    this.setState({ activeServer: index });
  }

  accountChangeHandler(index) {
    this.setState({ activeAccount: index });
  }

  renderServer(server, index) {
    return (
      <div
        key={ index }
        className='server-selector'
        onTouchEnd={ this.serverChangeHandler.bind(this, index) }>
        <div className='info'>
          <h3>{ server.name }</h3>
          <p>{ server.ip }</p>
        </div>
        { this.state.activeServer === index ? (
          <div className='caret'>
            <i className='fa fa-check-circle-o'></i>
          </div>
        ) : null }
      </div>
    );
  }

  renderAccount(account, index) {
    return (
      <div
        key={ index }
        className='account-selector'
        onTouchEnd={ this.accountChangeHandler.bind(this, index) }>
        <div className='info'>
          <h3>{ account.username }</h3>
        </div>
        { this.state.activeAccount === index ? (
          <div className='caret'>
            <i className='fa fa-check-circle-o'></i>
          </div>
        ) : null }
      </div>
    );
  }

  render() {
    let toggle = this.props.visible ? 'visible' : '';
    let { servers, accounts } = this.props;

    return (
      <div className={ `modal ${toggle}`}>
        <Header title='Connect' showCancel={ true } />

        {/* Server selection */}
        <div className='container'>
          <div className='formgroup'>
            <label className='selector-title'>Server</label>
            { servers.map(::this.renderServer) }
          </div>

          {/* Account selection */}
          <div className='formgroup'>
            <label className='selector-title'>Account</label>
            { accounts.map(::this.renderAccount) }
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
