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

const ButttonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 2px;   
`;

const TopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TestWrapper = styled.div`
  border: 1px solid grey;
  border-radius: 5px;
  padding: 5px;
  margin-top: 5px;
`;

export { MainWrapper, ButttonsWrapper, TopWrapper, TestWrapper };