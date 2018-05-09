(function () {
  let isEnabled
  let selectedBrowser

  chrome.runtime.onMessage.addListener(({ browser, enabled }) => {
    if (browser) {
      selectedBrowser = browser
    } else if (typeof enabled === 'boolean') {
      isEnabled = !enabled

      if (isEnabled) {
        // chrome.browserAction.setIcon({path: "/static/logo128.png"})
      } else {
        // chrome.browserAction.setIcon({path: "/static/off.png"})
      }
    }
  })

  // Init- pull from storage
  storage.get('enabled', ({ enabled }) => {
    storage.get('browser', ({ browser = 'chrome' }) => {
      // set variables using closure, listener will continue to have access to them
      selectedBrowser = browser
      isEnabled = enabled

      // listener will have new values based on message passing
      chrome.webRequest.onBeforeRequest.addListener(
        ({ type, url }) => {
          const byPass = !isEnabled || type !== 'image' || url.indexOf('imformat=') !== -1
          if (byPass) return

          const append = url.indexOf('?') !== -1 ? '&' : '?'
          const redirectUrl =  `${url}${append}imformat=${selectedBrowser}`

          return { redirectUrl }
        },
        {urls: ["<all_urls>"]},
        ["blocking"]
      )
    })
  })
})()
