import { getIntersection, lerp } from "../utils.mjs"

export default class Sensor {
  constructor(car) {
    this.car = car
    this.rayCount = 6
    this.rayLength = 200
    this.raySpread = Math.PI / 2
    this.rays = []
    this.readings = []

  }

  update(borders, traffic) {
    this.#spreadRays()

    this.readings = []

    this.rays.forEach(ray => {
      const intersections = []

      borders.forEach(border => {
        const intersection = getIntersection(ray[0], ray[1], border[0], border[1])
        if (intersection) intersections.push(intersection)
      })

      traffic.forEach(trafficCar => {
        for (let i = 0; i < trafficCar.polygon.length; i++) {
          const line = [trafficCar.polygon[i], trafficCar.polygon[(i + 1) % trafficCar.polygon.length]]
          const intersection = getIntersection(ray[0], ray[1], line[0], line[1])
          if (intersection) intersections.push(intersection)

        }
      })

      if (intersections.length) {
        const offsets = intersections.map(intersection => intersection.offset)
        const offset = Math.min(...offsets)
        this.readings.push(intersections.find(intersection => intersection.offset === offset))
      } else {
        this.readings.push(null)
      }
    })
  }

  draw(ctx) {
    this.rays.forEach((ray, i) => {
      const end = this.readings[i] || ray[1]

      ctx.beginPath()
      ctx.moveTo(ray[0].x, ray[0].y)
      ctx.lineTo(end.x, end.y)
      ctx.setLineDash([5, 5])
      ctx.strokeStyle = this.readings[i] ? 'orange' : '#00ff00'
      ctx.stroke()
    })
  }

  #spreadRays() {
    this.rays = []
    for (let i = 0; i < this.rayCount; i++) {
      const angle = lerp(this.raySpread / 2, -this.raySpread / 2, i / (this.rayCount - 1)) + this.car.angle

      this.rays.push([
        { x: this.car.x, y: this.car.y },
        {
          x: this.car.x - this.rayLength * Math.sin(angle),
          y: this.car.y - this.rayLength * Math.cos(angle)
        },
      ])
    }
  }
}
