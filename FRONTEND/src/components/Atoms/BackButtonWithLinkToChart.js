import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;  
  max-width: inherit;   
  margin-bottom: 25px;  
  font-size: 4px;
  border-bottom: 1px solid lightgrey;
  padding: 5px
`;

const BackButtonComponent = ({ text = 'Go Back', action, active }) => {

    return (
        <ButtonWrapper>
            <Button onClick={() => window.history.back()} size="sm" variant="outline-secondary">
                <span>&larr; </span>{text}</Button>
            {active &&
            <Button onClick={action} size="sm" variant="primary">Text View</Button>
            }
            {!active &&
            <Button onClick={action} size="sm" variant="success">Chart View</Button>
            }

        </ButtonWrapper>
    );
};

export default BackButtonComponent;