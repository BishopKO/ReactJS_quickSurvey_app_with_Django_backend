import React from 'react';
import styled, { css } from 'styled-components';
import GlobalStyle from '../GlobalStyles/GlobalStyle';
import theme from '../themes/theme';
import { ThemeProvider } from 'styled-components';

const StyledWrapper = styled.div`
  width:100%; 
  min-height: 100vh; 
  background-color: lightblue;
  
  ${({ published }) => published && css`
    background-color: blue;
    min-height: 100vh;
    min-width: 100vw;
  `} 
`;

const StyledViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1000px;
  margin: 30px auto; 
  padding: 5px;
  border-radius: 5px;
`;


const ChildrenWrapper = styled.div`
  width: 100%;  
  display: flex;
  flex-direction: column;    
`;


const PublishedTemplate = ({ children }) => {

    return (
        <StyledWrapper>
            <GlobalStyle/>
            <ThemeProvider theme={theme}>
                <ChildrenWrapper>
                    <StyledViewWrapper>
                        {children}
                    </StyledViewWrapper>
                </ChildrenWrapper>
            </ThemeProvider>
        </StyledWrapper>
    );

};


export default PublishedTemplate;
