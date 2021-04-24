import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import email_validator from 'email-validator';
import { useHistory } from 'react-router';

import jscookie from 'js-cookie';
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

const Registration = () => {
    axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
    axios.defaults.xsrfCookieName = 'csrftoken';

    let history = useHistory();

    const [registrationDetails, setRegistrationDetails] = useState({ username: '', password1: '', password2: '' });
    const [registrationError, setRegistrationError] = useState(false);

    const handleChange = (element) => {
        const { name, value } = element;
        const currentDetails = registrationDetails;
        currentDetails[name] = value;
        setRegistrationDetails(currentDetails);
    };

    const handleClick = () => {
        const { username, password1, password2 } = registrationDetails;

        if (!email_validator.validate(username)) {
            setRegistrationError('Bad email address.');
        } else if (password1.length < 6) {
            setRegistrationError('Password too short.');

        } else if (password1 !== password2) {
            setRegistrationError('Password does not match.');
        } else {
            setRegistrationError(false);
            let config = {
                headers: { 'X-CSRFToken': jscookie.get('csrftoken') },
            };
            axios.post('http://127.0.0.1:8000/user_register', {
                    username: username,
                    password: password1,
                }, config,
            ).then(response => {
                if (response.data.registration === 'SUCCESS') {
                    history.push('/login');
                } else {
                    console.log('FAIL');
                }
            });
        }

    };

    return (
        <LoginDiv>
            {registrationError && <ErrorMessage>{registrationError}</ErrorMessage>
            }
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="username"
                                  onChange={(input) => handleChange(input.target)}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword" className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password1"
                                  onChange={(input) => handleChange(input.target)}/>
                </Form.Group>
                <Form.Group controlId="formBasicPasswordRepeat" className="mt-3">
                    <Form.Label>*Repeat password</Form.Label>
                    <Form.Control type="password" placeholder="Repeat password" name="password2"
                                  onChange={(input) => handleChange(input.target)}/>
                </Form.Group>
                <Form.Group className="text-center">
                    <Button variant="success" type="button" className="mt-3" onClick={handleClick}>
                        Sign Up
                    </Button>
                </Form.Group>
            </Form>
        </LoginDiv>
    );
};

export default Registration;