import React from 'react';
import styled, { css } from 'styled-components';
import CustomNavbar from '../components/Organisms/CustomNavbar';
import GlobalStyle from '../GlobalStyles/GlobalStyle';
import theme from '../themes/theme';
import Button from '../components/Atoms/Button';
import { useHistory } from 'react-router';
import { ThemeProvider } from 'styled-components';
import { withRouter } from 'react-router';
import { StyledTopbar } from '../components/Atoms/StyledTopbar';


const StyledWrapper = styled.div`
  width:100%;
  max-width: 1920px; 
  
  ${({ published }) => published && css`
    background-color: lightblue;
    min-height: 100vh;
    width: 100vw; 
  `} 
`;

const StyledViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin: 30px auto;
  padding: 5px;
  border-radius: 5px;
`;


const ChildrenWrapper = styled.div`
  width: 100%;  
  display: flex;
  flex-direction: column; 
`;


const MainTemplate = ({ children, location }) => {
    const history = useHistory();
    const published = location.pathname.includes('/survey');

    const showBackButton = () => {
        const paths = ['/results', '/preview', '/edit'];
        return paths.some(item => location.pathname.includes(item));
    };

    if (published) {
        return (
            <StyledWrapper published={published}>
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
    } else {
        return (
            <StyledWrapper>
                <GlobalStyle/>
                <ThemeProvider theme={theme}>
                    <CustomNavbar loggedIn={localStorage.getItem('loggedIn')}/>
                    {showBackButton() &&
                    <StyledTopbar>
                        <Button color={'grey'} action={() => history.push('/')} text="Go Back"/>
                    </StyledTopbar>}
                    <ChildrenWrapper>
                        <StyledViewWrapper>
                            {children}
                        </StyledViewWrapper>
                    </ChildrenWrapper>
                </ThemeProvider>
            </StyledWrapper>
        );
    }
};


export default withRouter(MainTemplate);
