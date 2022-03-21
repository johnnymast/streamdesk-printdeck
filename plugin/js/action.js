/**
 @file      action.js
 @brief     Print Deck Plugin
 @copyright (c) 2022, Johnny Mast
 @license   This source code is licensed under the MIT-style license found in the LICENSE file.
 */

class Action {

  static actionUUID = ''

  /**
   * Callback for actions to overwrite, so they get notified when
   * the button (key) is down.
   *
   * @param {Object} evt The event object.
   * @public
   */
  onKeyDown (event) {
    // This will be overwritten
  }

  /**
   * Callback for actions to overwrite, so they get notified when
   * the button (key) is up.
   *
   * @param {Object} evt The event object.
   * @public
   */
  onKeyUp (event) {
    // This will be overwritten
  }
}