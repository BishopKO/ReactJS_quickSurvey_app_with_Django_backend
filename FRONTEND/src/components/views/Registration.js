import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import email_validator from 'email-validator';
import styled from 'styled-components';
import Button from '../Atoms/Button';
import { useHistory } from 'react-router';
import { user_register } from '../../utils/jwt';

const StyledWrapper = styled.div`
    width: 100%;
    max-width: 400px; 
    border: 1px solid black;
    border-radius: 5px;
    padding: 10px;
    margin: 50px auto;
    button{
      width: 100%;
    }    
`;

const ErrorMessage = styled.p`
    width: 100%;
    background-color: ${({ theme }) => theme.red};
    border-radius: 5px;    
    text-align: center;
    color: ${({ theme }) => theme.lightRed};
    font-size: 14px;
    font-weight: bold;    
`;
const Registration = () => {

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
            setRegistrationError('Incorrect email address.');
        } else if (password1.length < 6) {
            setRegistrationError('Password too short.');
        } else if (password1 !== password2) {
            setRegistrationError('Password does not match.');
        } else {
            setRegistrationError(false);
            user_register(username, password1).then(response => {
                console.log(response);
                if (response.REGISTRATION === 'SUCCESS') {
                    history.push('/login');
                } else if (response.ERROR === 'INTEGRITY_ERROR') {
                    setRegistrationError('User already registered.');
                }
            }).catch(error => console.log(error));
        }
    };

    return (
        <StyledWrapper>
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

                </Form.Group>
            </Form>
            <Button color="green" text="Sign Up" action={handleClick}>
                Sign Up
            </Button>
        </StyledWrapper>
    );
};

export default Registration;