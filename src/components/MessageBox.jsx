import React from 'react';
import { Emitter } from '../modules';

class MessageBox extends React.Component {

  componentDidMount() {
    Emitter.on('ui:keyboard:close', ::this.closeKeyboard);
    Emitter.on('ui:keyboard:show', ::this.showKeyboard);
    window.addEventListener('native.keyboardshow', ::this.onKeyboardShow);
    window.addEventListener('native.keyboardhide', ::this.onKeyboardHide);
  }

  componentWillUnmount() {
    Emitter.removeListener('ui:keyboard:close', ::this.closeKeyboard);
    Emitter.removeListener('ui:keyboard:show', ::this.showKeyboard);
    window.removeEventListener('native.keyboardshow', ::this.onKeyboardShow);
    window.removeEventListener('native.keyboardhide', ::this.onKeyboardHide);
  }

  closeKeyboard() {
    this.refs.input.blur();
  }

  showKeyboard() {
    this.refs.input.focus();
  }

  onKeyboardShow(e) {
    this.refs.msgbox.style.bottom = `${e.keyboardHeight}px`;
  }

  onKeyboardHide(e) {
    this.refs.msgbox.style.bottom = '0px';
  }

  render() {
    return (
      <div className='msgbox' ref='msgbox'>
        <div className='holder'>
          <input type='text' ref='input' />
        </div>
        <div className='send'>Send</div>
      </div>
    );
  }
}

export default MessageBox;
