import React from 'react';
import Header from '../UI/Header.jsx';

class AddAcount extends React.Component {

  render() {
    let toggle = this.props.visible ? 'visible' : '';

    return (
      <div className={ `modal ${toggle}`}>
        <Header title='Add Account' showCancel={ true } />

        <div className='container'>
          <div className='formgroup'>
            <label>Minecraft Username/Email</label>
            <input type="text" ref='username' />
          </div>

          <div className='formgroup'>
            <label>Password</label>
            <input type="password" ref='password' />
          </div>

          <div className='btn btn-primary'>
            Save
          </div>
        </div>
      </div>
    );
  }

}

export default AddAcount;
