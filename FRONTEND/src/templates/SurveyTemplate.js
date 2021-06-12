import React from 'react';
import styled from 'styled-components';
import Button from '../components/Atoms/Button';

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 700px;
  margin: 30px auto;
  justify-content: center;  
  border: 1px solid lightgrey;
  border-radius: 5px;
  overflow: hidden;

  @media (min-width:360px){
    font-size: 10px;    
    }
    
  @media (min-width:500px){
    font-size: 13px;    
    }
    
  @media (min-width:768px){
    font-size: 14px;    
    }      
`;

const StyledTopWrapper = styled.div`
  padding: 5px 0 5px 5px;
`;

const SurveyTemplate = ({ children }) => {
    return (
        <MainWrapper>
            <StyledTopWrapper>
                <Button type="normal" text="Go Back" action={() => window.history.back()}/>
            </StyledTopWrapper>
            {children}
        </MainWrapper>
    );
};

export default SurveyTemplate;