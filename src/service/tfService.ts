import tf from '@tensorflow/tfjs'

let model;

async function initModel() {
  await tf.loadGraphModel('/tf_data/model.json');
}

