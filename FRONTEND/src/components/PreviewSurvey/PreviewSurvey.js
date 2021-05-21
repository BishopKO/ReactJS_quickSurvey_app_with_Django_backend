import React, { useEffect, useState } from 'react';
import BackButtonComponent from '../Atoms/BackButton';
import { useLocation } from 'react-router';
import { sendQueryUsingTokens } from '../../utils/jwt';
import { MainWrapper, AnswersWrapper } from './styledComponents';
import { AlertStyle, ButtonStyle, FormLabelStyle } from './styles';
import { Button, Form, Alert, InputGroup } from 'react-bootstrap';


const PreviewSurvey = () => {
    const location = useLocation();
    const [surveyData, setSurveyData] = useState({});

    useEffect(() => {
        const locationState = location.state;
        const survey_id = locationState.survey_id;
        sendQueryUsingTokens('edit_survey', { request: 'GET_SURVEY_DATA', survey_id: survey_id })
            .then(response => {
                setSurveyData(response.data);
            });
    }, []);

    if (surveyData.hasOwnProperty('questions')) {
        return (
            <MainWrapper>
                <BackButtonComponent/>
                <Alert variant="dark" style={AlertStyle}>{surveyData.title}</Alert>
                <Form>
                    {surveyData.questions.map((item, index) => {
                        return (
                            <Form.Group className={index === 0 ? 'mt-1' : 'mt-5'}
                                        key={`question_${index}`}>
                                <Form.Label style={FormLabelStyle}>{item.question}:</Form.Label>
                                {item.hasOwnProperty('answers') &&
                                <AnswersWrapper>
                                    <small>{item.type === 'single' ? '(select one)' : '(select multi)'}</small>
                                    {item.answers.split('\n').map((item, index) => {
                                        return (
                                            <InputGroup key={`answer_${index}`}>
                                                <InputGroup.Checkbox/>
                                                <Form.Control value={item}
                                                              readOnly/>
                                            </InputGroup>
                                        );
                                    })}
                                </AnswersWrapper>
                                }
                                {!item.hasOwnProperty('answers') &&
                                <InputGroup>
                                    <Form.Control/>
                                </InputGroup>
                                }
                            </Form.Group>
                        );
                    })
                    }
                </Form>
                <Button style={ButtonStyle}>Submit</Button>
            </MainWrapper>
        );
    } else {
        return (
            <div>
            </div>
        );
    }
};
export default PreviewSurvey;