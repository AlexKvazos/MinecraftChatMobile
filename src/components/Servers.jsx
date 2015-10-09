import React from 'react';
import { Emitter } from '../modules';
import Header from './UI/Header.jsx';
import AddServer from './Modals/AddServer.jsx';

class Servers extends React.Component {
  constructor() {
    super();
    this.state = {
      adding: false
    };
  }

  componentDidMount() {
    Emitter.on('ui:modal:hide', ::this.hideHandler);
  }

  componentWillUnmount() {
    Emitter.removeListener('ui:modal:hide', ::this.hideHandler);
  }

  hideHandler() {
    this.setState({ adding: false });
  }

  addHandler() {
    this.setState({ adding: true });
  }

  render() {
    return (
      <div>
        <Header title='Servers' showToggle={ true } button={(
          <div className='icon right' onTouchEnd={ ::this.addHandler }>
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

        <AddServer visible={ this.state.adding } />

      </div>
    );
  }
}

export default Servers;
