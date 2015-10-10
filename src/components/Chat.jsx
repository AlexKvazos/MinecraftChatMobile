import React         from 'react';
import { branch }    from 'baobab-react/decorators';
import { UIActions } from '../actions';
import Header        from './UI/Header.jsx';
import MessageBox    from './UI/MessageBox.jsx';
import Connect       from './UI/Connect.jsx';
import Welcome       from './UI/Welcome.jsx';

@branch({
  cursors: {
    connected: ['connected'],
    connecting: ['connecting']
  }
})
class Chat extends React.Component {
  constructor() {
    super();
  }


  render() {
    let { connected, connecting } = this.props;

    let iconRight = connected
      ? <i className={ `fa fa-circle online` }></i>
      : (connecting
        ? <i className={ `fa fa-circle-thin changing` }></i>
        : <i className={ `fa fa-circle-thin offline` }></i>);

    return (
      <div>
        <Header title='MinecraftChat' showToggle={ true } button={(
          <div className='icon right'>
            { iconRight }
          </div>
        )} />

        <div
          className='messages'
          onTouchEnd={ UIActions.hideKeyboard } >

          { <Welcome /> }
        </div>

        { connected ? <MessageBox /> : <Connect />}
      </div>
    );
  }

}

export default Chat;
