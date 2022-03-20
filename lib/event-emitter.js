/**
 @file      event-emitter.js
 @brief     Print Deck Plugin
 @copyright (c) 2022, Johnny Mast
 @license   This source code is licensed under the MIT-style license found in the LICENSE file.
 */

class EventEmitter {
  static events = []

  /**
   * Send out an event.
   *
   * @param {string} event The event name.
   * @param {*} data The data to forward to the subscribers of this event.
   */
  static emit (event, data) {
    if (EventEmitter.has(event) === true) {
      EventEmitter.events[event].forEach((fn) => fn(data))
    }
  }

  /**
   * Register a event callback.
   *
   * @param {string} event The event name.
   * @param {callback} fn The callback function.
   */
  static on (event, fn) {
    if (EventEmitter.has(event) === false) {
      EventEmitter.events[event] = new Array()
    }

    EventEmitter.events[event].push(fn)
  }

  /**
   * Check to see if an event has been registered.
   *
   * @param {string} event The name of the event.
   * @returns {boolean}
   */
  static has (event) {
    return (typeof EventEmitter.events[event] !== 'undefined')
  }
}