import React from 'react';
import Header from '../UI/Header.jsx';

class AddServer extends React.Component {

  render() {
    let toggle = this.props.visible ? 'visible' : '';

    return (
      <div className={ `modal ${toggle}`}>
        <Header title='Add Server' showCancel={ true } />

        <div className='container'></div>
      </div>
    );
  }

}

export default AddServer;
