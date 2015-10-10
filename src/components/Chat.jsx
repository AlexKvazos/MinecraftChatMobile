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
              <div className='select-control'>
                <div className='arrow'><i className='fa fa-chevron-down'></i></div>
                <select>
                  { servers.map((server, i) => {
                    return <option key={ i } value={ i }>{ server.name }</option>;
                  }) }
                </select>
              </div>
            </div>

            {/* Account selection */}
            <div className='formgroup'>
              <label className='selector-title'>Account</label>
              <div className='select-control'>
                <div className='arrow'><i className='fa fa-chevron-down'></i></div>
                <select>
                  { accounts.map((account, i) => {
                    return <option key={ i } value={ i }>{ account.username }</option>;
                  }) }
                </select>
              </div>
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
