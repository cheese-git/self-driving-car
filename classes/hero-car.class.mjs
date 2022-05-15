import Sensor from "./sensor.class.mjs"
import Car from "./car.class.mjs"
import NeuralNetWork from "./neural-network.class.mjs"

export default class HeroCar extends Car {
  constructor(options) {
    super(options)
    this.maxSpeed = 4
    this.controls.forward = false
    this.controls.bindKeyboardEvents()
    this.sensor = new Sensor(this)
    this.brain = new NeuralNetWork([this.sensor.rayCount, 6, 4])
    window.brain = this.brain
  }

  update(borders, traffic) {
    super.update(borders, traffic)
    this.sensor.update(borders, traffic)
    const inputs = this.sensor.readings.map(r => r ? (1 - r.offset) : 0)
    const outputs = NeuralNetWork.feedForward(this.brain, inputs)
    this.controls.forward = Boolean(outputs[0])
    this.controls.left = Boolean(outputs[1])
    this.controls.right = Boolean(outputs[2])
    this.controls.reverse = Boolean(outputs[3])
  }

  draw(ctx) {
    ctx.save()

    this.sensor.draw(ctx)
    super.draw(ctx)

    ctx.restore()
  }
}