'use strict'

if (typeof window !== 'undefined') {
  // This will only run in the browser.
  console.log('Hello from the browser!')
  window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed')
  })
}
