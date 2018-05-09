const storage = {
  get: (key, cb) => {
    chrome.storage.local.get(key, val => {
        if (cb) cb(val)
    })
  },
  set: (key, val, cb) => chrome.storage.local.set({[key]: val}, cb)
}
