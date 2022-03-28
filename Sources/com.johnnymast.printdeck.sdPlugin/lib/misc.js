/**
 @file      misc.js
 @brief     Print Deck Plugin
 @copyright (c) 2022, Johnny Mast
 @license   This source code is licensed under the MIT-style license found in the LICENSE file.
 */

/**
 * Greet the lovely developer on what instance they
 * watch in their debugging console.
 *
 * @param {string} message The message to display.
 */
const greetDeveloper = (message) => {
  if (window.navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
    const args = [
      `%c %c %c ✰ ✰ - ${message} - ✰ ✰  %c`,
      'background: #ff66a5; padding:5px 0;',
      'background: #ff66a5; padding:5px 0;',
      'color: #ff66a5; background: #030307; padding:5px 0;',
      'background: #ff66a5; padding:5px 0;'
    ]

    window.console.log.apply(console, args)
  } else if (window.console) {
    window.console.log(`{$msg}`)
  }
}