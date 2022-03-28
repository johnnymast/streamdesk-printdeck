/**
 @file      connect.js
 @brief     Print Deck Plugin
 @copyright (c) 2022, Johnny Mast
 @license   This source code is licensed under the MIT-style license found in the LICENSE file.
 */

/**
 * Open the "Connect to Octoprint dialog".
 */
const connectOctoPrint = () => {
  let dialog = window.open('../setup/index.html', '_blank', 'width=375,height=375')

  dialog.onload = () => {
    dialog.postMessage({ 'type': 'colors', 'colors': StreamDeck.appInfo.colors }, '*')
    dialog.postMessage({ 'type': 'localize', 'strings': Localization.strings }, '*')
  }
}