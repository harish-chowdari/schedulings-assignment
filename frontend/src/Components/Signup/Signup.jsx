import React, { useState } from 'react';
import axios from '../../axios';
import styles from './Signup.module.css'; // Import the CSS module
import { Link } from 'react-router-dom';

const Signup = () => {
  const [signup, setSignup] = useState({ name: '', email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState(''); // State to store error message

  const handleChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error message

    try {
      const res = await axios.post('/signup', { ...signup });

      if (res.data.EnterAllDetails) {
        setErrorMessage(res.data.EnterAllDetails);
      } else if (res.data.AlreadyExist) {
        setErrorMessage(res.data.AlreadyExist);
      } else {
        console.log(res.data);
        // Handle successful signup
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('An error occurred while signing up. Please try again.'); // Generic error message
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
      
        <h2>Signup</h2>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>} 

        <div>
          <input
            placeholder="Enter Your Name"
            type="text"
            name="name"
            onChange={handleChange}
            value={signup.name}
            className={styles.input}
          />
        </div>
        <div>
          <input
            placeholder="Enter Your Email"
            type="email"
            name="email"
            onChange={handleChange}
            value={signup.email}
            className={styles.input}
          />
        </div>
        <div>
          <input
            placeholder="Enter Your Password"
            type="password"
            name="password"
            onChange={handleChange}
            value={signup.password}
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>
          Submit
        </button>
        <p className={styles.text}>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
