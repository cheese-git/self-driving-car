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

const traffic = [
  new Car({
    x: road.getLaneCenter(1),
    y: -100,
    color: 'red'
  })
]

const N = 300
const heroCars = []
for (let i = 0; i < N; i++) {
  heroCars.push(new HeroCar({
    x: road.getLaneCenter(1),
    y: 100,
    color: 'blue'
  }))
}

let bestHeroCar = heroCars[0]
if(localStorage.getItem('network')) {
  bestHeroCar.brain = JSON.parse(localStorage.getItem('network'))
}


animate()

function animate(time) {
  carCanvas.height = window.innerHeight
  neuralCanvas.height = window.innerHeight
  heroCars.forEach(heroCar => heroCar.update(road.borders, traffic))
  traffic.forEach(car => car.update(road.borders, []))

  bestHeroCar = heroCars.find(car => car.y === Math.min(...heroCars.map(car => car.y)))

  carCtx.save()
  carCtx.translate(0, -bestHeroCar.y + carCanvas.height * 0.7)
  road.draw(carCtx)
  traffic.forEach(car => car.draw(carCtx))
  carCtx.globalAlpha = 0.2
  heroCars.forEach(heroCar => {
    heroCar.draw(carCtx)
  })
  carCtx.globalAlpha = 1
  bestHeroCar.draw(carCtx)
  carCtx.restore()


  neuralCtx.lineDashOffset = - time / 80
  Visualizer.drawNetwork(neuralCtx, bestHeroCar.brain)

  requestAnimationFrame(animate)
}

window.saveTheBestBrain = () => {
  localStorage.setItem('network', JSON.stringify(bestHeroCar.brain))
}