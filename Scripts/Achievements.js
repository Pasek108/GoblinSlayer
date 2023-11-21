"use strict"

class Achievements {
  constructor() {
    if (localStorage.getItem("killed-goblins") == null) localStorage.setItem("killed-goblins", "0")
    if (localStorage.getItem("time-in-game") == null) localStorage.setItem("time-in-game", "0")
    if (localStorage.getItem("waves-survived-record") == null) localStorage.setItem("waves-survived-record", "0")
    if (localStorage.getItem("killed-goblins-record") == null) localStorage.setItem("killed-goblins-record", "0")

    this.contianer = document.querySelector(".achievements")

    this.close_button = this.contianer.querySelector(".close")
    this.close_button.addEventListener("click", this.hide.bind(this))

    this.stats = this.contianer.querySelectorAll(".stats span")
    this.achievements = document.querySelectorAll(".achievement")
    this.achievements_text = document.querySelectorAll(".achievement .text .progress-counter")
    this.achievements_progress = document.querySelectorAll(".achievement .progress")
    this.update()

    setInterval(() => {
      const time_in_game = +localStorage.getItem("time-in-game") + 1
      localStorage.setItem("time-in-game", `${time_in_game}`)
    }, 60000)
  }

  show() {
    this.contianer.style.bottom = "0px"
  }

  hide() {
    this.contianer.style.bottom = null
  }

  update() {
    this.stats.forEach((stat) => (stat.innerHTML = localStorage.getItem(stat.className)))

    for (let i = 0; i < this.achievements.length; i++) {
      const required = this.achievements_progress[i].dataset.req
      const value = localStorage.getItem(this.stats[i].className)

      if (+value >= +required) {
        this.achievements[i].style.borderColor = "#f5bd02"
        this.achievements_text[i].innerHTML = `(${required}/${required})`
        this.achievements_progress[i].firstChild.style.width = "100%"
      } else {
        this.achievements[i].style.borderColor = null
        this.achievements_text[i].innerHTML = `(${value}/${required})`
        this.achievements_progress[i].firstChild.style.width = `${(value * 100) / required}%`
      }
    }
  }
}
