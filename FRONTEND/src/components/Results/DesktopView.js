import React, { useReducer } from 'react';
import styled from 'styled-components';
import BackButtonComponent from '../Atoms/BackButton';
import { ListGroup } from 'react-bootstrap';

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


const QuestionStyle = {
    fontWeight: 'bold',
};

const AnswerStyle = {
    padding: 0,
    margin: 0,
};

const ListGroupStyle = {
    textAlign: 'center',
    cursor: 'pointer',
};


const DesktopView = ({ surveyAnswers }) => {
    const reducer = (state, activeAnswers) => {
        return {
            ...state,
            activeAnswers,
        };
    };

    const [state, dispatch] = useReducer(reducer, { activeAnswers: null });

    const handleSelectAnswer = (activeAnswers) => {
        dispatch(activeAnswers);
    };

    return (
        <div>
            <BackButtonComponent/>
            <Wrapper>
                <ListGroup style={ListGroupStyle}>
                    {surveyAnswers.map((item, index) => {
                        return (
                            <ListGroup.Item
                                onClick={() => handleSelectAnswer(index)}><span>{`Answers ${index + 1}`}</span>
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>

                <AnswersWrapper>
                    {state.activeAnswers !== null &&
                    surveyAnswers[state.activeAnswers].map((item, index) => {
                        return (
                            <AnswerWrapper key={`answers_${index}`}>
                                <span style={QuestionStyle}>{item.question}</span>
                                {item.answer.split('\n').map(item => {
                                    return (
                                        <p style={AnswerStyle}>{item}</p>
                                    );
                                })}
                            </AnswerWrapper>
                        );
                    })
                    }
                </AnswersWrapper>
            </Wrapper>
        </div>
    );
};

export default DesktopView;
