/**
 * MinecraftChat Mobile
 *
 * @author: AlexKvazos <contact@alexkvazos.com>
 * @copyright 2015
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

// wait for cordova to be ready if available
window.cordova
  ? document.addEventListener('deviceready', init, false)
  : init();

function init() {

  // prevent keyboard scrolling our view
  if (window.cordova && window.cordova.plugins.Keyboard) {
    window.cordova.plugins.Keyboard.disableScroll(true);
  }

  // render application
  ReactDOM.render(
    React.createElement(App),
    document.getElementById('app')
  );
}
