"use strict"

class Menu {
  static is_sound_muted = false

  constructor() {
    this.contianer = document.querySelector(".menu")

    this.option_select_sound = new Audio("Sound/menu_selection.wav")
    this.option_select_sound.volume = 0.7

    this.menu_music = new Audio("Sound/menu_music.mp3")
    this.menu_music.loop = true
    window.addEventListener("DOMContentLoaded", () => this.menu_music.play())
    window.addEventListener("click", () => (this.menu_music.currentTime == 0 ? this.menu_music.play() : ""))

    this.sound_volume = this.contianer.querySelector(".volume")
    this.sound_volume.addEventListener("click", this.toggleSound.bind(this))

    this.background = new SnowBackground()
    this.background.start()
    this.game = new Game()
    this.achievements = new Achievements()
    this.credits = new Credits()

    this.options = this.contianer.querySelectorAll(".option")
    this.options.forEach((option) => option.addEventListener("mouseenter", (evt) => this.optionFocus(evt, option)))

    this.options[0].addEventListener("click", () => {
      this.background.stop()
      this.game.start()
      this.menu_music.pause()
    })
    this.options[1].addEventListener("click", () => this.achievements.show())
    this.options[2].addEventListener("click", () => this.credits.show())
  }

  show() {
    this.background.start()
    if (!Menu.is_sound_muted) this.menu_music.play()
    this.achievements.update()
  }

  toggleSound() {
    if (this.sound_volume.classList.contains("muted")) {
      this.sound_volume.classList.remove("muted")
      this.menu_music.play()
      Menu.is_sound_muted = false
    } else {
      this.sound_volume.classList.add("muted")
      this.menu_music.pause()
      Menu.is_sound_muted = true
    }
  }

  optionFocus(evt, option) {
    evt.preventDefault()

    this.options.forEach((option) => {
      option.blur()
      option.classList.remove("focused")
    })

    option.focus()
    option.classList.add("focused")

    this.option_select_sound.currentTime = 0
    if (!Menu.is_sound_muted) this.option_select_sound.play()
  }
}

const menu = new Menu()
