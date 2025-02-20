"use strict"

class Game {
  constructor() {
    this.container = document.querySelector(".game")
    this.ctx = this.container.getContext("2d")

    this.board = document.querySelector(".board")
    this.wave_container = this.board.querySelector(".wave span")
    this.killed_goblins_container = this.board.querySelector(".killed-goblins span")
    this.back_to_menu = this.board.querySelector(".option")
    this.back_to_menu.addEventListener("click", this.backToMenu.bind(this))

    this.container.width = 1920
    this.container.height = 768
    this.ctx.translate(this.container.width / 2, 0)

    this.game_music = new Audio("sound/game_music.mp3")
    this.game_over_music = new Audio("sound/game_over.mp3")

    this.background = new Image()
    this.background.src = "Images/game_background.png"

    this.hero = new Hero(this.container.width, this.container.height)
    this.goblins = [new Goblin(this.container.width, this.container.height, 0, +(Math.random() > 0.5), 3)]

    this.wave = 0
    this.killed_goblins = 0
  }

  start() {
    this.container.style.display = "block"
    this.board.style.display = "flex"

    if (!Menu.is_sound_muted) this.game_music.play()
    this.animation = requestAnimationFrame(this.render.bind(this))
  }

  reset() {
    this.goblins = [new Goblin(this.container.width, this.container.height, 0, +(Math.random() > 0.5), 3)]
    this.wave = 0
    this.killed_goblins = 0

    this.game_over_music.pause()
    this.game_over_music.currentTime = 0
    this.game_music.currentTime = 0

    this.board.classList.remove("game-over")
    this.wave_container.innerHTML = "0"
    this.killed_goblins_container.innerHTML = "0"
  }

  backToMenu() {
    menu.show()
    this.container.style.display = null
    this.board.style.display = null
    this.reset()
  }

  render() {
    this.ctx.drawImage(this.background, -this.container.width / 2, 0, this.container.width, this.container.height)

    this.hero.draw(this.ctx)

    for (let i = 0; i < this.goblins.length; i++) {
      this.goblins[i].draw(this.ctx)

      const goblin_center_pos = Math.abs(this.goblins[i].pos.x + this.goblins[i].size.w / 2)

      if (goblin_center_pos < this.hero.size.w / 2.5) {
        if (this.hero.side != this.goblins[i].side) {
          this.killGoblin(i)
          continue
        }

        if (goblin_center_pos < this.hero.size.w / 4) {
          this.gameOver()
          return
        }
      }
    }

    if (this.goblins.length == 0 || this.goblins[this.goblins.length - 1].killed) this.nextWaveOfGoblins()

    this.animation = requestAnimationFrame(this.render.bind(this))
  }

  nextWaveOfGoblins() {
    this.wave_container.innerHTML = ++this.wave

    this.goblins = []
    let speed = 3 + Math.floor(this.wave / 2)
    let quantity = this.wave + Math.floor(this.wave / 2)

    for (let i = 0; i < quantity; i++) {
      this.goblins.push(new Goblin(this.container.width, this.container.height, i, +(Math.random() > 0.5), speed))
    }
  }

  killGoblin(goblin_id) {
    this.goblins[goblin_id].killed = true
    this.goblins[goblin_id].pos.x = 100000

    this.killed_goblins++
    this.killed_goblins_container.innerHTML = this.killed_goblins

    if (!Menu.is_sound_muted) this.goblins[goblin_id].death_sound.play()
    this.hero.attack = this.goblins[goblin_id].side ? -1 : 1
  }

  gameOver() {
    this.animation = cancelAnimationFrame(this.animation)
    this.game_music.pause()

    if (!Menu.is_sound_muted) this.game_over_music.play()

    this.board.classList.add("game-over")

    this.saveStats()
  }

  saveStats() {
    const killed_goblins = +localStorage.getItem("killed-goblins")
    const waves_survived = +localStorage.getItem("waves-survived")
    const killed_goblins_record = +localStorage.getItem("killed-goblins-record")

    localStorage.setItem("killed-goblins", `${killed_goblins + this.killed_goblins}`)
    localStorage.setItem("waves-survived", `${waves_survived + this.wave}`)
    if (killed_goblins_record < this.killed_goblins) localStorage.setItem("killed-goblins-record", `${this.killed_goblins}`)
  }
}
