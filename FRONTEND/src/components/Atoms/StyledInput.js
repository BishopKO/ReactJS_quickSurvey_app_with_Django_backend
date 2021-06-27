import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  border: ${({ theme }) => `1px solid ${theme.lightGrey}`};
  font-size: inherit;
  border-radius: 5px;
  width: 100%;
  :focus{
    outline: none;
  }  
`;

export default StyledInput;