import styled from 'styled-components';

const StyledWrapper = styled.div`
  width: 100%;  
  display: grid;
  grid-template-columns: 20% 80%;
`;

const AnswersWrapper = styled.div`
  border: 1px solid lightgrey;
  border-radius: 5px;
  margin-left: 10px;
  padding: 5px
`;

const AnswerWrapper = styled.div`
  margin-bottom: 20px;
`;

const MainWrapperChart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid grey;
  border-radius: 5px;
  padding: 20px;
  word-break: break-all;
  width: 100%;
  align-self: center;
`;

const MainQuestionWrapperChart = styled.div`
width: 100%;
display: flex;
flex-direction: column;
margin-bottom: 20px;
`;

const AnswersWrapperChart = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChartWrapper = styled.div`    
  width: 25%;
  min-width: 300px;
  margin-left: 50px;
`;

const CounterWrapperChart = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export {
    StyledWrapper,
    AnswersWrapper,
    AnswerWrapper,
    AnswersWrapperChart,
    ChartWrapper,
    MainQuestionWrapperChart,
    MainWrapperChart,
    CounterWrapperChart,
};