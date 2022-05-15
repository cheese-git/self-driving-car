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
}