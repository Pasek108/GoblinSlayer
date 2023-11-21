"use strict"

class Hero {
  constructor(canvas_w, canvas_h) {
    this.img = new Image()
    this.img.src = "Images/hero.png"
    this.size = { w: 124, h: 124 }
    this.pos = { x: -this.size.w / 2, y: canvas_h - 220 }
    this.side = 0
    this.attack = 0
    this.attack_timer = 0

    window.addEventListener("touchstart", (e) => {
      this.side = +(e.touches[0].clientX > screen.width / 2)
    })

    document.addEventListener("keydown", (e) => {
      if (e.code === "KeyA") this.side = 0
      else if (e.code === "KeyD") this.side = 1
    })
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.attack * 114 + 114 * (this.side + 1), 0, 114, 100, this.pos.x, this.pos.y, this.size.w, this.size.h)

    if (this.attack == 0) return

    this.attack_timer += 1
    
    if (this.attack_timer > 6) {
      this.attack_timer = 0
      this.attack = 0
    }
  }
}
