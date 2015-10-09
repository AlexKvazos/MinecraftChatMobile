import React from 'react';
import { UIActions } from '../actions';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      connected: false
    };
  }

  render() {
    let connected = this.state.connected ? 'online' : 'offline';

    return (
      <div className='header'>
        <div className='icon left' onTouchEnd={ UIActions.toggleSidebar }>
          <i className='fa fa-bars'></i>
        </div>
          MinecraftChat
        <div className='icon right'>
          <i className={ `fa fa-circle-thin ${connected}` }></i>
        </div>
      </div>
    );
  }
}

export default Header;
