import { lerp } from "../utils.mjs"

export default class Sensor {
  constructor(car) {
    this.car = car
    this.rayCount = 3
    this.rayLength = 150
    this.raySpread = Math.PI / 4
    this.rays = []


  }

  update() {
    this.rays = []
    for (let i = 0; i < this.rayCount; i++) {
      const angle = lerp(this.raySpread / 2, -this.raySpread / 2, i / (this.rayCount - 1)) + this.car.angle

      this.rays.push([
        { x: this.car.x, y: this.car.y },
        {
          x: this.car.x - this.rayLength * Math.sin(angle ),
          y: this.car.y - this.rayLength * Math.cos(angle )
        },
      ])
    }
  }

  draw(ctx) {
    this.rays.forEach(ray => {
      ctx.beginPath()
      ctx.moveTo(ray[0].x, ray[0].y)
      ctx.lineTo(ray[1].x, ray[1].y)
      ctx.strokeStyle = 'yellow'
      ctx.stroke()
    })
  }
}