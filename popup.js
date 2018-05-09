const queryKey = document.getElementById('queryKey')
const queryValue = document.getElementById('queryValue')
const toggle = document.getElementById('toggle')

queryValue.addEventListener('change', ({ target: { value }}) => {

  storage.set('browser', value, () => {
    chrome.runtime.sendMessage({browser: value})
    queryValue.value = value
  })
})

toggle.addEventListener('click', () => {
  storage.get('enabled', ({ enabled }) => {
    storage.set('enabled', !enabled, () => {
      chrome.runtime.sendMessage({enabled})
    })
  })
})

// set popup browser to current one
storage.get('browser', ({ browser = 'chrome' }) => {
  queryValue.value = browser
})

