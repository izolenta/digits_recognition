import {NeuralNetwork} from 'brain.js';
import {brainjsTrainedData} from "./brainjsTrainedData";

const config = {
  hiddenLayers: [30],
  activation: 'sigmoid',
};

const net = new NeuralNetwork(config)
net.fromJSON(JSON.parse(brainjsTrainedData));

export function processData(digitData: number[]): number[] {
  return net.run(digitData) as number[];
}
