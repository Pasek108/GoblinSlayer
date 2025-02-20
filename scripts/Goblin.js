"use strict"

class Goblin {
  constructor(canvas_w, canvas_h, id, side, speed) {
    this.img = new Image()
    this.img.src = "images/goblin.png"
    this.size = { w: 65, h: 80 }
    this.pos = { x: 0, y: canvas_h - 185 }
    this.side = side
    this.speed = speed
    this.frame = 0
    this.killed = false

    this.death_sound = new Audio("sound/goblin_death.mp3")
    if (Menu.is_sound_muted) this.death_sound.volume = 0
    else this.death_sound.volume = 0.5

    if (this.side) {
      this.pos.x = -canvas_w / 2 - id * (400 - this.speed * 17)
      this.old_x = -canvas_w / 2
    } else {
      this.pos.x = canvas_w / 2 + id * (400 - this.speed * 17)
      this.old_x = canvas_w / 2
    }
  }

  draw(ctx) {
    if (this.killed) return
    ctx.drawImage(this.img, this.side * 160 + this.frame * 80, 0, 80, 90, this.pos.x, this.pos.y, this.size.w, this.size.h)

    if (this.side) {
      this.pos.x += this.speed

      if (this.pos.x > this.old_x + 40 + this.speed * 5) {
        this.old_x = this.pos.x
        this.frame = (this.frame + 1) % 2
      }
    } else {
      this.pos.x -= this.speed

      if (this.pos.x < this.old_x - 40 - this.speed * 5) {
        this.old_x = this.pos.x
        this.frame = (this.frame + 1) % 2
      }
    }
  }
}
