import Car from './classes/car.class.mjs'
import HeroCar from './classes/hero-car.class.mjs'
import Road from './classes/road.class.mjs'
import Visualizer from './classes/visualizer.class.mjs'

const carCanvas = document.getElementById('car-canvas')
carCanvas.width = 200
carCanvas.height = window.innerHeight
const neuralCanvas = document.getElementById('neural-canvas')
neuralCanvas.width = 300
neuralCanvas.height = window.innerHeight

const carCtx = carCanvas.getContext('2d')
const neuralCtx = neuralCanvas.getContext('2d')

const road = new Road(100, carCanvas.width * 0.9)
const heroCar = new HeroCar({
  x: road.getLaneCenter(1),
  y: 100,
  color: 'blue'
})
const traffic = [
  new Car({
    x: road.getLaneCenter(1),
    y: -100,
    color: 'red'
  })
]


animate()

function animate(time) {
  carCanvas.height = window.innerHeight
  neuralCanvas.height = window.innerHeight
  heroCar.update(road.borders, traffic)
  traffic.forEach(car => car.update(road.borders, [heroCar]))

  carCtx.save()
  carCtx.translate(0, -heroCar.y + carCanvas.height * 0.7)
  road.draw(carCtx)
  traffic.forEach(car => car.draw(carCtx))
  heroCar.draw(carCtx)
  carCtx.restore()
  
  neuralCtx.lineDashOffset = - time / 80
  Visualizer.drawNetwork(neuralCtx, heroCar.brain)
  
  requestAnimationFrame(animate)
}