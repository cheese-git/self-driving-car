import { lerp } from "./utils.mjs"

export default class Road {
  constructor(x, width, laneCount = 3) {
    this.x = x
    this.width = width
    this.laneCount = laneCount

    this.left = this.x - this.width / 2
    this.right = this.x + this.width / 2

    const infinity = 1000000
    this.top = -infinity
    this.bottom = infinity
  }

  getLaneCenter(index) {
    const laneWidth = this.width / this.laneCount
    return this.left + laneWidth * index + laneWidth / 2
  }

  draw(ctx) {
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 5

    for (let i = 0; i <= this.laneCount; i++) {
      const x = lerp(this.left, this.right, i / this.laneCount)
      ctx.beginPath()
      ctx.moveTo(x, this.top)
      ctx.lineTo(x, this.bottom)
      if (i === 0 || i === this.laneCount) ctx.setLineDash([])
      else ctx.setLineDash([20, 20])
      ctx.stroke()
      ctx.closePath()
    }
  }
}