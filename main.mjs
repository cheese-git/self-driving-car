import Car from './car.class.mjs'

const canvas = document.getElementById('my-canvas')
canvas.width = 300
canvas.height = window.innerHeight

const ctx = canvas.getContext('2d')

const car = new Car(100, 200, 50, 100)

animate()

function animate(){
  canvas.height = window.innerHeight
  car.update()
  car.draw(ctx)
  requestAnimationFrame(animate)
}