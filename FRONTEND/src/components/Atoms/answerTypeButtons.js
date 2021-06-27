import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

const ButtonsWrapper = styled.div`
  display: flex; 
  height: 1em;  
  border-radius: 5px;  
  overflow: hidden;  
  padding: 0;
  margin-bottom: 5px;
  button:nth-child(1){
    border-bottom-left-radius: 5px;
  }
  button:nth-child(2){
    border-top-right-radius: 5px;
  }

`;

const Button = styled.button`
  font-size: 0.8em;
  padding: 2px 5px 2px 5px;
  border: none; 
  background-color: ${({ theme }) => theme.grey};
  color: white;
  overflow: hidden;
  
  
  ${({ active }) => active && css`
    background-color: ${({ theme }) => theme.green};
    color: white
  `}
`;


const AnswerTypeButtons = ({ select, index, action }) => {
    const [active, setActive] = useState(select);

    const handleSingle = () => {
        setActive('single');
        action(index, 'single');
    };

    const handleMulti = () => {
        setActive('multi');
        action(index, 'multi');
    };

    return (
        <ButtonsWrapper>
            <Button type="button" onClick={() => handleSingle()} active={active === 'single'}>single</Button>
            <Button type="button" onClick={() => handleMulti()} active={active === 'multi'}>multi</Button>
        </ButtonsWrapper>
    );
};

export default AnswerTypeButtons;