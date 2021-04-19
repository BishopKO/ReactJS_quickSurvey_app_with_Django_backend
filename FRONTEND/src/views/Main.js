import React, { useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { sendQueryUsingTokens } from '../utils/jwt';


// Get suerveys using API, if fail return to login
const Main = () => {
    const handleClick = () => {
        sendQueryUsingTokens({ query: 'jwt.test.js' }).then(response => console.log(response.data)).catch(error => console.log(error));
    };

    return (
        <Container className="text-center">
            <p>Main view</p>
            <Button onClick={() => handleClick()}>Get ajax</Button>
        </Container>
    );
};

export default Main;