import Controls from "./controls.class.mjs"
import { assertPolygonIntersection } from "../utils.mjs"

class Car {
  constructor(x, y, width, height) {
    this.x = x
    this.y = y
    this.angle = 0
    this.width = width
    this.height = height
    this.speed = 0
    this.acceleration = 0.2
    this.maxSpeed = 2
    this.friction = 0.02
    this.color = 'darkblue'
    this.controls = new Controls()
    this.controls.forward = true
    this.polygon = this.#createPolygon()

    this.damaged = false
  }

  update(borders) {
    this.polygon = this.#createPolygon()
    this.damaged = this.#assertDamage(borders)
    !this.damaged && this.#move()
  }

  draw(ctx) {
    ctx.save()

    ctx.moveTo(this.polygon[0].x, this.polygon[0].y)
    for (let i = 1; i < this.polygon.length; i++) {
      ctx.lineTo(this.polygon[i].x, this.polygon[i].y)
    }
    ctx.fillStyle = this.damaged ? 'gray' : 'black'
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

  #assertDamage(roadBorders) {
    for (let i = 0; i < roadBorders.length; i++) {
      const touch = assertPolygonIntersection(this.polygon, roadBorders[i])
      if (touch) {
        return true
      }
    }

    return false
  }
}

export default Car