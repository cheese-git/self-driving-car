import Sensor from "./sensor.class.mjs"
import Car from "./car.class.mjs"

export default class HeroCar extends Car {
  constructor(options) {
    super(options)
    this.maxSpeed = 4
    this.controls.forward = false
    this.controls.bindKeyboardEvents()
    this.sensor = new Sensor(this)
  }

  update(borders) {
    super.update(borders)
    this.sensor.update(borders)
  }

  draw(ctx) {
    ctx.save()

    this.sensor.draw(ctx)
    super.draw(ctx)

    ctx.restore()
  }
}