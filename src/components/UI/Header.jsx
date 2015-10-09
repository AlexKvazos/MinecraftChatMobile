import React from 'react';
import { UIActions } from '../../actions';

class Header extends React.Component {
  render() {
    let { title, button } = this.props;

    return (
      <div className='header'>
        <div className='icon left' onTouchEnd={ UIActions.toggleSidebar }>
          <i className='fa fa-bars'></i>
        </div>
          { title }
          { button }
      </div>
    );
  }
}

export default Header;
