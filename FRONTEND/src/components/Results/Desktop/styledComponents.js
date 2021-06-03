import styled from 'styled-components'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  margin-top: 20px;
`

const AnswersWrapper = styled.div`
  border: 1px solid lightgrey;
  border-radius: 5px;
  margin-left: 10px;
  padding: 5px
`

const AnswerWrapper = styled.div`
  margin-bottom: 10px;
`

const MainWrapperChart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid grey;
  border-radius: 5px;
  padding: 20px;
 word-break: break-all;
`

const MainQuestionWrapperChart = styled.div`
width: 100%;
display: flex;
flex-direction: column;
margin-bottom: 20px;
`

const AnswersWrapperChart = styled.div`
display: flex;
flex-direction: column;
`

const ChartWrapper = styled.div`    
  width: 50%;
  margin-left: 50px;
`

const CounterWrapperChart = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

export {
    Wrapper,
    AnswersWrapper,
    AnswerWrapper,
    AnswersWrapperChart,
    ChartWrapper,
    MainQuestionWrapperChart,
    MainWrapperChart,
    CounterWrapperChart,
}