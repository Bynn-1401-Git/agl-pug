'use strict'

if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    const btnMenu = document.querySelector('#menu__btn_hamburger')
    const menuList = document.querySelector('#menu__list')

    if (!menuList || !btnMenu) {
      console.error('Element not found')
      return void 0
    }

    btnMenu.addEventListener('click', (even) => {
      if (window.scrollY > 120) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
        menuList.classList.add('open__menu')
      } else {
        menuList.classList.toggle('open__menu')
      }
    })

    window.addEventListener('scroll', () => {
      const header = document.getElementById('my_header')
      clearTimeout(header.timeout)
      header.timeout = setTimeout(() => {
        if (window.scrollY > 120) {
          header.classList.add('fixed')
          menuList.classList.remove('open__menu')
        } else {
          header.classList.remove('fixed')
        }
      }, 100)
    })
  })
}
