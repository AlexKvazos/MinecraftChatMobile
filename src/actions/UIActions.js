import { Emitter } from '../modules';

let UIActions = {

  /**
   * Hide the keyboard
   */
  hideKeyboard() {
    Emitter.emit('ui:keyboard:close');
  },

  /**
   * Show the keyboard
   */
  showKeyboard() {
    Emitter.emit('ui:keyboard:show');
  },

  /**
   * Toggle the sidebar
   */
  toggleSidebar() {
    Emitter.emit('ui:sidebar:toggle');
  }

};

export default UIActions;
