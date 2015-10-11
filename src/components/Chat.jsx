import React         from 'react';
import { branch }    from 'baobab-react/decorators';
import { UIActions, SocketActions } from '../actions';
import { Emitter }   from '../modules';
import Header        from './UI/Header.jsx';
import MessageBox    from './UI/MessageBox.jsx';
import Connect       from './UI/Connect.jsx';
import Welcome       from './UI/Welcome.jsx';
import ServerInfo    from './UI/ServerInfo.jsx';

@branch({
  cursors: {
    connected: ['connected'],
    connecting: ['connecting'],
    messages: ['messages']
  }
})
class Chat extends React.Component {

  componentDidMount() {
    window.addEventListener('native.keyboardshow', ::this.onKeyboardShow);
    window.addEventListener('native.keyboardhide', ::this.onKeyboardHide);
    Emitter.on('newMessage', ::this.onMessage);
    this.refs.messages.scrollTop = this.refs.messages.scrollHeight;
  }

  componentWillUnmount() {
    window.removeEventListener('native.keyboardshow', ::this.onKeyboardShow);
    window.removeEventListener('native.keyboardhide', ::this.onKeyboardHide);
    Emitter.removeAllListeners('newMessage', ::this.onMessage);
  }

  onKeyboardShow(e) {
    this.refs.messages.style.bottom = `${e.keyboardHeight + 40}px`;
    this.refs.messages.scrollTop = this.refs.messages.scrollHeight;
  }

  onKeyboardHide(e) {
    this.refs.messages.style.bottom = '40px';
  }

  onMessage() {
    this.refs.messages.scrollTop = this.refs.messages.scrollHeight;
  }

  onIndicatorTap() {
    if (this.props.connected) {
      SocketActions.disconnect();
    }
  }

  render() {
    let { connected, connecting, messages } = this.props;

    let iconRight = connected
      ? <i className={ `fa fa-sign-out offline` }></i>
      : (connecting
        ? <i className={ `fa fa-circle-thin changing` }></i>
        : <i className={ `fa fa-circle-thin offline` }></i>);

    return (
      <div>
        <Header title='MinecraftChat' showToggle={ true } button={(
          <div className='icon right' onTouchEnd={ ::this.onIndicatorTap }>
            { iconRight }
          </div>
        )} />

        {/* messages buffer*/}
        <div
          className='messages'
          ref='messages'
          onTouchEnd={ UIActions.hideKeyboard } >
          <br />
          <br />
          { messages.map((message, i) => {
            return <p key={ i } dangerouslySetInnerHTML={{ __html: message }} />;
          }) }
        </div>

        {/* server info or welcome dialog */}
        { connected ? (
          <ServerInfo />
        ) : (
          <div className='container'>
            <Welcome />
          </div>
        ) }

        {/* show message box or connect dialog */}
        { connected ? <MessageBox /> : <Connect />}
      </div>
    );
  }

}

export default Chat;
