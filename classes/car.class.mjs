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
    this.maxSpeed = 3
    this.friction = 0.02
    this.color = 'darkblue'
    this.controls = new Controls()
    this.sensor = new Sensor(this)
    this.polygon = this.#createPolygon()
  }

  update(borders) {
    this.polygon = this.#createPolygon()
    this.#move()
    this.sensor.update(borders)
  }

  draw(ctx) {
    this.sensor.draw(ctx)

    ctx.save()
    ctx.moveTo(this.polygon[0].x, this.polygon[0].y)
    for (let i = 1; i < this.polygon.length; i++) {
      ctx.lineTo(this.polygon[i].x, this.polygon[i].y)
    }
    ctx.fill()
    ctx.restore()
  }

  #createPolygon() {
    const points = []

    const rad = Math.hypot(this.width, this.height) / 2
    const alpha = Math.atan2(this.height, this.width)

    points.push(
      {
        x: this.x + rad * Math.cos(alpha + this.angle),
        y: this.y - rad * Math.sin(alpha + this.angle)
      },
      {
        x: this.x - rad * Math.cos(alpha - this.angle),
        y: this.y - rad * Math.sin(alpha - this.angle)
      },
      {
        x: this.x - rad * Math.cos(alpha + this.angle),
        y: this.y + rad * Math.sin(alpha + this.angle)
      },
      {
        x: this.x + rad * Math.cos(alpha - this.angle),
        y: this.y + rad * Math.sin(alpha - this.angle)
      }
    )

    return points
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