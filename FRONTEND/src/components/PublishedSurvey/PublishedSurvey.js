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

// TODO: USE REDUCER
const PreviewSurvey = () => {
    const { id } = useParams();
    const history = useHistory();

    const reducer = (action) => {
        console.log(action);
    };


    const [surveyData, setSurveydata] = useState({});
    const [state, dispatch] = useReducer(reducer, []);


    const [surveyAnswers, setSurveyAnswers] = useState([]);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        getPublishedSurveyData(id)
            .then(response => {
                setSurveydata(response.data);
                const dataLength = response.data.questions.length;
                dispatch({ action: 'SET_INIT_STATE', payload: dataLength });
            })
            .catch(error => console.log(error));
    }, []);


    const handleSelectAnswer = (value) => {

        console.log(value);

        const { type } = value;
        if (type === 'checkbox') {
            console.log(surveyAnswers);
            const { question_number, selected } = value;
            const answer_type = surveyData.questions[question_number].type;

            let tmpAnswers = surveyAnswers;
            if (answer_type === 'single') {
                tmpAnswers[question_number] = selected;
                setSurveyAnswers(tmpAnswers);
            } else {
                if (tmpAnswers[question_number] === null) {
                    let ans = {};
                    ans[selected] = true;
                    tmpAnswers[question_number] = ans;
                    setSurveyAnswers(tmpAnswers);
                } else {
                    const current = tmpAnswers[question_number][selected];
                    tmpAnswers[question_number][selected] = !current;
                    setSurveyAnswers(tmpAnswers);
                }
            }
        }
        setChecked(!checked);

    };

    const handleOnSubmit = () => {
        console.log(surveyAnswers);
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

                                    <AnswersWrapper>
                                        {item.type === 'single' &&
                                        <div>
                                            <small>(select one)</small>
                                            {item.answers.split('\n').map(function(item, index) {
                                                return (
                                                    <InputGroup>
                                                        <InputGroup.Checkbox
                                                            checked={surveyAnswers[this.question_number] === index}
                                                            onChange={() => handleSelectAnswer({
                                                                type: 'checkbox',
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
                                        <div>
                                            <small>(select multiple)</small>
                                            {item.answers.split('\n').map(function(item, index) {
                                                return (
                                                    <InputGroup>
                                                        <InputGroup.Checkbox
                                                            onChange={() => handleSelectAnswer({
                                                                type: 'checkbox',
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


                                    </AnswersWrapper>}

                                    {!item.hasOwnProperty('answers') &&
                                    <InputGroup>
                                        <Form.Control onChange={(element) => handleSelectAnswer({
                                            type: 'text',
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
                ERROR
            </div>
        );
    }
};
export default PreviewSurvey;