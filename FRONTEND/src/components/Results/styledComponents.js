import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  margin-top: 20px;
`;

const AnswersWrapper = styled.div`
  border: 1px solid lightgrey;
  border-radius: 5px;
  margin-left: 10px;
  padding: 5px
`;

const AnswerWrapper = styled.div`
  margin-bottom: 10px;
`;

export { Wrapper, AnswersWrapper, AnswerWrapper };