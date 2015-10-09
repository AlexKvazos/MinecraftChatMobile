import React from 'react';
import Header from './UI/Header.jsx';

class Servers extends React.Component {

  render() {
    return (
      <div>
        <Header title='Servers' button={(
          <div className='icon right'>
            <i className={ `fa fa-plus` }></i>
          </div>
        )} />

        <div className='container'>
          <div className='empty no-select'>
            <p><i className='fa fa-server'></i></p>
            <p>You haven't added any servers!</p>
            <p className='instructions'>
              1. Tap the '+' button on the top right<br />
              2. Input the server information and tap 'Save'.
            </p>
            <p className='instructions note'>
              Note: MinecraftChat only works on 1.8 servers.
            </p>
          </div>
        </div>

      </div>
    );
  }
}

export default Servers;
