import React         from 'react';
import { Emitter }   from '../modules';
import Chat          from './Chat.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      toggled: true
    };
  }

  componentDidMount() {
    Emitter.on('ui:sidebar:toggle', ::this.toggleSidebar);
  }

  componentWillUnmount() {
    Emitter.removeListener('ui:sidebar:toggle', ::this.toggleSidebar);
  }

  toggleSidebar() {
    let toggled = this.state.toggled;
    this.setState({ toggled: !toggled });
  }

  handleMainTouch() {
    if (this.state.toggled) {
      this.setState({ toggled: false });
    }
  }

  render() {
    let toggle = this.state.toggled ? 'toggle' : '';

    return (
      <div className='wrapper'>

      <div className='sidebar'>
        <div className='header'>
          Menu
        </div>
        <ul>
          <li>Chat</li>
          <li>Servers</li>
          <li>Accounts</li>
          <li>Credits</li>
        </ul>
        <div className='footer'>
          <p>
            Copyright &copy; 2015<br />
            MinecraftChat.net
          </p>
        </div>
      </div>

      <div
        className={ `main ${toggle}` }
        onTouchEnd={ ::this.handleMainTouch }>
        <Chat />
      </div>

      </div>
    );
  }

}

export default App;
