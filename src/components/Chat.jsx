import React         from 'react';
import { branch }    from 'baobab-react/decorators';
import { UIActions } from '../actions';
import { Emitter }   from '../modules';
import Connect       from './Modals/Connect.jsx';
import Header        from './UI/Header.jsx';
import MessageBox    from './UI/MessageBox.jsx';

@branch({
  cursors: {
    connected: ['connected'],
    accounts: ['accounts']
  }
})
class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      connecting: false
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

  render() {
    let { connected } = this.props;
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
          onClick={ UIActions.hideKeyboard }
          onTouchEnd={ UIActions.hideKeyboard } >

          { connected ? null : (
            <div className='empty'>
              <div className='no-select'>
                <p><i className='fa fa-bolt'></i></p>
                <p>You're not connected to any server!</p>
                <p className='instructions'>
                  1. Go to 'Servers' and add a server.<br />
                  2. Go to 'Accounts' and add your Minecraft account.
                </p>
                <p className='instructions note'>
                  Note: MinecraftChat only works on 1.8 servers.
                </p>
              </div>
              <div className='btn btn-connect' onTouchEnd={ ::this.connectHandler }>
                Connect
              </div>
            </div>
          ) }
        </div>

        <Connect visible={ this.state.connecting } />
        { connected ? <MessageBox /> : null }
      </div>
    );
  }

}

export default Chat;
