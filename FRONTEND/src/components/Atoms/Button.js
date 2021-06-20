import styled, { css } from 'styled-components';
import React from 'react';

const StyledWrapper = styled.div` 
  min-width: fit-content;
`;

const StyledButton = styled.button` 
   padding: 2px 6px 2px 6px;
   border-radius: 5px;
   cursor: pointer;
   font-size: inherit;  
   font-family: inherit;  
   opacity: 0.85;   
   border: ${({ theme, color }) => `1px solid ${theme[color]}`};
   color: white;
   background-color: ${({ theme, color }) => theme[color]};
   :hover{
    opacity: 1;
   }

   
  ${({ type }) => type === 'outline' && css`   
   opacity: 1;
   border: ${({ theme, color }) => `1px solid ${theme[color]}`};
   color: ${({ theme, color }) => theme[color]};  
   background-color:white;
   :hover{
      color: white;
      background-color: ${({ theme, color }) => theme[color]};
   }
   `}
   
   
  ${({ type }) => type === 'submit' && css`
    width: 100%;    
    color: white;
    border: none;
    outline: none;
    border-radius: 0;
    background-color: ${({ theme, color }) => theme[color]};
    padding: 10px;   
    font-weight: bold;
    
    :hover{      
    opacity: 1;
      //background: ${({ theme, color }) => theme[color]};
    }
  `}
`;

const Button = ({ text, action, type, color }) => {
    return (
        <StyledWrapper>
            <StyledButton onClick={action}
                          type={type}
                          color={color}>
                <span>{text}</span>
            </StyledButton>
        </StyledWrapper>
    );
};

export default Button;