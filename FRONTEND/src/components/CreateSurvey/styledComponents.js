import styled from 'styled-components';

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 700px;
  margin: 30px auto;
  justify-content: center;  
  border: 1px solid lightgrey;
  padding: 5px;
  border-radius: 5px;
  
`;

const TopBarWrapper = styled.div`
  display: grid;
  justify-content: center;  
  max-width: inherit;  
  grid-template-columns: 80% 20% ;  
  margin-top: 20px; 
 padding-bottom: 5px; 
 font-size: 4px;
  border-bottom: 1px solid lightgrey;
`;

const TopBarButtonsWrapper = styled.div`
  display: flex;  
  flex-direction: row;
  justify-content: flex-end;  
`;

export { MainWrapper, TopBarWrapper, TopBarButtonsWrapper };