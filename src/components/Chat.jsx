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
    connecting: ['connecting'],
    messages: ['messages']
  }
})
class Chat extends React.Component {

  componentDidMount() {
    window.addEventListener('native.keyboardshow', ::this.onKeyboardShow);
    window.addEventListener('native.keyboardhide', ::this.onKeyboardHide);
  }

  componentWillUnmount() {
    window.removeEventListener('native.keyboardshow', ::this.onKeyboardShow);
    window.removeEventListener('native.keyboardhide', ::this.onKeyboardHide);
  }

  onKeyboardShow(e) {
    this.refs.messages.style.bottom = `${e.keyboardHeight+40}px`;
  }

  onKeyboardHide(e) {
    this.refs.messages.style.bottom = '0px';
  }

  render() {
    let { connected, connecting, messages } = this.props;

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

          { messages.map((message, i) => {
            return <p key={ i } dangerouslySetInnerHTML={{ __html: message }} />;
          }) }
        </div>

        {/* welcome screen */}
        { connected ? null : (
          <div className='container'>
            <Welcome />
          </div>
        ) }

        { connected ? <MessageBox /> : <Connect />}
      </div>
    );
  }

}

export default Chat;
