import { lerp } from "../utils.mjs"

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

    const leftTop = { x: this.left, y: this.top }
    const rightTop = { x: this.right, y: this.top }
    const leftBottom = { x: this.left, y: this.bottom }
    const rightBottom = { x: this.right, y: this.bottom }

    this.borders = [
      [leftTop, leftBottom],
      [rightTop, rightBottom],
    ]
  }

  getLaneCenter(index) {
    const laneWidth = this.width / this.laneCount
    return this.left + laneWidth * index + laneWidth / 2
  }

  draw(ctx) {
    ctx.save()
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 5

    ctx.setLineDash([20, 20])
    for (let i = 1; i < this.laneCount; i++) {
      const x = lerp(this.left, this.right, i / this.laneCount)
      ctx.beginPath()
      ctx.moveTo(x, this.top)
      ctx.lineTo(x, this.bottom)
      ctx.stroke()
    }


    ctx.setLineDash([])
    this.borders.forEach(border => {
      ctx.beginPath()
      ctx.moveTo(border[0].x, border[0].y)
      ctx.lineTo(border[1].x, border[1].y)
      ctx.stroke()
    })
    
    ctx.restore()
  }

}