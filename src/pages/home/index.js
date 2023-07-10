import React from 'react';
import Link from 'next/link';
import styles from './home.module.css';



const index = () => {
  return (
    <div>
      <h1>Welcome to the Greenapp</h1>
      <Link href="/register">
        Register
      </Link>
      <br />
      <Link href="/login">
        Login
      </Link>
      <br />
      <Link href="/questions-protected">Questions</Link>
    </div>
  );
};

export default index;
