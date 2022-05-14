import Controls from "./controls.class.mjs"

class Car {
  constructor(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.speed = 0
    this.acceleration = 0.2
    this.maxSpeed = 5
    this.friction = 0.02
    this.color = 'darkblue'
    this.controls = new Controls()
  }

  update() {
    if (this.controls.forward && this.speed < this.maxSpeed) {
      this.speed += this.acceleration
    }
    if (this.controls.reverse && this.speed > -this.maxSpeed / 2) {
      this.speed -= this.acceleration
    }

    if (this.speed > 0) this.speed = Math.max(this.speed - this.friction, 0)
    if (this.speed < 0) this.speed = Math.min(this.speed + this.friction, 0)

    this.y -= this.speed
  }

  draw(ctx) {
    ctx.rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height)
    ctx.fillStyle = this.color
    ctx.fill()
  }
}

export default Car