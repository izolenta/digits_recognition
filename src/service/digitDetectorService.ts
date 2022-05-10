import {NeuralNetwork} from 'brain.js';
import {trainedData} from "./trainedData";

const config = {
  hiddenLayers: [30],
  activation: 'sigmoid',
};

const net = new NeuralNetwork(config)
net.fromJSON(JSON.parse(trainedData));

export function processData(digitData: number[]): number[] {
  return net.run(digitData) as number[];
}
