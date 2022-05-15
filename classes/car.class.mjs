import Sensor from "./sensor.class.mjs"
import Controls from "./controls.class.mjs"

class Car {
  constructor(x, y, width, height) {
    this.x = x
    this.y = y
    this.angle = 0
    this.width = width
    this.height = height
    this.speed = 0
    this.acceleration = 0.2
    this.maxSpeed = 5
    this.friction = 0.02
    this.color = 'darkblue'
    this.controls = new Controls()
    this.sensor = new Sensor(this)
  }

  update() {
    this.#move()
    this.sensor.update()
  }

  draw(ctx) {
    this.sensor.draw(ctx)
    
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(-this.angle)
    ctx.rect(- this.width / 2, - this.height / 2, this.width, this.height)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.restore()
  }

  #move() {
    if (this.controls.forward && this.speed < this.maxSpeed) {
      this.speed += this.acceleration
    }
    if (this.controls.reverse && this.speed > -this.maxSpeed / 2) {
      this.speed -= this.acceleration
    }

    if (this.speed > 0) this.speed = Math.max(this.speed - this.friction, 0)
    if (this.speed < 0) this.speed = Math.min(this.speed + this.friction, 0)

    if (this.speed !== 0) {
      const flip = this.speed > 0 ? 1 : -1
      if (this.controls.left) this.angle += 0.02 * flip
      if (this.controls.right) this.angle -= 0.02 * flip
    }


    this.y -= this.speed * Math.cos(this.angle)
    this.x -= this.speed * Math.sin(this.angle)
  }
}

export default Car