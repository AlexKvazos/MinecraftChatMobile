import React from 'react';
import Header from './UI/Header.jsx';

class Accounts extends React.Component {
  render() {
    return (
      <div>
        <Header title='Accounts' button={(
          <div className='icon right'>
            <i className={ `fa fa-plus` }></i>
          </div>
        )} />

        <div className='container'>
          <div className='empty no-select'>
            <p><i className='fa fa-users'></i></p>
            <p>You haven't added any accounts!</p>
            <p className='instructions'>
              1. Tap the '+' button on the top right<br />
              2. Input your account information and tap 'Save'.
            </p>
          </div>
        </div>

      </div>
    );
  }
}

export default Accounts;
