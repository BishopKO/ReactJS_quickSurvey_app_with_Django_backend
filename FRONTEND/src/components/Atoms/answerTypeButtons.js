import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

const ButtonsWrapper = styled.div`
display: flex;
  width: 100px;
  height: 20px;
  border-radius: 5px;  
  overflow: hidden;  
  padding: 0;
  margin-bottom: 5px;
`;

const Button = styled.button`
  width: 50%; 
  height: 100%;
  font-size: 10px;
  border: none; 
  background-color: lightgrey;
  overflow: hidden;
  
  ${({ active }) => active && css`
    background-color: green;
    color: white
  `}
`;


const AnswerTypeButtons = ({ select, index, action }) => {
    const [active, setActive] = useState(select);
    useEffect(() => {

    });

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