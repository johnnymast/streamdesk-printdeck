/**
 @file      action.js
 @brief     Print Deck Plugin
 @copyright (c) 2022, Johnny Mast
 @license   This source code is licensed under the MIT-style license found in the LICENSE file.
 */

class OpenOctoPrintAction extends Action {

  /**
   * @classdesc
   * Open OctoPrint in the web browser.
   *
   * @class ProgressAction
   * @constructor
   * @since 1.0.0
   */
  constructor () {
    super()

    this.actionUUID = 'com.johnnymast.printdeck.openportal'
  }

  /**
   * The stream deck tile has been released.
   *
   * @param {Object} evt
   */
  onKeyUp (evt) {
    let hosts = Storage.get('hosts', null)
    let apiKey = Storage.get('apikey')

    let webLocation = null

    if (hosts) {
      hosts.forEach((host) => {
        if (webLocation === null && host.key == apiKey) {
          webLocation = `http://${host.host}`
        }
      })
    }

    if (webLocation) {
      openUrl(webLocation)
    } else {
      showAlert()
    }
  }
}