"use strict"

class Menu {
  static is_sound_muted = false

  constructor() {
    this.contianer = document.querySelector(".menu")

    this.mute = this.contianer.querySelector(".mute")
    this.mute.addEventListener("click", this.toggleMute.bind(this))

    this.options = this.contianer.querySelectorAll(".option")
    this.options.forEach((option) => option.addEventListener("mouseenter", (evt) => this.optionFocus(evt, option)))

    this.option_select_sound = new Audio("Sound/menu_selection.wav")
    this.option_select_sound.volume = 0.7

    this.menu_music = new Audio("Sound/menu_music.mp3")
    this.menu_music.loop = true
    window.addEventListener("DOMContentLoaded", () => this.menu_music.play())

    this.background = new SnowBackground()
    this.background.start()
    this.game = new Game()
    this.achievements = new Achievements()
    this.credits = new Credits()

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

  toggleMute() {
    const icon = this.mute.firstElementChild

    if (icon.src.includes("On")) {
      icon.src = icon.src.replace("On", "Off")
      this.menu_music.pause()
      Menu.is_sound_muted = true
    } else {
      icon.src = icon.src.replace("Off", "On")
      this.menu_music.play()
      Menu.is_sound_muted = false
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
