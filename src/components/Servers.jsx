import React from 'react';
import { branch } from 'baobab-react/decorators';
import { UIActions } from '../actions';
import { Emitter } from '../modules';
import Header from './UI/Header.jsx';
import AddServer from './Modals/AddServer.jsx';


@branch({
  cursors: {
    servers: ['servers']
  }
})
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
    Emitter.removeAllListeners('ui:modal:hide');
  }

  hideHandler() {
    UIActions.closeKeyboard();
    this.setState({ adding: false });
  }

  addHandler() {
    this.setState({ adding: true });
  }

  render() {
    let { servers } = this.props;

    return (
      <div>
        <Header title='Servers' showToggle={ true } button={(
          <div className='icon right' onTouchEnd={ ::this.addHandler }>
            <i className={ `fa fa-plus` }></i>
          </div>
        )} />

        <div className='container'>

        { servers.length ? null : (
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
        ) }
        </div>

        <AddServer visible={ this.state.adding } />

      </div>
    );
  }
}

export default Servers;
