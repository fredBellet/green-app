import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Header from '../../components/headers';


const Questions = () => {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const QUESTION_ID = ["transportation", "food", "energy", "consumption", "waste management"];
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const username = localStorage.getItem('username');
      if (username) {
        setIsAuthenticated(true);
      } else {
        router.push('/login');
      }
    }
  }, [router]);
  
  
const handleAnswerChange = (questionId, selectedOptions) => {
  setAnswers((prevAnswers) => {
    const updatedAnswers = { ...prevAnswers };
    if (selectedOptions.length === 0) {
      delete updatedAnswers[questionId];
    } else {
      updatedAnswers[questionId] = selectedOptions;
    }
    return updatedAnswers;
  });
};
  
const handleSubmit = async (e) => {
  e.preventDefault();

  // Calculate the score based on the answers
  let calculatedScore = 0;

  // Loop through each question ID
  QUESTION_ID.forEach((id) => {
    const selectedOptions = answers[id.toLowerCase()];

    // Check if selectedOptions is defined and an array
    // Check if selectedOptions is defined and an array
    if (selectedOptions && Array.isArray(selectedOptions)) {
      // Loop through each selected option and calculate the score for the current question
      selectedOptions.forEach((selectedOption) => {
        // Add conditions for each possible option and update the score accordingly
        if (id.toLowerCase() === 'transportation') {
          if (selectedOption === 'Use public transportation') {
            calculatedScore += 5;
          } else if (selectedOption === 'Walk') {
            calculatedScore += 10;
          } else if (selectedOption === 'Bike') {
            calculatedScore += 7;
          } else if (selectedOption === 'Car') {
            calculatedScore -= 7;
          } else if (selectedOption === 'Carpool') {
            calculatedScore += 4;
          } else if (selectedOption === 'Carsharing services') {
            calculatedScore += 4;
          } else if (selectedOption === 'Own an electric vehicle') {
            calculatedScore += 6;
          } else if (selectedOption === 'Own an hybrid vehicle') {
            calculatedScore += 5;
          } else if (selectedOption === 'Own an gasoline vehicle') {
            calculatedScore -= 5;
          }
        } else if (id.toLowerCase() === 'food') {
          if (selectedOption === 'Consume locally sourced foods') {
            calculatedScore += 5;
          } else if (selectedOption === 'Consume organic foods') {
            calculatedScore += 5;
          } else if (selectedOption === 'Consume locally sourced and organic foods') {
            calculatedScore += 10;
          } else if (selectedOption === 'Avoid excessive food waste') {
            calculatedScore += 4;
          } else if (selectedOption === 'Practice composting') {
            calculatedScore += 5;
          } else if (selectedOption === 'Avoid excessive food waste and practice composting') {
            calculatedScore += 7;
          } else if (selectedOption === 'Follow a plant-based or vegetarian diet') {
            calculatedScore += 5;
          } else if (selectedOption === 'I do not have a particular diet') {
            calculatedScore -= 2;
          }
        } else if (id.toLowerCase() === 'consumption') {
          if (selectedOption === 'Prioritize buying second-hand or thrifted items') {
            calculatedScore += 7;
          } else if (selectedOption === 'I do not prioritize buying second-hand or thrifted items') {
            calculatedScore -= 5;
          }  else if (selectedOption === 'Always') {
            calculatedScore += 5;
          } else if (selectedOption === 'Sometimes') {
            calculatedScore += 2;
          } else if (selectedOption === 'Rarely') {
            calculatedScore -= 2;
          } else if (selectedOption === 'Always when it is possible') {
            calculatedScore += 5;
          } else if (selectedOption === 'Sometimes when it is possible') {
            calculatedScore += 3;
          } else if (selectedOption === 'Never') {
            calculatedScore -= 3;
          }
        } else if (id.toLowerCase() === 'energy') {
          if (selectedOption === 'Yes') {
            calculatedScore += 5;
          }else if (selectedOption === 'No') {
              calculatedScore -= 2;
            }
            else if (selectedOption === 'Always') {
              calculatedScore += 5;
            }
            else if (selectedOption === 'Mostly') {
              calculatedScore += 2;
            }
            else if (selectedOption === 'Occasionaly') {
              calculatedScore -= 2;
            }
          }else if (id.toLowerCase() === 'Waste management') {
            if (selectedOption === 'Always') {
              calculatedScore += 5;
            } else if (selectedOption === 'Irregularly'){
              calculatedScore += 2;
            }
            else if (selectedOption === 'Not at all'){
              calculatedScore -= 5;
            }
            else if (selectedOption === 'Yes'){
              calculatedScore += 5;
            } else if (selectedOption === 'No'){
              calculatedScore -= 5;
            }
          }


        


        
        // Add conditions for other question IDs as needed
      });
    }
  });

  console.log('calculatedScore: ', calculatedScore);
  // Set the calculated score
  setScore(calculatedScore);

  try {
    // Send the score to the backend
    await axios.post('http://localhost:3001/scores', {
      score: calculatedScore,
      username: localStorage.getItem('username'),
    });
    router.push('/results');
    // Clear the answers
    setAnswers({});
   
  } catch (error) {
    console.error('Failed to submit score:', error);
  }
};

  
  const handleLogout = () => {
    // Clear the username from local storage
    localStorage.removeItem('username');
    router.push('/login');
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
       <Header handleLogout={handleLogout} /> {}
      {!isAuthenticated ? null : (
        <>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
            onClick={handleLogout}
          >
            Log Out
          </button>
          <h1 className="text-3xl font-bold text-center mb-8">Transportation</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <h3 className="font-bold mb-4">Do you primarily use public transportation, walk, or bike instead of driving a car?</h3>
              <label className="flex items-center">
              <input
                type="checkbox"
                value="Use public transportation"
                checked={answers['transportation']?.includes('Use public transportation')}
                onChange={(e) => {
                  const selectedOptions = answers['transportation'] || [];
                  if (e.target.checked) {
                    selectedOptions.push(e.target.value);
                  } else {
                    const index = selectedOptions.indexOf(e.target.value);
                    if (index !== -1) {
                      selectedOptions.splice(index, 1);
                    }
                  }
                  handleAnswerChange('transportation', selectedOptions);
                }}
              />
                Use public transportation
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Walk"
                  checked={answers['transportation']?.includes('Walk')}
                  onChange={(e) => {
                    const selectedOptions = answers['transportation'] || [];
                    if (e.target.checked) {
                      selectedOptions.push(e.target.value);
                    } else {
                      const index = selectedOptions.indexOf(e.target.value);
                      if (index !== -1) {
                        selectedOptions.splice(index, 1);
                      }
                    }
                    handleAnswerChange('transportation', selectedOptions);
                  }}
                />
                Walk
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Bike"
                  checked={answers['transportation']?.includes('Bike')}
                  onChange={(e) => {
                    const selectedOptions = answers['transportation'] || [];
                    if (e.target.checked) {
                      selectedOptions.push(e.target.value);
                    } else {
                      const index = selectedOptions.indexOf(e.target.value);
                      if (index !== -1) {
                        selectedOptions.splice(index, 1);
                      }
                    }
                    handleAnswerChange('transportation', selectedOptions);
                  }}
                />
                Bike
              </label>
              <label className="flex items-center mb-4">
                <input
                  type="checkbox"
                  value="Car"
                  checked={answers['transportation']?.includes('Car')}
                  onChange={(e) => {
                    const selectedOptions = answers['transportation'] || [];
                    if (e.target.checked) {
                      selectedOptions.push(e.target.value);
                    } else {
                      const index = selectedOptions.indexOf(e.target.value);
                      if (index !== -1) {
                        selectedOptions.splice(index, 1);
                      }
                    }
                    handleAnswerChange('transportation', selectedOptions);
                  }}
                />
                Car
              </label>
              <h3 className="font-bold mb-4">Do you carpool or use ride-sharing services when possible?</h3>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Carpool"
                  checked={answers['transportation']?.includes('Carpool')}
                  onChange={(e) => {
                    const selectedOptions = answers['transportation'] || [];
                    if (e.target.checked) {
                      selectedOptions.push(e.target.value);
                    } else {
                      const index = selectedOptions.indexOf(e.target.value);
                      if (index !== -1) {
                        selectedOptions.splice(index, 1);
                      }
                    }
                    handleAnswerChange('transportation', selectedOptions);
                  }}
                />
                Carpool
              </label>
              <label className="flex items-center mb-4">
                <input
                  type="checkbox"
                  value="Carsharing services"
                  checked={answers['transportation']?.includes('Carsharing services')}
                  onChange={(e) => {
                    const selectedOptions = answers['transportation'] || [];
                    if (e.target.checked) {
                      selectedOptions.push(e.target.value);
                    } else {
                      const index = selectedOptions.indexOf(e.target.value);
                      if (index !== -1) {
                        selectedOptions.splice(index, 1);
                      }
                    }
                    handleAnswerChange('transportation', selectedOptions);
                  }}
                />
                Carsharing services
              </label>
              <h3 className="font-bold mb-4">Do you own an electric, hybrid, or gasoline vehicle?</h3>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Own an electric vehicle"
                  checked={answers['transportation']?.includes('Own an electric vehicle')}
                  onChange={(e) => {
                    const selectedOptions = answers['transportation'] || [];
                    if (e.target.checked) {
                      selectedOptions.push(e.target.value);
                    } else {
                      const index = selectedOptions.indexOf(e.target.value);
                      if (index !== -1) {
                        selectedOptions.splice(index, 1);
                      }
                    }
                    handleAnswerChange('transportation', selectedOptions);
                  }}
                />
                Own an electric vehicle
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Own an hybrid vehicle"
                  checked={answers['transportation']?.includes('Own an hybrid vehicle')}
                  onChange={(e) => {
                    const selectedOptions = answers['transportation'] || [];
                    if (e.target.checked) {
                      selectedOptions.push(e.target.value);
                    } else {
                      const index = selectedOptions.indexOf(e.target.value);
                      if (index !== -1) {
                        selectedOptions.splice(index, 1);
                      }
                    }
                    handleAnswerChange('transportation', selectedOptions);
                  }}
                />
                Own an hybrid vehicle
              </label>
              <label className="flex items-center mb-4">
                <input
                  type="checkbox"
                  value="Own an gasoline vehicle"
                  checked={answers['transportation']?.includes('Own an gasoline vehicle')}
                  onChange={(e) => {
                    const selectedOptions = answers['transportation'] || [];
                    if (e.target.checked) {
                      selectedOptions.push(e.target.value);
                    } else {
                      const index = selectedOptions.indexOf(e.target.value);
                      if (index !== -1) {
                        selectedOptions.splice(index, 1);
                      }
                    }
                    handleAnswerChange('transportation', selectedOptions);
                  }}
                />
                Own an gasoline vehicle
              </label>
            </div>
            <h1 className="text-3xl font-bold text-center mb-8">Food</h1>
            <div>
              <h3 className="font-bold mb-4">Do you regularly consume locally sourced and organic foods?</h3>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Consume locally sourced foods"
                  checked={answers['food']?.includes('Consume locally sourced foods')}
                  onChange={(e) => {
                    const selectedOptions = answers['food'] || [];
                    if (e.target.checked) {
                      selectedOptions.push(e.target.value);
                    } else {
                      const index = selectedOptions.indexOf(e.target.value);
                      if (index !== -1) {
                        selectedOptions.splice(index, 1);
                      }
                    }
                    handleAnswerChange('food', selectedOptions);
                  }}
                />
                Consume locally sourced foods
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Consume organic foods"
                  checked={answers['food']?.includes('Consume organic foods')}
                  onChange={(e) => {
                    const selectedOptions = answers['food'] || [];
                    if (e.target.checked) {
                      selectedOptions.push(e.target.value);
                    } else {
                      const index = selectedOptions.indexOf(e.target.value);
                      if (index !== -1) {
                        selectedOptions.splice(index, 1);
                      }
                    }
                    handleAnswerChange('food', selectedOptions);
                  }}
                />
                Consume organic foods
              </label>
              <label className="flex items-center mb-4">
                <input
                  type="checkbox"
                  value="Consume locally sourced and organic foods"
                  checked={answers['food']?.includes('Consume locally sourced and organic foods')}
                  onChange={(e) => {
                    const selectedOptions = answers['food'] || [];
                    if (e.target.checked) {
                      selectedOptions.push(e.target.value);
                    } else {
                      const index = selectedOptions.indexOf(e.target.value);
                      if (index !== -1) {
                        selectedOptions.splice(index, 1);
                      }
                    }
                    handleAnswerChange('food', selectedOptions);
                  }}
                />
                Consume locally sourced and organic foods
              </label>
              <h3 className="font-bold mb-4">Do you avoid excessive food waste and practice composting?</h3>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Avoid excessive food waste"
                  checked={answers['food']?.includes('Avoid excessive food waste')}
                  onChange={(e) => {
                    const selectedOptions = answers['food'] || [];
                    if (e.target.checked) {
                      selectedOptions.push(e.target.value);
                    } else {
                      const index = selectedOptions.indexOf(e.target.value);
                      if (index !== -1) {
                        selectedOptions.splice(index, 1);
                      }
                    }
                    handleAnswerChange('food', selectedOptions);
                  }}
                />
                Avoid excessive food waste
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Practice composting"
                  checked={answers['food']?.includes('Practice composting')}
                  onChange={(e) => {
                    const selectedOptions = answers['food'] || [];
                    if (e.target.checked) {
                      selectedOptions.push(e.target.value);
                    } else {
                      const index = selectedOptions.indexOf(e.target.value);
                      if (index !== -1) {
                        selectedOptions.splice(index, 1);
                      }
                    }
                    handleAnswerChange('food', selectedOptions);
                  }}
                />
                Practice composting
              </label>
              <label className="flex items-center mb-4">
                <input
                  type="checkbox"
                  value="Avoid excessive food waste and practice composting"
                  checked={answers['food']?.includes('Avoid excessive food waste and practice composting')}
                  onChange={(e) => {
                    const selectedOptions = answers['food'] || [];
                    if (e.target.checked) {
                      selectedOptions.push(e.target.value);
                    } else {
                      const index = selectedOptions.indexOf(e.target.value);
                      if (index !== -1) {
                        selectedOptions.splice(index, 1);
                      }
                    }
                    handleAnswerChange('food', selectedOptions);
                  }}
                />
                Avoid excessive food waste and practice composting
              </label>
              <h3 className="font-bold mb-4">Do you follow a plant-based or vegetarian diet?</h3>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Follow a plant-based or vegetarian diet"
                  checked={answers['food']?.includes('Follow a plant-based or vegetarian diet')}
                  onChange={(e) => {
                    const selectedOptions = answers['food'] || [];
                    if (e.target.checked) {
                      selectedOptions.push(e.target.value);
                    } else {
                      const index = selectedOptions.indexOf(e.target.value);
                      if (index !== -1) {
                        selectedOptions.splice(index, 1);
                      }
                    }
                    handleAnswerChange('food', selectedOptions);
                  }}
                />
                Follow a plant-based or vegetarian diet
              </label>
              <label className="flex items-center mb-4">
                <input
                  type="checkbox"
                  value="I do not have a particuliary diet"
                  checked={answers['food']?.includes('I do not have a particuliary diet')}
                  onChange={(e) => {
                    const selectedOptions = answers['food'] || [];
                    if (e.target.checked) {
                      selectedOptions.push(e.target.value);
                    } else {
                      const index = selectedOptions.indexOf(e.target.value);
                      if (index !== -1) {
                        selectedOptions.splice(index, 1);
                      }
                    }
                    handleAnswerChange('food', selectedOptions);
                  }}
                />
                I do not have a particuliary diet
              </label>
            </div>
            <h1 className="text-3xl font-bold text-center mb-8">Consumption:</h1>
            <div>
              <h3 className="font-bold mb-4">Do you prioritize buying second-hand or thrifted items instead of new ones?</h3>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Prioritize buying second-hand or thrifted items"
                  checked={answers['consumption']?.includes('Prioritize buying second-hand or thrifted items')}
                  onChange={(e) => {
                    const selectedOptions = answers['consumption'] || [];
                    if (e.target.checked) {
                      selectedOptions.push(e.target.value);
                    } else {
                      const index = selectedOptions.indexOf(e.target.value);
                      if (index !== -1) {
                        selectedOptions.splice(index, 1);
                      }
                    }
                    handleAnswerChange('consumption', selectedOptions);
                  }}
                />
                Prioritize buying second-hand or thrifted items
              </label>
              <label className="flex items-center mb-4">
                <input
                  type="checkbox"
                  value="I do not prioritize buying second-hand or thrifted items"
                  checked={answers['consumption']?.includes('I do not prioritize buying second-hand or thrifted items')}
                  onChange={(e) => {
                    const selectedOptions = answers['consumption'] || [];
                    if (e.target.checked) {
                      selectedOptions.push(e.target.value);
                    } else {
                      const index = selectedOptions.indexOf(e.target.value);
                      if (index !== -1) {
                        selectedOptions.splice(index, 1);
                      }
                    }
                    handleAnswerChange('consumption', selectedOptions);
                  }}
                />
                I do not prioritize buying second-hand or thrifted items
              </label>
              <h3 className="font-bold mb-4">Do you avoid single-use plastic items and opt for reusable alternatives?</h3>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Always"
                  checked={answers['consumption']?.includes('Always')}
                  onChange={(e) => {
                    const selectedOptions = answers['consumption'] || [];
                    if (e.target.checked) {
                      selectedOptions.push(e.target.value);
                    } else {
                      const index = selectedOptions.indexOf(e.target.value);
                      if (index !== -1) {
                        selectedOptions.splice(index, 1);
                      }
                    }
                    handleAnswerChange('consumption', selectedOptions);
                  }}
                />
                Always
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Sometimes"
                  checked={answers['consumption']?.includes('Sometimes')}
                  onChange={(e) => {
                    const selectedOptions = answers['consumption'] || [];
                    if (e.target.checked) {
                      selectedOptions.push(e.target.value);
                    } else {
                      const index = selectedOptions.indexOf(e.target.value);
                      if (index !== -1) {
                        selectedOptions.splice(index, 1);
                      }
                    }
                    handleAnswerChange('consumption', selectedOptions);
                  }}
                />
                Sometimes
              </label>
              <label className="flex items-center mb-4">
                <input
                  type="checkbox"
                  value="Rarely"
                  checked={answers['consumption']?.includes('Rarely')}
                  onChange={(e) => {
                    const selectedOptions = answers['consumption'] || [];
                    if (e.target.checked) {
                      selectedOptions.push(e.target.value);
                    } else {
                      const index = selectedOptions.indexOf(e.target.value);
                      if (index !== -1) {
                        selectedOptions.splice(index, 1);
                      }
                    }
                    handleAnswerChange('consumption', selectedOptions);
                  }}
                />
                Rarely
              </label>
              <h3 className="font-bold mb-4">Do you minimize the use of paper and opt for digital documents whenever possible?</h3>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Always when it is possible"
                  checked={answers['consumption']?.includes('Always when it is possible')}
                  onChange={(e) => {
                    const selectedOptions = answers['consumption'] || [];
                    if (e.target.checked) {
                      selectedOptions.push(e.target.value);
                    } else {
                      const index = selectedOptions.indexOf(e.target.value);
                      if (index !== -1) {
                        selectedOptions.splice(index, 1);
                      }
                    }
                    handleAnswerChange('consumption', selectedOptions);
                  }}
                />
                Always when it is possible
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Sometimes when it is possible"
                  checked={answers['consumption']?.includes('Sometimes when it is possible')}
                  onChange={(e) => {
                    const selectedOptions = answers['consumption'] || [];
                    if (e.target.checked) {
                      selectedOptions.push(e.target.value);
                    } else {
                      const index = selectedOptions.indexOf(e.target.value);
                      if (index !== -1) {
                        selectedOptions.splice(index, 1);
                      }
                    }
                    handleAnswerChange('consumption', selectedOptions);
                  }}
                />
                Sometimes when it is possible
              </label>
              <label className="flex items-center mb-4">
                <input
                  type="checkbox"
                  value="Never"
                  checked={answers['consumption']?.includes('Never')}
                  onChange={(e) => {
                    const selectedOptions = answers['consumption'] || [];
                    if (e.target.checked) {
                      selectedOptions.push(e.target.value);
                    } else {
                      const index = selectedOptions.indexOf(e.target.value);
                      if (index !== -1) {
                        selectedOptions.splice(index, 1);
                      }
                    }
                    handleAnswerChange('consumption', selectedOptions);
                  }}
                />
                Never
              </label>
            </div>
            <h1 className="text-3xl font-bold text-center mb-8">Energy:</h1>
            <div>
              <h3 className="font-bold mb-4">Do you use energy-efficient appliances and light bulbs in your home?</h3>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Yes"
                  checked={answers['energy']?.includes('Yes')}
                  onChange={(e) => {
                    const selectedOptions = answers['energy'] || [];
                    if (e.target.checked) {
                      selectedOptions.push(e.target.value);
                    } else {
                      const index = selectedOptions.indexOf(e.target.value);
                      if (index !== -1) {
                        selectedOptions.splice(index, 1);
                      }
                    }
                    handleAnswerChange('energy', selectedOptions);
                  }}
                />
                Yes
              </label>
              <label className="flex items-center mb-4">
                <input
                  type="checkbox"
                  value="No, i don't"
                  checked={answers['energy']?.includes("No, i don't")}
                  onChange={(e) => {
                    const selectedOptions = answers['energy'] || [];
                    if (e.target.checked) {
                      selectedOptions.push(e.target.value);
                    } else {
                      const index = selectedOptions.indexOf(e.target.value);
                      if (index !== -1) {
                        selectedOptions.splice(index, 1);
                      }
                    }
                    handleAnswerChange('energy', selectedOptions);
                  }}
                />
                No, i don't
              </label>
              <h3 className="font-bold mb-4">Do you actively conserve energy by turning off lights and electronics when not in use?</h3>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Always"
                  checked={answers['energy']?.includes("Always")}
                  onChange={(e) => {
                    const selectedOptions = answers['energy'] || [];
                    if (e.target.checked) {
                      selectedOptions.push(e.target.value);
                    } else {
                      const index = selectedOptions.indexOf(e.target.value);
                      if (index !== -1) {
                        selectedOptions.splice(index, 1);
                      }
                    }
                    handleAnswerChange('energy', selectedOptions);
                  }}
                />
                Always
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Mostly"
                  checked={answers['energy']?.includes("Mostly")}
                  onChange={(e) => {
                    const selectedOptions = answers['energy'] || [];
                    if (e.target.checked) {
                      selectedOptions.push(e.target.value);
                    } else {
                      const index = selectedOptions.indexOf(e.target.value);
                      if (index !== -1) {
                        selectedOptions.splice(index, 1);
                      }
                    }
                    handleAnswerChange('energy', selectedOptions);
                  }}
                />
                Mostly
              </label>
              <label className="flex items-center mb-4">
                <input
                  type="checkbox"
                  value="Occasionally"
                  checked={answers['energy']?.includes("Occasionally")}
                  onChange={(e) => {
                    const selectedOptions = answers['energy'] || [];
                    if (e.target.checked) {
                      selectedOptions.push(e.target.value);
                    } else {
                      const index = selectedOptions.indexOf(e.target.value);
                      if (index !== -1) {
                        selectedOptions.splice(index, 1);
                      }
                    }
                    handleAnswerChange('energy', selectedOptions);
                  }}
                />
                Occasionally
                </label>
              <h3 className="font-bold mb-4">Do you utilize renewable energy sources such as solar panels or wind turbines?</h3>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Surely"
                  checked={answers['energy']?.includes("Surely")}
                  onChange={(e) => {
                    const selectedOptions = answers['energy'] || [];
                    if (e.target.checked) {
                      selectedOptions.push(e.target.value);
                    } else {
                      const index = selectedOptions.indexOf(e.target.value);
                      if (index !== -1) {
                        selectedOptions.splice(index, 1);
                      }
                    }
                    handleAnswerChange('energy', selectedOptions);
                  }}
                />
                Surely
              </label>
              <label className="flex items-center mb-4">
                <input
                  type="checkbox"
                  value="No"
                  checked={answers['energy']?.includes("No")}
                  onChange={(e) => {
                    const selectedOptions = answers['energy'] || [];
                    if (e.target.checked) {
                      selectedOptions.push(e.target.value);
                    } else {
                      const index = selectedOptions.indexOf(e.target.value);
                      if (index !== -1) {
                        selectedOptions.splice(index, 1);
                      }
                    }
                    handleAnswerChange('energy', selectedOptions);
                  }}
                />
                No
              </label>
            </div>
            <h1 className="text-3xl font-bold text-center mb-8">Waste Management:</h1>
            <div>
              <h3 className="font-bold mb-4">Do you actively recycle paper, plastic, glass, and metal?</h3>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Always"
                  checked={answers['waste management']?.includes("Always")}
                  onChange={(e) => {
                    const selectedOptions = answers['waste management'] || [];
                    if (e.target.checked) {
                      selectedOptions.push(e.target.value);
                    } else {
                      const index = selectedOptions.indexOf(e.target.value);
                      if (index !== -1) {
                        selectedOptions.splice(index, 1);
                      }
                    }
                    handleAnswerChange('waste management', selectedOptions);
                  }}
                />
                Always
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Irregularly"
                  checked={answers['waste management']?.includes("Irregularly")}
                  onChange={(e) => {
                    const selectedOptions = answers['waste management'] || [];
                    if (e.target.checked) {
                      selectedOptions.push(e.target.value);
                    } else {
                      const index = selectedOptions.indexOf(e.target.value);
                      if (index !== -1) {
                        selectedOptions.splice(index, 1);
                      }
                    }
                    handleAnswerChange('waste management', selectedOptions);
                  }}
                />
                Irregularly
              </label>
              <label className="flex items-center mb-4">
                <input
                  type="checkbox"
                  value="Not at all"
                  checked={answers['waste management']?.includes("Not at all")}
                  onChange={(e) => {
                    const selectedOptions = answers['waste management'] || [];
                    if (e.target.checked) {
                      selectedOptions.push(e.target.value);
                    } else {
                      const index = selectedOptions.indexOf(e.target.value);
                      if (index !== -1) {
                        selectedOptions.splice(index, 1);
                      }
                    }
                    handleAnswerChange('waste management', selectedOptions);
                  }}
                />
                Not at all
              </label>
              <h3 className="font-bold mb-4">Do you minimize waste by reusing or repurposing items?</h3>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Yes"
                  checked={answers['waste management']?.includes("Yes")}
                  onChange={(e) => {
                    const selectedOptions = answers['waste management'] || [];
                    if (e.target.checked) {
                      selectedOptions.push(e.target.value);
                    } else {
                      const index = selectedOptions.indexOf(e.target.value);
                      if (index !== -1) {
                        selectedOptions.splice(index, 1);
                      }
                    }
                    handleAnswerChange('waste management', selectedOptions);
                  }}
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="No"
                  checked={answers['waste management']?.includes("No")}
                  onChange={(e) => {
                    const selectedOptions = answers['waste management'] || [];
                    if (e.target.checked) {
                      selectedOptions.push(e.target.value);
                    } else {
                      const index = selectedOptions.indexOf(e.target.value);
                      if (index !== -1) {
                        selectedOptions.splice(index, 1);
                      }
                    }
                    handleAnswerChange('waste management', selectedOptions);
                  }}
                />
                No
              </label>
            </div>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </form>
        </>
      )}
    </div>
    
  );
};

export default Questions;
