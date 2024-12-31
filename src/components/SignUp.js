import React from 'react';
import styled from 'styled-components';
import googleLogo from '../assets/Logo.png';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';


const FormContainer = styled.div`
  width: 80%;
  max-width: 400px;
`;

const Title = styled.h2`
  margin-bottom: 50px;
  font-family: Inter;
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
  font-size: 30px;
  margin-bottom: 20px;
  color: #000000;
  font-family: Inter;
  margin-bottom: 40px;
`;

const Input = styled.input`
  margin-bottom: 15px;
  margin-top: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-family: Inter;
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
  font-family: Inter;
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
  font-family: Inter;
`;

const GoogleIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const Para = styled.p`
  color: #7E7E7E;
  font-size: 15px;
  font-family: Inter;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const SignUp = () => {

  const signup = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            'Authorization': `Bearer ${response.access_token}`,
          },
        });
        console.log(res.data);
        // Handle successful signup here (e.g., save user data, navigate to another page, etc.)
      } catch (err) {
        console.error(err);
      }
    },
    onFailure: (error) => {
      console.error('Signup failed:', error);
    },
  });

  return (
    <FormContainer>
      <Heading>FarmFusion</Heading>
      <Title>Sign up to FarmFusion</Title>
      <Form id="signUpForm">
        <Input type="text" placeholder="Enter your name" id="signUpName" />
        <Input type="email" placeholder="Enter your email" id="signUpEmail"/>
        <Input type="password" placeholder="Enter your password" id="signUpPassword"/>
        <Input type="password" placeholder="Confirm your password" id="signUpCPassword"/>
        <center><Button>Sign Up</Button></center>
      </Form>
      <Para>or</Para>
      <center>
        <GoogleButton id="signUpGoogleButton" onClick={() => signup()}>
          <GoogleIcon src={googleLogo} />
          Sign up with Google
        </GoogleButton>
      </center>
    </FormContainer>
  );
};

export default SignUp;
