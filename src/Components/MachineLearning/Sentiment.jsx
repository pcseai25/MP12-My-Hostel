import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';

function SentimentAnalyzer() {
  const [model, setModel] = useState(null);
  const [feedbackData, setFeedbackData] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPretrainedModel = async () => {
      try {
        const model = await tf.loadLayersModel('https://tfhub.dev/google/tfjs-model/sentiment_analysis/1/default/1');
        setModel(model);
        setLoading(false);
      } catch (error) {
        console.error('Error loading the model:', error);
        setLoading(false);
      }
    };

    loadPretrainedModel();
  }, []);

  const predictSentiment = (text) => {
    if (!model) return;

    const tokenizer = new tf.Tokenizer();
    const inputTensor = tf.tensor2d([tokenizer.encode(text)], [1, 10]);

    model.predict(inputTensor).array().then((predictions) => {
      const sentiment = predictions[0][0] > 0.5 ? 'Positive' : 'Negative';
      setPredictions(prev => [...prev, { text, sentiment }]);
    });
  };

  const handleFeedbackSubmit = () => {
    const trainingData = [
        { comment: "Delicious and cheesy!", sentiment: "Positive" },
        { comment: "Worthless", sentiment: "Negative" },
        // Add more data here
      ];
      

    const tokenizer = new tf.Tokenizer();
    const inputData = trainingData.map((item) => tokenizer.encode(item.comment));
    const labels = trainingData.map((item) => (item.sentiment === 'Positive' ? 1 : 0));

    const inputTensor = tf.tensor2d(inputData, [inputData.length, 10]);
    const labelTensor = tf.tensor1d(labels, 'int32');

    model.fit(inputTensor, labelTensor, {
      epochs: 5,
      batchSize: 1,
      shuffle: true,
    }).then(() => {
      console.log('Model fine-tuned with custom data.');
    });
  };

  if (loading) {
    return <div>Loading model...</div>;
  }

  return (
    <div className='p-4'>
      <h1 className='text-xl font-bold mb-4'>Sentiment Analyzer</h1>
      <input
        type="text"
        placeholder="Enter feedback..."
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            predictSentiment(e.target.value);
            e.target.value = '';
          }
        }}
        className='p-2 border rounded-md w-full'
      />
      <button
        onClick={handleFeedbackSubmit}
        className='mt-4 p-2 bg-blue-500 text-white rounded-md'
      >
        Fine-tune Model
      </button>
      <div className='mt-4'>
        <h2 className='text-lg font-semibold'>Predictions</h2>
        {predictions.map((item, index) => (
          <div key={index} className='mt-2 p-2 border rounded-md'>
            <p className='font-semibold'>Feedback: {item.text}</p>
            <p>Sentiment: <span className={item.sentiment === 'Positive' ? 'text-green-500' : 'text-red-500'}>{item.sentiment}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SentimentAnalyzer;
