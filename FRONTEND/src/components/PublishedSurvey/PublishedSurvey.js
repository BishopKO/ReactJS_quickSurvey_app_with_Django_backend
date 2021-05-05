import React, { useEffect, useState, useReducer } from 'react';
import { useHistory, useParams } from 'react-router';
import { getPublishedSurveyData } from '../../utils/jwt';
import styled from 'styled-components';
import { Button, Form, Alert, InputGroup } from 'react-bootstrap';

const RootWrapper = styled.div`  
  display: flex;
  align-content: center;
  flex-direction: column;
  background-color: lightblue;
  width: 100%;
  height: 100vh;
  
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 700px;
  margin: 10px auto;
  justify-content: center;  
  border: 1px solid lightgrey;
  padding: 5px;
  border-radius: 5px;  
  background-color: white;
`;

const AnswersWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 5px;
`;

const getCheckboxesValue = (element_id) => {
    const checkboxes = document.querySelector(`#${element_id}`);
    const inputs = checkboxes.querySelectorAll('input.form-check-input');
    return Array.from(inputs).map((item) => {
        return item.checked;
    });
};


const PublishedSurvey = () => {
    const { id } = useParams();

    const [surveyData, setSurveydata] = useState({});

    const formReducer = (state, action) => {
        const { type, payload } = action;

        switch (type) {
            case 'SET_INIT_STATE': {
                return Array(payload).fill(null);
            }
            case 'QUESTION_SINGLE': {
                const { question_number, selected } = payload;
                const tmpState = state;
                tmpState[question_number] = selected;
                return { ...tmpState };
            }
            case 'QUESTION_MULTI': {
                const { question_number, selected } = payload;
                const tmpState = state;
                tmpState[question_number] = selected;
                return { ...tmpState };
            }
            case 'QUESTION_TEXT': {
                let tmpState = state;
                const { question_number, value } = payload;
                tmpState[question_number] = value;
                return { ...tmpState };
            }
            default:
                return {
                    ...state,
                };
        }
    };

    const [state, dispatch] = useReducer(formReducer, []);


    useEffect(() => {
        getPublishedSurveyData(id)
            .then(response => {
                setSurveydata(response.data);
                const dataLength = response.data.questions.length;
                dispatch({ type: 'SET_INIT_STATE', payload: dataLength });
            })
            .catch(error => console.log(error));
    }, []);


    const handleSelectAnswerSingle = (value) => {
        const { question_number, selected } = value;
        dispatch({ type: 'QUESTION_SINGLE', payload: { question_number: question_number, selected: selected } });
    };

    const handleSelectAnswerMulti = (question_number) => {
        let values = getCheckboxesValue(`answers_multi_${question_number}`);

        dispatch({ type: 'QUESTION_MULTI', payload: { question_number: question_number, selected: values } });

    };

    const handleSelectAnswerText = (value) => {
        const { question_number, answer } = value;
        dispatch({ type: 'QUESTION_TEXT', payload: { question_number: question_number, value: answer } });

    };


    const handleOnSubmit = () => {
        console.log(state);
    };


    if (surveyData.hasOwnProperty('questions')) {
        return (
            <RootWrapper>
                <MainWrapper>
                    <Alert variant="dark" style={{ textAlign: 'center' }}>{surveyData.title}</Alert>
                    <Form>
                        {surveyData.questions.map((item, index) => {
                            return (
                                <Form.Group className={index === 0 ? 'mt-1' : 'mt-5'}
                                            key={`question_${index}`}>
                                    <Form.Label style={{ fontWeight: 'bold' }}>{item.question}:</Form.Label>
                                    {item.hasOwnProperty('answers') &&

                                    <AnswersWrapper key={`answer_${index}`}>
                                        {item.type === 'single' &&
                                        <div>
                                            <small>(select one)</small>
                                            {item.answers.split('\n').map(function(item, index) {
                                                return (
                                                    <InputGroup key={`answer_single_${index}`}>
                                                        <InputGroup.Checkbox
                                                            checked={index === state[this.question_number]}
                                                            onChange={() => handleSelectAnswerSingle({
                                                                question_number: this.question_number,
                                                                selected: index,
                                                            })}
                                                            aria-label="Checkbox for answer"/>
                                                        <Form.Control aria-label="Text input with checkbox" value={item}
                                                                      readOnly/>
                                                    </InputGroup>
                                                );
                                            }, { question_number: index })}
                                        </div>
                                        }

                                        {item.type === 'multi' &&
                                        <div id={`answers_multi_${index}`}>
                                            <small>(select multiple)</small>
                                            {item.answers.split('\n').map(function(item, index) {
                                                return (
                                                    <InputGroup key={`answers_multi_${index}`}>
                                                        <InputGroup.Checkbox
                                                            onChange={() => handleSelectAnswerMulti(this.question_number)}
                                                            aria-label="Checkbox for answer"/>
                                                        <Form.Control aria-label="Text input with checkbox" value={item}
                                                                      readOnly/>
                                                    </InputGroup>
                                                );
                                            }, { question_number: index })}
                                        </div>
                                        }


                                    </AnswersWrapper>}

                                    {!item.hasOwnProperty('answers') &&
                                    <InputGroup>
                                        <Form.Control onChange={(element) => handleSelectAnswerText({
                                            question_number: index,
                                            answer: element.target.value,
                                        })} aria-label="Text input with checkbox"/>
                                    </InputGroup>
                                    }
                                </Form.Group>

                            );
                        })
                        }
                    </Form>
                    <Button onClick={() => handleOnSubmit()} style={{ marginTop: '10px' }}>Submit</Button>
                </MainWrapper>
            </RootWrapper>
        );
    } else {
        return (
            <div>
                {/*TODO: ADD ERROR PAGE*/}
                ERROR
            </div>
        );
    }
};
export default PublishedSurvey;