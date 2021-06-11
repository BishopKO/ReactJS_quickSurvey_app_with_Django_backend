import React from 'react'
import styled from 'styled-components'

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 700px;
  margin: 30px auto;
  justify-content: center;  
  border: 1px solid lightgrey;
  padding: 5px;
  border-radius: 5px;
  word-break: break-all;
  

  @media (min-width:360px){
    font-size: 10px;    
    }
    
  @media (min-width:500px){
    font-size: 13px;    
    }
    
  @media (min-width:768px){
    font-size: 14px;    
    }      
`

const SurveyTemplate = ({ children }) => {
    return (
        <MainWrapper>
            {children}
        </MainWrapper>
    )
}

export default SurveyTemplate