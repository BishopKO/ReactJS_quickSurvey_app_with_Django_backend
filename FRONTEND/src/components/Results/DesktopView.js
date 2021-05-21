import React, { useReducer } from 'react';
import BackButtonComponent from '../Atoms/BackButton';
import { ListGroup } from 'react-bootstrap';
import { Wrapper, AnswersWrapper, AnswerWrapper } from './styledComponents';
import { ListGroupStyle, AnswerStyle, QuestionStyle } from './stylesDesktop';

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
