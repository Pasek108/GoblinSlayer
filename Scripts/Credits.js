"use strict"

class Credits {
  constructor() {
    this.contianer = document.querySelector(".credits")

    this.close_button = this.contianer.querySelector(".close")
    this.close_button.addEventListener("click", this.hide.bind(this))
  }

  show() {
    this.contianer.style.top = "0px"
  }

  hide() {
    this.contianer.style.top = null
  }
}
