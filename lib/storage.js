class Storage {
  static values = {}

  static set (key, val) {
    Storage.values[key] = val
  }

  static getAll () {
    return Storage.values
  }

  static get (key, default_value) {
    if (Storage.has(key)) {
      return Storage.values[key]
    } else {
      return default_value
    }
  }

  static has (key) {
    return (typeof Storage.values[key] !== 'undefined')
  }

  hasInfo() {
    return (Object.keys(Storage.values).length > 0)
  }
}