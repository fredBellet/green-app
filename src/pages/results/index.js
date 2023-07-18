import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Results = () => {
  const [scores, setScores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get('http://localhost:3001/scores');
        console.log(response,localStorage.getItem('username'));
        const sortedScores = response.data.sort((a, b) => {
          // Sort the scores in descending order based on the date
          return new Date(b.date) - new Date(a.date);});
        const matchingScores = sortedScores.filter((score) => score?.userId?.username === localStorage.getItem('username'));

        setScores(matchingScores);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch score:', error);
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
      ) : scores.length>0 ? (
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
  {scores.map((score) => (
    <tr key={score._id}>
      <td>{score.userId.username}</td>
      <td>{score.score}</td>
      <td>{score?.date}</td>
    </tr>
  ))}
</tbody>

        </table>
      ) : (
        <p>No score found.</p>
      )}
    </div>
  );
};

export default Results;
