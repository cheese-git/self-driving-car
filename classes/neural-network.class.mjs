import { lerp } from "../utils.mjs"
import NeuralLevel from "./neural-level.class.mjs"

export default class NeuralNetWork {
  constructor(neuralCounts) {
    this.levels = []
    for (let i = 0; i < neuralCounts.length - 1; i++) {
      this.levels.push(
        new NeuralLevel({ inputCount: neuralCounts[i], outputCount: neuralCounts[i + 1] })
      )
    }
  }

  static feedForward(network, givenInputs) {
    let outputs = NeuralLevel.feedForward(network.levels[0], givenInputs)
    for (let i = 1; i < network.levels.length; i++) {
      outputs = NeuralLevel.feedForward(network.levels[i], outputs)
    }

    return outputs
  }

  static mutate(network, mutationRate) {
    network.levels.forEach(level => {
      for (let i = 0; i < level.biases.length; i++) {
        level.biases[i] = lerp(
          level.biases[i],
          Math.random() * 2 - 1,
          mutationRate
        )
      }

      for (let i = 0; i < level.inputs.length; i++) {
        for (let j = 0; j < level.outputs.length; j++) {
          level.weights[i][j] = lerp(
            level.weights[i][j],
            Math.random() * 2 - 1,
            mutationRate
          )
        }
      }
    })
  }
}