import styled from 'styled-components';

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;   
  justify-content: center;  
  width: 100%;
  padding: 5px;
  border-radius: 5px; 
  border: 1px solid lightgrey;
  textarea{
  resize: none;
  } 
`;

const TopBarWrapper = styled.div`
  display: grid;
  justify-content: center;  
  max-width: inherit;  
  grid-template-columns: 1fr 180px ; 
  border-bottom: 1px solid lightgrey;
  padding-bottom: 5px
`;

const TopBarButtonsWrapper = styled.div`
  display: flex;  
  flex-direction: row;
  justify-content: flex-end;  
`;

export { MainWrapper, TopBarWrapper, TopBarButtonsWrapper };