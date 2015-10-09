import React         from 'react';
import { Emitter }   from '../modules';
import Chat          from './Chat.jsx';
import Servers       from './Servers.jsx';
import Sidebar       from './Sidebar.jsx';
import Accounts      from './Accounts.jsx';
import Credits       from './Credits.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      toggled: false,
      state: 'chat'
    };
  }

  componentDidMount() {
    Emitter.on('ui:sidebar:toggle', ::this.toggleSidebar);
    Emitter.on('ui:state:new', ::this.handleNewState);
  }

  componentWillUnmount() {
    Emitter.removeListener('ui:sidebar:toggle', ::this.toggleSidebar);
    Emitter.removeListener('ui:state:new', ::this.handleNewState);
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

  handleNewState(stateName) {
    this.setState({
      toggled: false,
      state: stateName
    });
  }

  render() {
    let toggle = this.state.toggled ? 'toggle' : '';
    let { state } = this.state;

    let chat = state === 'chat' ? <Chat /> : null;
    let servers = state === 'servers' ? <Servers /> : null;
    let accounts = state === 'accounts' ? <Accounts /> : null;
    let credits = state === 'credits' ? <Credits /> : null;

    return (
      <div className='wrapper'>
        <Sidebar />
        <div
          className={ `main ${toggle}` }
          onTouchEnd={ ::this.handleMainTouch }>
          { chat }
          { servers }
          { accounts }
          { credits }
        </div>
      </div>
    );
  }

}

export default App;
