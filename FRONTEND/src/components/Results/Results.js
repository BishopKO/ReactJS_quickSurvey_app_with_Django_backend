import React, { useEffect, useState, useReducer } from 'react';
import { ListGroup } from 'react-bootstrap';
import styled from 'styled-components';
import BackButtonComponent from '../Atoms/BackButton';
import { useLocation } from 'react-router';
import { sendQueryUsingTokens } from '../../utils/jwt';

const Wrapper = styled.div`
//TODO: CREATe mobile version
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

// TODO: move all styles to variables

const ListGroupStyle = {
    textAlign: 'center',
    cursor: 'pointer',
};

const Results = () => {
    const location = useLocation();
    const survey_id = location.state.survey_id;
    const [surveyAnswers, setSurveyAnswers] = useState([]);

    useEffect(() => {
        sendQueryUsingTokens('get_results', { survey_id: survey_id }).then(resp => {
            setSurveyAnswers(resp.data.survey_results);
        }).catch(err => console.log(err));
    }, [survey_id]);

    const reducer = (state, number) => {
        return {
            ...state,
            number,
        };
    };

    const [state, dispatch] = useReducer(reducer, { number: null });

    const handleSelectAnswer = (number) => {
        dispatch(number);
    };

    if (surveyAnswers) {
        return (
            <div>
                <BackButtonComponent/>
                <Wrapper>
                    <ListGroup style={ListGroupStyle}>
                        {surveyAnswers.map((item, index) => {
                            return (
                                // TODO: change to button
                                <ListGroup.Item
                                    onClick={() => handleSelectAnswer(index)}>{`Answer ${index + 1}`}</ListGroup.Item>
                            );
                        })}
                    </ListGroup>

                    {/*TODO: move to separate compnent*/}
                    <AnswersWrapper>
                        {state.number !== null &&
                        surveyAnswers[state.number].map((item, index) => {
                            return (
                                <div>
                                    <p style={{ fontWeight: 'bold' }}>{item.question}</p>
                                    {item.answer.split('\n').map(item => {
                                        return (
                                            <p>{item}</p>
                                        );
                                    })}
                                </div>
                            );
                        })
                        }
                    </AnswersWrapper>
                </Wrapper>
            </div>
        );
    } else {
        return (<></>);
    }
};

export default Results;