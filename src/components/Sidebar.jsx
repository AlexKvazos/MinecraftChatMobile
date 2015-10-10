import React from 'react';
import { UIActions } from '../actions';

class Sidebar extends React.Component {

  newState(stateName) {
    return function() {
      UIActions.toggleSidebar();
      UIActions.newState(stateName);
    };
  }

  render() {
    return (
      <div className='sidebar'>
        <div className='header'>
          Menu
        </div>
        <ul>
          <li onTouchEnd={ this.newState('chat') }>Chat</li>
          <li onTouchEnd={ this.newState('servers') }>Servers</li>
          <li onTouchEnd={ this.newState('accounts') }>Accounts</li>
          <li onTouchEnd={ this.newState('credits') }>Credits</li>
        </ul>
        <div className='footer no-select'>
          <p>
            Copyright &copy; 2015<br />
            MinecraftChat.net
          </p>
        </div>
      </div>
    );
  }
}

export default Sidebar;
