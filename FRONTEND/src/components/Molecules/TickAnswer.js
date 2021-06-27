import React from 'react';
import styled, { keyframes } from 'styled-components';

const AnimationShrinkBounce = keyframes`
  10%{    
    transform: scale(.9);
  }
  50%{    
    transform: scale(1.2);
  }
  
  100%{
    transform: scale(1);    
  }
`;

const StyledWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 2em 1fr;  
  box-sizing: border-box;
  border: 1px solid lightgrey;
  border-radius: 5px; 
  padding: 0;  
  
  @media (min-width: 300px){
    font-size: 12px;
  }
  
  @media (min-width: 560px){
    font-size: 14px;
  }
`;

const StyledAnswerWrapper = styled.div`
  padding: 7px;  
  font-size: 1em;
 `;

const StyledCheckbox = styled.input`
  font-size: inherit;
  appearance: none;   
  box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05); 
  width: 1.5em;  
  height: 1.5em;
  margin-top: .5em;
  justify-self: center;
  border-radius: 5px; 
  position: relative;
  transition: all .1s;     
 
  :checked{
    border: 1px solid green;    
  }
  
  :not(:checked){
    transform: scale(.85);
    border: 2px solid lightgrey;
  }
  
  :checked:after{
      content: '\\2713';
      font-size: 2em;
      position: absolute;
      top: -0.5em;
      left: 0em;
      color: green;      
      animation: ${AnimationShrinkBounce};
      animation-duration: .3s;
      animation-iteration-count: 1;      
  }   
`;

const TickAnswer = ({ children, checked, setChecked }) => {
    return (
        <StyledWrapper>
            <StyledCheckbox type="checkbox" checked={checked} onChange={setChecked}/>
            <StyledAnswerWrapper>
                {children}
            </StyledAnswerWrapper>

        </StyledWrapper>
    );
};

export default TickAnswer;