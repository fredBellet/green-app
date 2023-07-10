import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const QuestionsProtected = () => {
  const router = useRouter();

  useEffect(() => {
    // Implement authentication logic
    const checkAuthentication = async () => {
      try {
        // Send a request to the backend to check the user's authentication status
        const response = await axios.get('http://localhost:3001/check-auth');

        // If the user is not authenticated, redirect to the login page
        if (!response.data.authenticated) {
          router.replace('/login');
        }
      } catch (error) {
        console.error('Authentication error:', error);
        // Handle the error, such as showing an error message
      }
    };

    checkAuthentication();
  }, [router]);

  return <div>Questions Page</div>;
};

export default QuestionsProtected;
