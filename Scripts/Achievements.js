"use strict"

class Achievements {
  constructor() {
    if (localStorage.getItem("killed-goblins") == null) localStorage.setItem("killed-goblins", "0")
    if (localStorage.getItem("time-in-game") == null) localStorage.setItem("time-in-game", "0")
    if (localStorage.getItem("waves-survived") == null) localStorage.setItem("waves-survived", "0")
    if (localStorage.getItem("killed-goblins-record") == null) localStorage.setItem("killed-goblins-record", "0")

    this.contianer = document.querySelector(".achievements")

    this.close_button = this.contianer.querySelector(".close")
    this.close_button.addEventListener("click", this.hide.bind(this))

    this.achievements = document.querySelectorAll(".achievement")
    this.achievements_text = document.querySelectorAll(".achievement .text")
    this.achievements_progress_bar = document.querySelectorAll(".achievement .progress")
    this.stats = [
      {
        value: +localStorage.getItem("time-in-game"),
        text: (val, req) => `Spend ${req} minutes in the game (${val}/${req})`,
        maxText: (val) => `You spent ${val} minutes in the game`,
        bronze: 10,
        silver: 30,
        gold: 60,
      },
      {
        value: +localStorage.getItem("killed-goblins"),
        text: (val, req) => `Kill ${req} goblins in total (${val}/${req})`,
        maxText: (val) => `You have killed ${val} goblins`,
        bronze: 150,
        silver: 500,
        gold: 1200,
      },
      {
        value: +localStorage.getItem("killed-goblins-record"),
        text: (val, req) => `Kill ${req} goblins in one attempt (${val}/${req})`,
        maxText: (val) => `You have killed ${val} goblins in one attempt`,
        bronze: 75,
        silver: 150,
        gold: 300,
      },
      {
        value: +localStorage.getItem("waves-survived"),
        text: (val, req) => `Survive a total of ${req} waves (${val}/${req})`,
        maxText: (val) => `You have survived a total of ${val} waves`,
        bronze: 25,
        silver: 50,
        gold: 100,
      },
    ]
    this.update()

    setInterval(() => {
      const time_in_game = +localStorage.getItem("time-in-game")
      localStorage.setItem("time-in-game", `${time_in_game + 1}`)
    }, 60000)
  }

  show() {
    this.contianer.style.bottom = "0px"
  }

  hide() {
    this.contianer.style.bottom = null
  }

  update() {
    this.stats[0].value = +localStorage.getItem("time-in-game")
    this.stats[1].value = +localStorage.getItem("killed-goblins")
    this.stats[2].value = +localStorage.getItem("killed-goblins-record")
    this.stats[3].value = +localStorage.getItem("waves-survived")

    for (let i = 0; i < this.achievements.length; i++) {
      if (this.stats[i].value < this.stats[i].bronze) {
        this.achievements_text[i].innerHTML = this.stats[i].text(this.stats[i].value, this.stats[i].bronze)
        this.achievements_progress_bar[i].firstChild.style.width = `${(this.stats[i].value * 100) / this.stats[i].bronze}%`
        continue
      }

      if (this.stats[i].value < this.stats[i].silver) {
        this.achievements[i].className = "achievement bronze"
        this.achievements_text[i].innerHTML = this.stats[i].text(this.stats[i].value, this.stats[i].silver)
        this.achievements_progress_bar[i].firstChild.style.width = `${(this.stats[i].value * 100) / this.stats[i].silver}%`
        continue
      }

      if (this.stats[i].value < this.stats[i].gold) {
        this.achievements[i].className = "achievement bronze silver"
        this.achievements_text[i].innerHTML = this.stats[i].text(this.stats[i].value, this.stats[i].gold)
        this.achievements_progress_bar[i].firstChild.style.width = `${(this.stats[i].value * 100) / this.stats[i].gold}%`
        continue
      }

      this.achievements[i].className = "achievement bronze silver gold"
      this.achievements_text[i].innerHTML = this.stats[i].maxText(this.stats[i].value)
      this.achievements_progress_bar[i].firstChild.style.width = "100%"
    }
  }
}
