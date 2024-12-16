import React, { useState, useEffect } from 'react';
import * as ml5 from 'ml5';

function FoodFeedbackSentimentAnalyzer({ feedbackData }) {
  const [foodSentiments, setFoodSentiments] = useState([]);
  const [overallSentiment, setOverallSentiment] = useState({});

  useEffect(() => {
    // Group feedback by food item
    const groupedFeedback = {};
    feedbackData.forEach((feedback) => {
      if (!groupedFeedback[feedback.food]) {
        groupedFeedback[feedback.food] = [];
      }
      groupedFeedback[feedback.food].push(feedback.comment);
    });

    // Load the sentiment analysis model
    const sentimentModel = ml5.sentiment('movieReviews', modelReady);

    // Callback function when the model is loaded
    function modelReady() {
      console.log('Sentiment model loaded!');
      const foodSentiments = Object.keys(groupedFeedback).map((food) => {
        const comments = groupedFeedback[food];
        const sentimentScores = comments.map((comment) => {
          const prediction = sentimentModel.predict(comment);
          return prediction.score * 10; 
        });
        const averageSentiment = sentimentScores.reduce((total, score) => total + score, 0) / sentimentScores.length;
        const sentimentLabelOut = (averageSentiment) =>{
          if(averageSentiment>=0 && averageSentiment<=3.33){
            return 'Negative';
          }
          else if(averageSentiment>=3.34 && averageSentiment<=6.33){
            return 'Moderate';
          }
          else if(averageSentiment>=6.34 && averageSentiment<=10){
            return 'Positive';
          };
        }
        return {
          food: food,
          averageSentiment: averageSentiment.toFixed(2),
          sentimentLabel: sentimentLabelOut(averageSentiment),
          
        };
      });

      setFoodSentiments(foodSentiments);

      // Calculate overall average sentiment
      const overallSentimentLabelOut = (overallAverageSentiment)=>{
        if(overallAverageSentiment>=0 && overallAverageSentiment<=3.33){
          return 'Negative';
        }
        else if(overallAverageSentiment>=3.34 && overallAverageSentiment<=6.33){
          return 'Moderate';
        }
        else if(overallAverageSentiment>=6.34 && overallAverageSentiment<=10){
          return 'Positive';
        };
      }
      const allSentimentScores = foodSentiments.map((food) => parseFloat(food.averageSentiment));
      const overallAverageSentiment = allSentimentScores.reduce((total, score) => total + score, 0) / allSentimentScores.length;
      const overallSentimentLabel = overallSentimentLabelOut(overallAverageSentiment);

      setOverallSentiment({
        averageSentiment: overallAverageSentiment.toFixed(2),
        sentimentLabel: overallSentimentLabel,
      });
    }
  }, [feedbackData]);
  const overallSemMarks = overallSentiment.averageSentiment;
  const overallPercent = overallSemMarks * 10;
  return (
    <div style={{ maxHeight: '750px' }}>
      <div className='h-24'>
                <div className='flex flex-row ml-3'>
                <h2 className=' ml-4 mt-3 text-xl font-semibold'>Overall Sentiment</h2>
                </div>
                <div className='flex flex-row ml-3'>
                    <div className='flex flex-row h-8 w-2/3 bg-slate-400 rounded-md m-3'>
                        <div style={{ width: `${overallPercent}%` }} className={`h-full  ${overallPercent > 50 ?  'bg-green-600' : 'bg-red-600'} rounded-md`}></div>      
                    </div>
                    <div className='mt-5 font-bold'><h3>{overallPercent}%</h3></div>

                </div>
                
            </div>
          <div>
            <h1 className='text-xl font-bold ml-16'>Food Feedback Sentiment Analyzer</h1>
                  <div className='flex flex-wrap ml-16 mt-4'>
                  {foodSentiments.map((item, index) => (
                <div key={index} className={`mr-6 mb-5 w-64 h-42 p-6 pl-7 rounded-md bg-blue-800 text-slate-300 `}>
                  <p className='font-semibold'>Food: {item.food}</p>
                  <li className='list-disc'>Average Sentiment Score (out of 10): {item.averageSentiment}</li>
                  <li className='flex flex-row'>Sentiment: <p className={` pl-3 ${item.sentimentLabel === 'Positive' ? 'text-green-500' : item.sentimentLabel === 'Moderate' ? 'text-yellow-500' : 'text-red-600'}`}>{item.sentimentLabel}</p> </li>
                </div>
                ))}
            </div>
            <div>
              <h1 className='ml-10 text-2xl mb-2 font-semibold'>Overall :</h1>
            <div className={` w-96 h-36 p-6 pl-7 rounded-md ml-10 bg-gray-300`}>
              <h2 className='text-xl font-semibold '>Overall Average Sentiment</h2>
              <p>Average Sentiment Score (out of 10): {overallSentiment.averageSentiment}</p>
              <p className='flex flex-row'>Sentiment: <p className={` pl-3 ${overallSentiment.sentimentLabel === 'Positive' ? 'text-lime-500' : overallSentiment.sentimentLabel=== 'Moderate' ? 'text-yellow-500' : 'text-red-600'}`}>{overallSentiment.sentimentLabel}</p></p>
            </div>
            </div>
          </div>
          <div className='h-24'></div>

    </div>
  );
}

// Default dataset (example)
FoodFeedbackSentimentAnalyzer.defaultProps = {
  feedbackData: [
    { food: "pizza", comment: "Delicious and cheesy!" },
    { food: "pizza", comment: "worthless" },
    { food: "pizza", comment: " very bad." },
    { food: "burger", comment: "very bad taste" },
    { food: "burger", comment: "tasteless." },
    { food: "sushi", comment: "Fresh and tasty!" },
    { food: "sushi", comment: "Not fresh, disappointed." },
    { food: "pasta", comment: "nothing special." },
    { food: "pasta", comment: "Too salty, couldn't eat it." },
    { food: "tacos", comment: "Spicy and flavorful!" },
    { food: "tacos", comment: "Authentic Mexican taste." },
    { food: "tacos", comment: "Too greasy, didn't enjoy." },
    { food: "rajma", comment: "amazing!" },
    { food: "rajma", comment: "Perfect with steamed rice." },
    { food: "rajma", comment: "Spiced well, full of flavors." },
    { food: "chole", comment: "Rich and aromatic!" },
    { food: "chole", comment: "Pair with fluffy bhature for a delicious meal." },
    { food: "rice", comment: "Fluffy and light!" },
    { food: "rice", comment: "Great staple for any meal." },
    { food: "chapati", comment: "Soft and chewy!" },
    { food: "chapati", comment: "Perfect for scooping up curry." },
    { food: "dal", comment: "Hearty and flavorful!" },
    { food: "dal", comment: "Comfort food at its best." },
    { food: "pasta", comment: "Al dente perfection!" },
    { food: "pasta", comment: "Creamy sauce, delicious!" },
    { food: "steak", comment: "should not be eaten!" },
    { food: "steak", comment: "don't eat we worship cow." },
    { food: "salad", comment: "Fresh and crisp!" },
    { food: "salad", comment: "Healthy and satisfying." },
    { food: "smoothie", comment: "Refreshing and nutritious!" },
    { food: "smoothie", comment: "Great for a quick breakfast or snack." },
    { food: "omelette", comment: "tasteless and very bad" },
    { food: "omelette", comment: "Customize with your favorite fillings." },
    { food: "sandwich", comment: "Loaded with fresh veggies and tasty sauces!" },
    { food: "sandwich", comment: "Perfect for a quick and satisfying lunch." },
    { food: "sandwich", comment: "Bland and uninspired, didn't enjoy it at all." },
    { food: "soup", comment: "Warm and comforting on a chilly day." },
    { food: "soup", comment: "Homemade soup is the best, so flavorful!" },
    { food: "soup", comment: "Too salty, couldn't finish it." },
    { food: "burrito", comment: "A delicious handheld meal packed with flavor." },
    { food: "burrito", comment: "Love the combination of ingredients, so tasty!" },
    { food: "burrito", comment: "Dry and overcooked, disappointing experience." },
    { food: "curry", comment: "Spicy and aromatic, a true delight for the senses." },
    { food: "curry", comment: "belong to dustbin." },
    { food: "curry", comment: "horible and waste of money" },
    { food: "pancake", comment: "very bad." },
    { food: "pancake", comment: "Stack them high and enjoy with your favorite toppings!" },
    { food: "pancake", comment: "Burnt edges, ruined the whole breakfast." },
    { food: "sushi", comment: "Fresh and delicate, a culinary work of art." },
    { food: "sushi", comment: "Love the variety of flavors and textures in sushi rolls." },
    { food: "sushi", comment: "Fish tasted off, couldn't eat more than one piece." },
    { food: "tacos", comment: "Crispy shell filled with savory goodness, a taco lovers dream!" },
    { food: "tacos", comment: "Topped with zesty salsa and creamy guacamole, perfection!" },
    { food: "tacos", comment: "Soggy shell and bland filling, not worth the money." },
    { food: "pizza", comment: "Cheesy goodness on a crispy crust, always a crowd pleaser." },
    { food: "pizza", comment: "Loaded with all my favorite toppings, simply irresistible." },
    { food: "pizza", comment: "Greasy and soggy, definitely not ordering from here again." },
    { food: "cake", comment: "Decadent layers of moist cake and creamy frosting, a sweet indulgence." },
    { food: "cake", comment: "Celebrating with cake makes any occasion special." },
    { food: "cake", comment: "Dry and flavorless, couldn't even finish a slice." },
    { food: "ice cream", comment: "Creamy and delicious, the perfect treat on a hot day." },
    { food: "ice cream", comment: "Indulge in a scoop of your favorite flavor, pure bliss!" },
    { food: "ice cream", comment: "Freezer burned, tasted awful." }
  ]
};

export default FoodFeedbackSentimentAnalyzer;
