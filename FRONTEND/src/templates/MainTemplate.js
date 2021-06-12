import React from 'react';
import CustomNavbar from '../components/Organisms/CustomNavbar';
import GlobalStyle from '../GlobalStyles/GlobalStyle';
import styled from 'styled-components';
import { withRouter } from 'react-router';

const StyledWrapper = styled.div`
  width:100%;
  max-width: 1920px;
`;


const MainTemplate = ({ children }) => {

    return (
        <StyledWrapper>
            <GlobalStyle/>
            <CustomNavbar loggedIn={localStorage.getItem('loggedIn')}/>
            <div>{children}</div>
        </StyledWrapper>
    );
};

export default withRouter(MainTemplate);
