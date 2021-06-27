import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.div`
  background-color: ${({ theme }) => theme.lightGrey};
  border: none;  
  padding: 10px;
  font-size: 1.2em; 
  word-break: break-word;  
  text-align: center;
  width: ${({ width }) => `${width}px`};
  margin-bottom: 20px;
`;


export default StyledTitle;