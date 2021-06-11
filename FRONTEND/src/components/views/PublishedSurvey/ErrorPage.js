import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;  
  align-items: center;
  width: 100%;
  height: 100vh; 
  background-color: lightblue;
`;

const MessageWrapper = styled.p`
    text-align: center;
    font-family: "Roboto", "Lucida Grande", Verdana, Arial, sans-serif;
    font-weight: bold;
    font-size: 22px;
    width: fit-content;    
    height: fit-content;
    margin-top: 50px;
    padding: 10px;
    background-color: white;
    border-radius: 5px;
`;

const ErrorPage = ({ error_message }) => {
    return (
        <StyledWrapper>
            <MessageWrapper>
                {error_message}
            </MessageWrapper>
        </StyledWrapper>
    );
};

export default ErrorPage;