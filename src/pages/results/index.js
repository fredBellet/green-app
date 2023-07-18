import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Results = () => {
  const [scores, setScores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get('/scores'); // Update the API endpoint to match your backend route for fetching scores
        setScores(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch scores:', error);
        setIsLoading(false);
      }
    };

    fetchScores();
  }, []);

  return (
    <div>
      <h1>Results</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
          {scores.map((score) => (
  <tr key={score._id}>
    <td>{score.userId.username}</td>
    <td>{score.score}</td>
  </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Results;
