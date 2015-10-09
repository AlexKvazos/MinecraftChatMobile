import React from 'react';
import { UIActions } from '../../actions';

class Header extends React.Component {
  render() {
    let { title, button, showToggle, showCancel } = this.props;

    return (
      <div className='header'>
        { showToggle
          ? (
            <div className='icon left' onTouchEnd={ UIActions.toggleSidebar }>
              <i className='fa fa-bars'></i>
            </div>)
          : null }
        { showCancel
          ? (
            <div className='icon left offline' onTouchEnd={ UIActions.hideModal }>
              Cancel
            </div>)
          : null }
        { title }
        { button }
      </div>
    );
  }
}

export default Header;
