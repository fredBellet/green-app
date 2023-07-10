import React, { useState } from 'react';
import axios from 'axios';

const Questions = () => {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);

  const handleAnswerChange = (questionId, selectedOptions) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOptions,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calculate the score based on the answers
    let calculatedScore = 0;

    // Implement your score calculation logic based on the answers
    // Example: Add the selected options' values to calculate the score
    Object.values(answers).forEach((selectedOptions) => {
      // Add the selected options' values to the calculated score
      calculatedScore += selectedOptions.reduce((acc, option) => acc + option.value, 0);
    });

    // Set the calculated score
    setScore(calculatedScore);

    try {
      // Send the score to the backend
      await axios.post('http://localhost:3001/scores', {
        score: calculatedScore,
      });

      // Clear the answers
      setAnswers({});
    } catch (error) {
      console.error('Failed to submit score:', error);
    }
  };


  return (
    <div>
      <h1>Transportation</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Do you primarily use public transportation, walk, or bike instead of driving a car?</h3>
          <label>
            <input
              type="checkbox"
              value="Use public transportation"
              checked={answers['transportation']?.includes('Use public transportation')}
              onChange={(e) =>
                handleAnswerChange('transportation', [
                  ...(answers['transportation'] || []),
                  e.target.value,
                ])
              }
            />
            Use public transportation
          </label>
          <label>
            <input
              type="checkbox"
              value="Walk"
              checked={answers['transportation']?.includes('Walk')}
              onChange={(e) =>
                handleAnswerChange('transportation', [
                  ...(answers['transportation'] || []),
                  e.target.value,
                ])
              }
            />
            Walk
          </label>
          <label>
            <input
              type="checkbox"
              value="Bike"
              checked={answers['transportation']?.includes('Bike')}
              onChange={(e) =>
                handleAnswerChange('transportation', [
                  ...(answers['transportation'] || []),
                  e.target.value,
                ])
              }
            />
            Bike
          </label>
          <label>
            <input
              type="checkbox"
              value="Car"
              checked={answers['transportation']?.includes('Car')}
              onChange={(e) =>
                handleAnswerChange('transportation', [
                  ...(answers['transportation'] || []),
                  e.target.value,
                ])
              }
            />
            Car
          </label>
          <h3>Do you carpool or use ride-sharing services when possible?</h3>
          <label>
            <input
              type="checkbox"
              value="Carpool"
              checked={answers['transportation']?.includes('Carpool')}
              onChange={(e) =>
                handleAnswerChange('transportation', [
                  ...(answers['transportation'] || []),
                  e.target.value,
                ])
              }
            />
            Carpool
          </label>
          <label>
            <input
              type="checkbox"
              value="Carsharing services"
              checked={answers['transportation']?.includes('Carsharing services')}
              onChange={(e) =>
                handleAnswerChange('transportation', [
                  ...(answers['transportation'] || []),
                  e.target.value,
                ])
              }
            />
            Carsharing services
          </label>
<h3>Do you own an electric,hybrid or gasoline vehicle?</h3>
          <label>
            <input
              type="checkbox"
              value="Own an electric vehicle"
              checked={answers['transportation']?.includes('Own an electric vehicle')}
              onChange={(e) =>
                handleAnswerChange('transportation', [
                  ...(answers['transportation'] || []),
                  e.target.value,
                ])
              }
            />
            Own an electric vehicle
          </label>
          <label>
            <input
              type="checkbox"
              value="Own an hybrid vehicle"
              checked={answers['transportation']?.includes('Own an hybrid vehicle')}
              onChange={(e) =>
                handleAnswerChange('transportation', [
                  ...(answers['transportation'] || []),
                  e.target.value,
                ])
              }
            />
            Own an hybrid vehicle
          </label>
          <label>
            <input
              type="checkbox"
              value="Own an gasoline vehicle"
              checked={answers['transportation']?.includes('Own an gasoline vehicle')}
              onChange={(e) =>
                handleAnswerChange('transportation', [
                  ...(answers['transportation'] || []),
                  e.target.value,
                ])
              }
            />
            Own an gasoline vehicle
          </label>
        </div>
        <h1>Food</h1>
        <div>
          <h3>Do you regularly consume locally sourced and organic foods? </h3>

          <label>
            <input
              type="checkbox"
              value="Consume locally sourced foods"
              checked={answers['food']?.includes('Consume locally sourced foods')}
              onChange={(e) =>
                handleAnswerChange('food', [
                  ...(answers['food'] || []),
                  e.target.value,
                ])
              }
            />
            Consume locally sourced foods
          </label>
          <label>
            <input
              type="checkbox"
              value="Consume organic foods"
              checked={answers['food']?.includes('Consume organic foods')}
              onChange={(e) =>
                handleAnswerChange('food', [
                  ...(answers['food'] || []),
                  e.target.value,
                ])
              }
            />
            Consume organic foods
          </label>
          <label>
            <input
              type="checkbox"
              value="Consume locally sourced and organic foods"
              checked={answers['food']?.includes('Consume locally sourced and organic foods')}
              onChange={(e) =>
                handleAnswerChange('food', [
                  ...(answers['food'] || []),
                  e.target.value,
                ])
              }
            />
            Consume locally sourced and organic foods
          </label>
          <h3>Do you avoid excessive food waste and practice composting?</h3>
          <label>
            <input
              type="checkbox"
              value="Avoid excessive food waste"
              checked={answers['food']?.includes('Avoid excessive food waste')}
              onChange={(e) =>
                handleAnswerChange('food', [
                  ...(answers['food'] || []),
                  e.target.value,
                ])
              }
            />
            Avoid excessive food waste
          </label>
          <label>
            <input
              type="checkbox"
              value="Practice composting"
              checked={answers['food']?.includes('Practice composting')}
              onChange={(e) =>
                handleAnswerChange('food', [
                  ...(answers['food'] || []),
                  e.target.value,
                ])
              }
            />
            Practice composting
          </label>
          <label>
            <input
              type="checkbox"
              value="Avoid excessive food waste and practice composting"
              checked={answers['food']?.includes('Avoid excessive food waste and practice composting')}
              onChange={(e) =>
                handleAnswerChange('food', [
                  ...(answers['food'] || []),
                  e.target.value,
                ])
              }
            />
            Avoid excessive food waste and practice composting
          </label>
          <h3>Do you follow a plant-based or vegetarian diet?</h3>
          <label>
            <input
              type="checkbox"
              value="Follow a plant-based or vegetarian diet"
              checked={answers['food']?.includes('Follow a plant-based or vegetarian diet')}
              onChange={(e) =>
                handleAnswerChange('food', [
                  ...(answers['food'] || []),
                  e.target.value,
                ])
              }
            />
            Follow a plant-based or vegetarian diet
          </label>
          <label>
            <input
              type="checkbox"
              value="I do not have a particuliary diet"
              checked={answers['food']?.includes('I do not have a particuliary diet')}
              onChange={(e) =>
                handleAnswerChange('food', [
                  ...(answers['food'] || []),
                  e.target.value,
                ])
              }
            />
            I do not have a particuliary diet
          </label>
        </div>
        <h1>Consumption:</h1>
        <div>
          <h3>Do you prioritize buying second-hand or thrifted items instead of new ones?</h3>
          <label>
            <input
              type="checkbox"
              value="Prioritize buying second-hand or thrifted items"
              checked={answers['consumption']?.includes('Prioritize buying second-hand or thrifted items')}
              onChange={(e) =>
                handleAnswerChange('consumption', [
                  ...(answers['consumption'] || []),
                  e.target.value,
                ])
              }
            />
            Prioritize buying second-hand or thrifted items
          </label>
          <label>
            <input
              type="checkbox"
              value="I do not prioritize buying second-hand or thrifted items"
              checked={answers['consumption']?.includes('I do not prioritize buying second-hand or thrifted items')}
              onChange={(e) =>
                handleAnswerChange('consuption', [
                  ...(answers['consumption'] || []),
                  e.target.value,
                ])
              }
            />
            I do not prioritize buying second-hand or thrifted items
          </label>
          <h3>Do you avoid single-use plastic items and opt for reusable alternatives? </h3>
          <label>
            <input
              type="checkbox"
              value="Always"
              checked={answers['consumption']?.includes('Always')}
              onChange={(e) =>
                handleAnswerChange('consumption', [
                  ...(answers['consumption'] || []),
                  e.target.value,
                ])
              }
            />
            Always
          </label>
          <label>
            <input
              type="checkbox"
              value="Sometimes"
              checked={answers['consumption']?.includes('Sometimes')}
              onChange={(e) =>
                handleAnswerChange('consumption', [
                  ...(answers['consumption'] || []),
                  e.target.value,
                ])
              }
            />
           Sometimes
          </label>
          <label>
            <input
              type="checkbox"
              value="Never"
              checked={answers['consumption']?.includes('Never')}
              onChange={(e) =>
                handleAnswerChange('consumption', [
                  ...(answers['consumption'] || []),
                  e.target.value,
                ])
              }
            />
           Never
          </label>
          <h3>Do you minimize the use of paper and opt for digital documents whenever possible?</h3>
          <label>
            <input
              type="checkbox"
              value="Always when it is possible"
              checked={answers['consumption']?.includes('Always when it is possible')}
              onChange={(e) =>
                handleAnswerChange('consumption', [
                  ...(answers['consumption'] || []),
                  e.target.value,
                ])
              }
            />
            Always when it is possible
          </label>
          <label>
            <input
              type="checkbox"
              value="Sometimes when it is possible"
              checked={answers['consumption']?.includes('Sometimes when it is possible')}
              onChange={(e) =>
                handleAnswerChange('consumption', [
                  ...(answers['consumption'] || []),
                  e.target.value,
                ])
              }
            />
            Sometimes when it is possible
          </label>
          <label>
            <input
              type="checkbox"
              value="Never"
              checked={answers['consumption']?.includes('Never')}
              onChange={(e) =>
                handleAnswerChange('consumption', [
                  ...(answers['consumption'] || []),
                  e.target.value,
                ])
              }
            />
            Never
          </label>
        </div>
<h1>Energy:</h1>
        <div>
          <h3>Do you use energy-efficient appliances and light bulbs in your home? </h3>
          <label>
            <input
              type="checkbox"
              value="Yes"
              checked={answers['energy']?.includes('Yes')}
              onChange={(e) =>
                handleAnswerChange('energy', [
                  ...(answers['energy'] || []),
                  e.target.value,
                ])
              }
            />
            Yes
          </label>
          <label>
            <input
              type="checkbox"
              value="No"
              checked={answers['energy']?.includes('No')}
              onChange={(e) =>
                handleAnswerChange('energy', [
                  ...(answers['energy'] || []),
                  e.target.value,
                ])
              }
            />
            No
          </label>
          <h3>Do you actively conserve energy by turning off lights and electronics when not in use? </h3>
          <label>
            <input
              type="checkbox"
              value="Yes"
              checked={answers['energy']?.includes('Yes')}
              onChange={(e) =>
                handleAnswerChange('energy', [
                  ...(answers['energy'] || []),
                  e.target.value,
                ])
              }
            />
            Yes
          </label>
          <label>
            <input
              type="checkbox"
              value="No"
              checked={answers['energy']?.includes('No')}
              onChange={(e) =>
                handleAnswerChange('energy', [
                  ...(answers['energy'] || []),
                  e.target.value,
                ])
              }
            />
            No
          </label>
          <h3>Do you utilize renewable energy sources such as solar panels or wind turbines?</h3>
          <label>
            <input
              type="checkbox"
              value="Yes"
              checked={answers['energy']?.includes('Yes')}
              onChange={(e) =>
                handleAnswerChange('energy', [
                  ...(answers['energy'] || []),
                  e.target.value,
                ])
              }
            />
            Yes
          </label>
          <label>
            <input
              type="checkbox"
              value="No"
              checked={answers['energy']?.includes('No')}
              onChange={(e) =>
                handleAnswerChange('energy', [
                  ...(answers['energy'] || []),
                  e.target.value,
                ])
              }
            />
            No
          </label>
          </div>
          <h1>Waste Management:</h1>
          <div>
<h3>Do you separate recyclable materials and dispose of them properly?</h3>
<label>
            <input
              type="checkbox"
              value="Yes"
              checked={answers['energy']?.includes('Yes')}
              onChange={(e) =>
                handleAnswerChange('energy', [
                  ...(answers['energy'] || []),
                  e.target.value,
                ])
              }
            />
           Yes
          </label>
          <label>
            <input
              type="checkbox"
              value="No"
              checked={answers['energy']?.includes('No')}
              onChange={(e) =>
                handleAnswerChange('energy', [
                  ...(answers['energy'] || []),
                  e.target.value,
                ])
              }
            />
           No
          </label>
          <h3>Do you actively reduce packaging waste by opting for products with minimal packaging? </h3>
          <label>
            <input
              type="checkbox"
              value="Yes"
              checked={answers['energy']?.includes('Yes')}
              onChange={(e) =>
                handleAnswerChange('energy', [
                  ...(answers['energy'] || []),
                  e.target.value,
                ])
              }
            />
           Yes
          </label>
          <label>
            <input
              type="checkbox"
              value="No"
              checked={answers['energy']?.includes('No')}
              onChange={(e) =>
                handleAnswerChange('energy', [
                  ...(answers['energy'] || []),
                  e.target.value,
                ])
              }
            />
           No
          </label>
          <h3>Do you avoid disposable items (e.g., coffee cups, plastic cutlery) and use reusable alternatives?</h3>
          <label>
            <input
              type="checkbox"
              value="Yes"
              checked={answers['energy']?.includes('Yes')}
              onChange={(e) =>
                handleAnswerChange('energy', [
                  ...(answers['energy'] || []),
                  e.target.value,
                ])
              }
            />
           Yes
          </label>
          <label>
            <input
              type="checkbox"
              value="No"
              checked={answers['energy']?.includes('No')}
              onChange={(e) =>
                handleAnswerChange('energy', [
                  ...(answers['energy'] || []),
                  e.target.value,
                ])
              }
            />
           No
          </label>

          </div>
          <button type="submit" onClick={handleSubmit}>
        Submit
      </button>

      {/* Display the calculated score */}
      <p>Score: {score}</p>
      </form>
    </div>
  );
};

export default Questions;