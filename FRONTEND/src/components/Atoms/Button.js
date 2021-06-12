import styled, { css } from 'styled-components';
import React from 'react';

const StyledWrapper = styled.div` 
  font-size: 14px;
`;

const StyledButton = styled.button` 
  ${({ type }) => type === 'normal' && css`
      padding: 4px 8px 4px 8px;
      border-radius: 5px;
      border: 1px solid rgb(108,117,125);
      cursor: pointer;
      color: rgb(108,117,125);
      font-size: inherit;  
      font-weight: bold; 
        :hover{
          color: white;
          background: rgb(108,117,125);
        }
  `}


  ${({ type }) => type === 'submit' && css`
    width: 100%;
    color: white;
    border: none;
    outline: none;
    
    background-color: rgb(0,142,255);
    padding: 5px;   
    font-weight: bold;
    
    :hover{      
      background: rgb(0,122,225);
    }
  `}
   
   
    
  
`;

const Button = ({ text, action, type }) => {
    return (
        <StyledWrapper>
            <StyledButton onClick={action}
                          type={type}
                          size="sm"
                          variant="outline-secondary">
                <span>{text}</span>
            </StyledButton>
        </StyledWrapper>
    );
};

export default Button;