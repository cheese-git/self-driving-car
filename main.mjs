import Car from './car.class.mjs'
import Road from './road.class.mjs'

const canvas = document.getElementById('my-canvas')
canvas.width = 200
canvas.height = window.innerHeight

const ctx = canvas.getContext('2d')
const road = new Road(100, canvas.width * 0.9)
const car = new Car(road.getLaneCenter(1), 200, 30, 50)


animate()

function animate() {
  canvas.height = window.innerHeight
  car.update()
  road.draw(ctx)
  car.draw(ctx)
  requestAnimationFrame(animate)
}