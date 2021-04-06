import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Form, Button } from 'react-bootstrap';
import { login } from '../utils/jwt';
import styled from 'styled-components';

const LoginDiv = styled.div`
    max-width: 400px; 
    border: 1px solid black;
    border-radius: 5px;
    padding: 10px;
    margin: 50px auto;    
`;

const ErrorMessage = styled.p`
    width: 100%;
    text-align: center;
    color: red;
    font-size: 10px;
`;

const LoginPage = () => {
    const [loginDetails, setLoginDetails] = useState({ username: '', password: '' });
    const [loginError, setLoginError] = useState(false);


    const handleChange = (element) => {
        const { name, value } = element;
        const currentDetails = loginDetails;
        currentDetails[name] = value;
        setLoginDetails(currentDetails);
    };

    const handleClick = () => {
        login(loginDetails.username, loginDetails.password).catch(error => {
            setLoginError(true);
        });
    };

    return (
        <LoginDiv>
            {loginError && <ErrorMessage>Wrong username or password.</ErrorMessage>
            }
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="username"
                                  onChange={(input) => handleChange(input.target)}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password"
                                  onChange={(input) => handleChange(input.target)}/>
                </Form.Group>
                <Form.Group className="text-center">
                    <Button variant="primary" type="button" className="mt-3" onClick={handleClick}>
                        Login
                    </Button>
                </Form.Group>
            </Form>
        </LoginDiv>
    );
};

export default LoginPage;