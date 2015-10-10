import React from 'react';
import { branch } from 'baobab-react/decorators';

@branch({
  cursors:({
    servers: ['servers'],
    accounts: ['accounts']
  })
})
class Welcome extends React.Component {

  render() {
    let { servers, accounts } = this.props;

    if (servers.length && accounts.length) {
      return null;
    }

    return (
      <div className='empty no-select'>
        <p><i className='fa fa-bolt'></i></p>
        <p>Welcome to MinecraftChat!</p>
        <p className='instructions'>
          1. Go to 'Servers' and add a server.<br />
          2. Go to 'Accounts' and add your Minecraft account.<br />
          3. Come back to the 'Chat' screen to start chatting.
        </p>
        <p className='instructions note'>
          Note: MinecraftChat only works on 1.8 servers.
        </p>
      </div>
    );
  }
}

export default Welcome;
