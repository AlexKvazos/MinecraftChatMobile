import React         from 'react';
import { branch }    from 'baobab-react/decorators';
import { UIActions } from '../actions';
import Header        from './UI/Header.jsx';
import MessageBox    from './UI/MessageBox.jsx';

@branch({
  cursors: {
    connected: ['connected'],
    servers: ['servers'],
    accounts: ['accounts'],
    connecting: ['connecting']
  }
})
class Chat extends React.Component {
  constructor() {
    super();
  }

  handleConnect() {
    let acount = this.props.accounts[this.refs.activeAccount.value];
    let server = this.props.servers[this.refs.activeServer.value];

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

            {/* server selection */}
            <div className='formgroup'>
              <label className='selector-title'>Server</label>
              <div className='select-control'>
                <div className='arrow'><i className='fa fa-chevron-down'></i></div>
                <select ref='activeServer'>
                  { servers.map((server, i) => {
                    return <option key={ i } value={ i }>{ server.name }</option>;
                  }) }
                </select>
              </div>
            </div>

            {/* account selection */}
            <div className='formgroup'>
              <label className='selector-title'>Account</label>
              <div className='select-control'>
                <div className='arrow'><i className='fa fa-chevron-down'></i></div>
                <select ref='activeAccount'>
                  { accounts.map((account, i) => {
                    return <option key={ i } value={ i }>{ account.username }</option>;
                  }) }
                </select>
              </div>
            </div>

            {/* = connect = */}
            <div className='btn btn-primary' onTouchEnd={ ::this.handleConnect }>
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
