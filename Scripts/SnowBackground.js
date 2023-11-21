"use strict"

class SnowBackground {
  constructor() {
    this.container = document.querySelector(".snow-background")
    this.ctx = this.container.getContext("2d")

    this.w = window.innerWidth
    this.h = window.innerHeight
    this.container.width = this.w
    this.container.height = this.h

    this.animation = null
    this.size = this.h / 300
    this.speed = this.h / 100

    this.flakes_amount = 50
    this.flakes = []

    for (let i = 0; i < this.flakes_amount; i++) {
      this.flakes[i] = {
        x: Math.ceil(Math.random() * this.w),
        y: Math.ceil(Math.random() * this.h),
        toX: Math.random() * 5 + 1,
        toY: Math.random() * 5 + 1,
      }
    }
  }

  start() {
    this.animation = this.render()
  }

  stop() {
    cancelAnimationFrame(this.animation)
  }

  render() {
    if (this.w !== window.innerWidth || this.h !== window.innerHeight) {
      this.w = window.innerWidth
      this.h = window.innerHeight
      this.container.width = this.w
      this.container.height = this.h
    }

    this.ctx.clearRect(0, 0, this.w, this.h)

    this.flakes.forEach((flake) => {
      this.ctx.beginPath()
      this.ctx.arc(flake.x, flake.y, this.size, 0, Math.PI * 2, false)
      this.ctx.fillStyle = "#ffffff"
      this.ctx.fill()

      flake.x = flake.x - flake.toX * (this.speed * 0.05)
      flake.y = flake.y + flake.toY * (this.speed * 0.05)

      if (flake.x > this.w) flake.x = 0
      if (flake.y > this.h) flake.y = 0
      if (flake.x < 0) flake.x = this.w
      if (flake.y < 0) flake.y = this.h
    })

    this.animation = requestAnimationFrame(this.render.bind(this))
  }
}
