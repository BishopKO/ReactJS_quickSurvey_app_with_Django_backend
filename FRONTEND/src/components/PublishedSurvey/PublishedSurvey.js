import React, { useEffect, useState, useReducer } from 'react';
import { useParams, useHistory } from 'react-router';
import { getPublishedSurveyData, savePublishedSurveyData } from '../../utils/jwt';

import { Button, Form, Alert, InputGroup } from 'react-bootstrap';
import { RootWrapper, MainWrapper, AnswersWrapper } from './styles';
import ConfirmSubmitModal from './ConfirmSubmitModal';
import ErrorPage from './ErrorPage';
import formReducer from './formReducer';


const getCheckboxesValue = (element_id) => {
    const checkboxes = document.querySelector(`#${element_id}`);
    const inputs = checkboxes.querySelectorAll('input.form-check-input');
    return Array.from(inputs).map((item) => {
        return item.checked;
    });
};


const PublishedSurvey = () => {
    const { id } = useParams();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [surveyData, setSurveydata] = useState({});
    const [state, dispatch] = useReducer(formReducer, {});


    const history = useHistory();

    useEffect(() => {
        getPublishedSurveyData(id)
            .then(response => {
                setSurveydata(response.data);
            })
            .catch(error => console.log(error));
    }, [id]);

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

    const submitAnswers = () => {
        savePublishedSurveyData(id, state)
            .then(() => {
                setShowConfirmModal(false);
                history.push('/survey_success');
            })
            .catch(error => console.log(error));
    };

    const handleSubmit = () => {
        setShowConfirmModal(true);
    };

    const handleReadyToSubmit = () => {
        return Object.keys(state).length === surveyData.questions.length;
    };


    if (surveyData.hasOwnProperty('questions')) {
        return (
            <RootWrapper>
                <ConfirmSubmitModal show={showConfirmModal} closeAction={() => setShowConfirmModal(false)}
                                    submitAction={() => submitAnswers()}/>
                <MainWrapper>
                    <Alert variant="dark" style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: '22px',
                    }}>{surveyData.title}</Alert>
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
                                                        />
                                                        <Form.Control value={item}
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
                                                        />
                                                        <Form.Control value={item}
                                                                      readOnly/>
                                                    </InputGroup>
                                                );
                                            }, { question_number: index })}
                                        </div>}


                                    </AnswersWrapper>}

                                    {!item.hasOwnProperty('answers') &&
                                    <InputGroup>
                                        <Form.Control onChange={(element) => handleSelectAnswerText({
                                            question_number: index,
                                            answer: element.target.value,
                                        })}/>
                                    </InputGroup>
                                    }
                                </Form.Group>
                            );
                        })
                        }
                    </Form>
                    {!handleReadyToSubmit() &&
                    <Button
                        style={{ marginTop: '10px' }}
                        disabled={true}>Please answer all questions</Button>
                    }
                    {handleReadyToSubmit() &&
                    <Button
                        onClick={() => handleSubmit()}
                        style={{ marginTop: '10px' }}>Submit</Button>
                    }
                </MainWrapper>
            </RootWrapper>
        );
    } else {
        return (
            <ErrorPage error_message={'Survey not found or is not active...'}/>
        );
    }
};
export default PublishedSurvey;