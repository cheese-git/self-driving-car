export default class NeuralLevel {
  constructor({ inputCount, outputCount }) {
    this.inputCount = inputCount
    this.outputCount = outputCount

    this.inputs = new Array(this.inputCount)
    this.outputs = new Array(this.outputCount)
    this.biases = new Array(this.outputCount)

    this.weights = []

    for (let i = 0; i < this.inputCount; i++) {
      this.weights[i] = new Array(this.outputCount)
    }

    NeuralLevel.#randomize(this)
  }

  static #randomize(level) {
    for (let i = 0; i < level.inputCount; i++) {
      for (let j = 0; j < level.outputCount; j++) {
        level.weights[i][j] = Math.random() * 2 - 1
      }
    }

    for (let i = 0; i < level.outputCount; i++) {
      level.biases[i] = Math.random() * 2 - 1
    }
  }

  static feedForward(level, givenInputs) {
    for(let i=0; i<level.inputs.length; i++) {
      level.inputs[i] = givenInputs[i]
    }
    
    for(let i = 0; i < level.outputs.length; i++) {
      let sum = 0
      for(let j = 0; j < level.inputs.length; j++) {
         sum += level.weights[j][i] * level.inputs[j]
      }
      if(sum > level.biases[i]) {
        level.outputs[i] = 1
      }else{
        level.outputs[i] = 0
      }
    }

    return level.outputs
  }
}