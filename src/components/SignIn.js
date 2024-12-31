import React, { useState } from 'react';
import styled from 'styled-components';
import googleLogo from '../assets/Logo.png';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FormContainer = styled.div`
  width: 80%;
  max-width: 400px;
`;

const Title = styled.h2`
  margin-bottom: 60px;
  // font-family: Inter;
  display: flex;
  justify-content: center;
  color: #7848F4;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const Heading = styled.h2`
  display: flex;
  justify-content: center;
  font-size: 70px;
  margin-bottom: 20px;
  color: #000000;
  // font-family: Inter;
  margin-bottom: 40px;
`;

const Input = styled.input`
  margin-bottom: 15px;
  margin-top: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  // font-family: Inter;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #7848F4;
  color: white;
  width: 220px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 25px;
  margin-bottom: 15px;
  // font-family: Inter;
`;

const GoogleButton = styled.button`
  padding: 10px;
  margin-top: 20px;
  background-color: white;
  width: 400px;
  color: black;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  // font-family: Inter;
`;

const GoogleIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const Para = styled.p`
  color: #7E7E7E;
  font-size: 15px;
  // font-family: Inter;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const ErrorMessage = styled.p`
  color: #ff0000;
  text-align: center;
  margin-top: 10px;
`;

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('api/auth/signin', { username, email, password });
      if (response.data.success) {
        navigate('/');
      } else {
        setError(response.data.message || "An error occured during signup. :/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occured during signup. ");
    }
  };

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            'Authorization': `Bearer ${response.access_token}`,
          },
        });
        console.log(res.data);
        // Handle successful login here (e.g., save user data, navigate to another page, etc.)
        navigate('/');
      } catch (err) {
        console.error(err);
        setError('Failed to sign in with Google.');
      }
    },
    onFailure: (error) => {
      console.error('Signup failed:', error);
      setError('Failed to sign up with Google');
    },
  });
  return (
    <FormContainer>
      <Heading>FarmFusion</Heading>
      <Title>Sign in to FarmFusion</Title>
      <Form onSubmit={handleSubmit} id="signUpForm">
        <Input 
          type="text" 
          placeholder="Enter your username" 
          id ="signUpUsername"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoFocus
        />
        <Input 
          type="email" 
          placeholder="Enter your email" 
          id ="signUpEmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input 
          type="password" 
          placeholder="Enter your password" 
          id="signInPassword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <center><Button type='submit'>Sign In</Button></center>
      </Form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Para>or</Para>
      <center>
        <GoogleButton id="signInGoogleButton" onClick={() => login()}>
            <GoogleIcon src={googleLogo} />
            Sign in with Google
        </GoogleButton>
      </center>
    </FormContainer>
  );
};

export default SignIn;
