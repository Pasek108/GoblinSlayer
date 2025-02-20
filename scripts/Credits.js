"use strict"

class Credits {
  constructor() {
    this.contianer = document.querySelector(".credits")

    this.close_button = this.contianer.querySelector(".close")
    this.close_button.addEventListener("click", this.hide.bind(this))

    // contact
    this.contact_container = document.querySelector(".contact-container")

    this.contact_open_button = document.querySelector(".contact-open")
    this.contact_open_button.addEventListener("click", this.showContactForm.bind(this))

    this.contact_close_button = this.container.querySelector(".contact-close")
    this.contact_close_button.addEventListener("click", this.hideContactForm.bind(this))
  }

  show() {
    this.contianer.style.top = "0px"
  }

  hide() {
    this.contianer.style.top = null
  }

  showContactForm() {
    this.contact_container.style.display = null
  }

  hideContactForm() {
    this.contact_container.style.display = "none"
  }
}
