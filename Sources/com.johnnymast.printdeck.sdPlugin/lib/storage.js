/**
 @file      storage.js
 @brief     Print Deck Plugin
 @copyright (c) 2022, Johnny Mast
 @license   This source code is licensed under the MIT-style license found in the LICENSE file.
 */

class Storage {

  /**
   * Values are stored in this object.
   * @type {Object}
   */
  static values = {}

  /**
   * Set a value indicated by the key.
   *
   * @param {string} key The key for the value.
   * @param {*} val The value to set.
   */
  static set (key, val) {
    Storage.values[key] = val
  }

  /**
   * Return the value of a key.
   *
   * @param {string} key The value of a key to return.
   * @param {*} default_value If the key has not been set the default_value will be returned.
   *
   * @returns {*}
   */
  static get (key, default_value) {
    if (Storage.has(key)) {
      return Storage.values[key]
    } else {
      return default_value
    }
  }

  /**
   * Check to see if a key has been set.
   *
   * @param {string} key The key to check.
   * @returns {boolean}
   */
  static has (key) {
    return (typeof Storage.values[key] !== 'undefined')
  }
}