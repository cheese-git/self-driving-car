import Car from './classes/car.class.mjs'
import HeroCar from './classes/hero-car.class.mjs'
import Road from './classes/road.class.mjs'

const canvas = document.getElementById('my-canvas')
canvas.width = 200
canvas.height = window.innerHeight

const ctx = canvas.getContext('2d')
const road = new Road(100, canvas.width * 0.9)
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

function animate() {
  canvas.height = window.innerHeight
  heroCar.update(road.borders, traffic)
  traffic.forEach(car => car.update(road.borders, [heroCar]))

  ctx.save()
  ctx.translate(0, -heroCar.y + canvas.height * 0.7)
  road.draw(ctx)
  traffic.forEach(car => car.draw(ctx))
  heroCar.draw(ctx)
  ctx.restore()
  
  requestAnimationFrame(animate)
}