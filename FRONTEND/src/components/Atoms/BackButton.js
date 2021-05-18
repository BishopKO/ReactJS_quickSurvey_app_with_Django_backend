import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import React from 'react';

const ButtonpWrapper = styled.div`
  display: flex;
  justify-content: flex-start;  
  max-width: inherit;   
  margin-bottom: 25px;  
  font-size: 4px;
  border-bottom: 1px solid lightgrey;
  padding: 5px
`;

const BackButtonComponent = ({ text = 'Go Back' }) => {

    return (
        <ButtonpWrapper>
            <Button onClick={() => window.history.back()} size="sm" variant="outline-secondary">
                <span>&larr; </span>{text}</Button>
        </ButtonpWrapper>
    );
};

export default BackButtonComponent;