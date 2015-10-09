import React         from 'react';
import { branch }    from 'baobab-react/decorators';
import { UIActions } from '../actions';
import Header        from './UI/Header.jsx';
import MessageBox    from './UI/MessageBox.jsx';

@branch({
  cursors: {
    connected: ['connected']
  }
})
class Chat extends React.Component {
  constructor() {
    super();
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
            <div className='empty no-select'>
              <p><i className='fa fa-bolt'></i></p>
              <p>You're not connected to any server!</p>
              <p className='instructions'>
                1. Go to 'Servers' and add a server.<br />
                2. Go to 'Accounts' and add your Minecraft account.<br />
                3. Connect to any server from the 'Servers' menu.
              </p>
              <p className='instructions note'>
                Note: MinecraftChat only works on 1.8 servers.
              </p>
            </div>
          ) }
        </div>

        <MessageBox />
      </div>
    );
  }

}

export default Chat;
