import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Form } from 'react-bootstrap';
import { login } from '../../utils/jwt';
import Button from '../Atoms/Button';
import store from '../../reducer/store';
import styled from 'styled-components';

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
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

const LoginPage = () => {
    const [loginDetails, setLoginDetails] = useState({ username: '', password: '' });
    const [loginError, setLoginError] = useState(false);

    const history = useHistory();

    const handleChange = (element) => {
        const { name, value } = element;
        const currentDetails = loginDetails;
        currentDetails[name] = value;
        setLoginDetails(currentDetails);
    };

    const handleClick = () => {
        login(loginDetails.username, loginDetails.password)
            .then(response => {
                    if (response.login === 'SUCCESS') {
                        const { refresh, access } = response.tokens;
                        localStorage.setItem('access', access);
                        localStorage.setItem('refresh', refresh);
                        localStorage.setItem('loggedIn', 'true');
                        store.dispatch({ type: 'LOGIN', payload: 'SUCCESS' });
                        history.push('/');
                    }
                },
            )
            .catch(() => {
                setLoginError(true);
            });
    };

    return (
        <StyledWrapper>
            {loginError && <ErrorMessage>Wrong username or password.</ErrorMessage>}

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
            </Form>
            <Button color="green" action={handleClick} text="Login">
                Login
            </Button>
        </StyledWrapper>
    );
};

export default LoginPage;