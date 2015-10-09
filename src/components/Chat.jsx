import React         from 'react'
import { UIActions } from '../actions';
import Header        from './Header.jsx';
import MessageBox    from './MessageBox.jsx';

class Chat extends React.Component {

  render() {
    return (
      <div>
        <Header />

        <div
          className='messages'
          onClick={ UIActions.hideKeyboard }
          onTouchEnd={ UIActions.hideKeyboard } >

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
        </div>

        <MessageBox />
      </div>
    );
  }

}

export default Chat;
