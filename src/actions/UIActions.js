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
  },

  /**
   * Set a new UI state
   * @param  {String} stateName The statename to set
   */
  newState(stateName) {
    Emitter.emit('ui:state:new', stateName);
  }

};

export default UIActions;
