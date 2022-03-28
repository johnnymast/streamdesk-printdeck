/**
 @file      action.js
 @brief     Print Deck Plugin
 @copyright (c) 2022, Johnny Mast
 @license   This source code is licensed under the MIT-style license found in the LICENSE file.
 */

class Action {

  static actionUUID = ''
  static settings = null

  /**
   * Callback for actions to overwrite, so they get notified when
   * the button (key) is down.
   *
   * @public
   * @param {object} event The event for the keyDown.
   */
  onKeyDown (event) {
    // This will be overwritten
  }

  /**
   * Callback for actions to overwrite, so they get notified when
   * the button (key) is up.
   *
   * @public
   * @param {object} event The event for the keyUp.
   */
  onKeyUp (event) {
    // This will be overwritten
  }
}