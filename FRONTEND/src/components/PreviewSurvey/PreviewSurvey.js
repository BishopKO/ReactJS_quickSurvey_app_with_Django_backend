import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { sendQueryUsingTokens } from '../../utils/jwt';
import styled from 'styled-components';
import { Button, Form, Alert, InputGroup } from 'react-bootstrap';

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 700px;
  margin: 30px auto;
  justify-content: center;  
  border: 1px solid lightgrey;
  padding: 5px;
  border-radius: 5px;
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: flex-start;  
  max-width: inherit;   
  margin-bottom: 25px;  
  font-size: 4px;
  border-bottom: 1px solid lightgrey;
  padding: 5px
`;

const AnswersWrapper = styled.div`
width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 5px;
`;


const PreviewSurvey = () => {
    const location = useLocation();
    const [surveyData, setSurveyData] = useState({});

    // TODO: Preview from create and edit ??
    useEffect(() => {
        const locationState = location.state;
        const survey_id = locationState.survey_id;
        sendQueryUsingTokens('edit_survey', { request: 'GET_SURVEY_DATA', survey_id: survey_id })
            .then(response => {
                setSurveyData(response.data);
            });

    }, [location.state]);

    if (surveyData.hasOwnProperty('questions')) {
        return (
            <MainWrapper>
                <TopWrapper>
                    <Button onClick={() => window.history.back()} size="sm" variant="outline-secondary">
                        <span>&larr; </span>Go back</Button>
                </TopWrapper>
                <Alert variant="dark" style={{ textAlign: 'center' }}>{surveyData.title}</Alert>

                <Form>
                    {surveyData.questions.map((item, index) => {
                        return (
                            <Form.Group className={index === 0 ? 'mt-1' : 'mt-5'}
                                        key={`question_${index}`}>
                                <Form.Label style={{ fontWeight: 'bold' }}>{item.question}:</Form.Label>
                                {item.hasOwnProperty('answers') &&
                                <AnswersWrapper>
                                    <small>{item.type === 'single' ? '(select one)' : '(select multi)'}</small>
                                    {item.answers.split('\n').map((item, index) => {
                                        return (
                                            <InputGroup key={`answer_${index}`}>
                                                <InputGroup.Checkbox
                                                    aria-label="Checkbox for answer"/>
                                                <Form.Control aria-label="Text input with checkbox" value={item}
                                                              readOnly/>
                                            </InputGroup>
                                        );
                                    })}
                                </AnswersWrapper>
                                }
                                {!item.hasOwnProperty('answers') &&
                                <InputGroup>
                                    <Form.Control aria-label="Text input with checkbox"/>
                                </InputGroup>
                                }
                            </Form.Group>

                        );
                    })
                    }
                </Form>
                <Button style={{ marginTop: '10px' }}>Submit</Button>
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