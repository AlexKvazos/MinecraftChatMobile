import { Emitter } from '../modules';

let UIActions = {

  /**
   * Hide the keyboard
   */
  hideKeyboard() {
    if (window.cordova && window.cordova.plugins.Keyboard.isVisible) {
      Emitter.emit('ui:keyboard:close');
    }
  },

  /**
   * Force keyboard close
   */
  closeKeyboard() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      window.cordova.plugins.Keyboard.close();
    }
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
  },

  /**
   * Hide the active modal on the application
   */
  hideModal() {
    Emitter.emit('ui:modal:hide');
  }

};

export default UIActions;
