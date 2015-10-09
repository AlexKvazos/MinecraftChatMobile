import React from 'react';
import Header from './UI/Header.jsx';

class Credits extends React.Component {
  render() {
    return (
      <div>
        <Header title='Credits' showToggle={ true } />
        <div className='container credits'>
          <h3>MinecraftChat</h3>
          <p>Copyright &copy; 2015 - MinecraftChat.net</p>
          <p className='instructions'>
            Developed by AlexKvazos<br />
            contact@alexkvazos.com
          </p>
          <p className='note'>This service is not affiliated with Minecraft or Mojang</p>
        </div>
      </div>
    );
  }
}

export default Credits;
