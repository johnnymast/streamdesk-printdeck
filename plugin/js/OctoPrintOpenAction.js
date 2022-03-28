/**
 @file      OctoPrintOpenAction.js
 @brief     Print Deck Plugin
 @copyright (c) 2022, Johnny Mast
 @license   This source code is licensed under the MIT-style license found in the LICENSE file.
 */

class OctoPrintOpenAction extends Action {

  /**
   * @classdesc
   * Open OctoPrint in the web browser.
   *
   * @class OctoPrintProgressAction
   * @constructor
   * @since 1.0.0
   */
  constructor (context, settings) {
    super()

    this.actionUUID = 'com.johnnymast.printdeck.octoprint_openaction'
    this.context = context
    this.settings = settings
  }

  /**
   * The stream deck tile has been released.
   *
   * @param {object} evt The event for the keyUp.
   */
  onKeyUp (evt) {

    let webLocation = this.settings.host || ''

    if (webLocation) {
      openUrl(webLocation)
    } else {
      showAlert()
    }
  }
}