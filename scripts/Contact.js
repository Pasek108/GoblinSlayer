"use strict"

class Contact {
  constructor() {
    this.container = document.querySelector(".contact-container")

    this.open_button = document.querySelector(".contact-open")
    this.open_button.addEventListener("click", this.showForm.bind(this))

    this.close_button = this.container.querySelector(".contact-close")
    this.close_button.addEventListener("click", this.hideForm.bind(this))
  }

  showForm() {
    this.container.style.display = null
  }

  hideForm() {
    this.container.style.display = "none"
  }
}

const contact = new Contact()