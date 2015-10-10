import React         from 'react';
import { branch }    from 'baobab-react/decorators';
import { UIActions } from '../actions';
import { Emitter }   from '../modules';
import Header        from './UI/Header.jsx';
import MessageBox    from './UI/MessageBox.jsx';

@branch({
  cursors: {
    connected: ['connected'],
    servers: ['servers'],
    accounts: ['accounts']
  }
})
class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      connecting: false,
      activeServer: 0,
      activeAccount: 0
    };
  }

  makeConnection() {
    let acount = this.props.accounts[this.state.activeAccount];
    let server = this.props.servers[this.state.activeServer];

    UIActions.hideModal();
  }

  componentDidMount() {
    Emitter.on('ui:modal:hide', ::this.hideHandler);
  }

  componentWillUnmount() {
    Emitter.removeAllListeners('ui:modal:hide');
  }

  hideHandler() {
    UIActions.closeKeyboard();
    this.setState({ connecting: false });
  }

  addHandler() {
    this.setState({ connecting: true });
  }

  connectHandler() {
    if (!this.props.accounts.length) {
      if (navigator.notification) {
        navigator.notification.alert(
          'You must add at least one account',
          () => UIActions.newState('accounts'),
          'Error'
        );
      }
      return;
    }

    this.setState({ connecting: true });
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
    let { connected, servers, accounts } = this.props;
    let indicator = connected ? 'online' : 'offline';

    return (
      <div>
        <Header title='MinecraftChat' showToggle={ true } button={(
          <div className='icon right'>
            <i className={ `fa fa-circle-thin ${indicator}` }></i>
          </div>
        )} />

        <div
          className='messages'
          onTouchEnd={ UIActions.hideKeyboard } >
        </div>

        { connected ? null : (
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
        )}

        { connected ? <MessageBox /> : null }
      </div>
    );
  }

}

export default Chat;
