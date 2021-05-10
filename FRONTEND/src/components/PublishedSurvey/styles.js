import styled from 'styled-components';

const RootWrapper = styled.div`   
  display: flex;
  flex-direction: row; 
  justify-content: center;
  background-color: lightblue;
  width: 100%;
  height: 100%;  
  border-radius: 5px;
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  margin-top: 10px;   
  padding: 5px;
  border-radius: 5px;  
  background-color: white;
  overflow: hidden;
  height: fit-content;
  margin-bottom: 100px;
`;

const AnswersWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 5px;
`;


export { RootWrapper, MainWrapper, AnswersWrapper };