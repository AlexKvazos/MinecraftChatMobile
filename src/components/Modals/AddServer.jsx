import React from 'react';
import Header from '../UI/Header.jsx';

class AddServer extends React.Component {

  render() {
    let toggle = this.props.visible ? 'visible' : '';

    return (
      <div className={ `modal ${toggle}`}>
        <Header title='Add Server' showCancel={ true } />

        <div className='container'>
          <div className='formgroup'>
            <label>Server Name</label>
            <input type="text" ref='servername' />
          </div>

          <div className='formgroup'>
            <label>Server IP</label>
            <input type="text" ref='serverip' />
          </div>

          <div className='btn btn-primary'>
            Save
          </div>
        </div>
      </div>
    );
  }

}

export default AddServer;
