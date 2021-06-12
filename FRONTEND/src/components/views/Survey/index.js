import React, { useEffect, useState } from 'react';
import Button from '../../Atoms/Button';
import QuestionMultiAnswer from '../../Organisms/QuestionMultiAnswer';
import InputTextareaWithText from '../../Atoms/InputTextareaWithText';
import styled from 'styled-components';
import { Alert } from 'react-bootstrap';
import { useParams } from 'react-router';
import { sendQueryUsingTokens } from '../../../utils/jwt';

import SurveyTemplate from '../../../templates/SurveyTemplate';

const StyledWrapper = styled.div`
  padding:5px;
`;

const AnswersWrapper = styled.div`
  margin-bottom: 25px;
`;

const PreviewSurvey = () => {
    const { id } = useParams();
    const [surveyData, setSurveyData] = useState({});
    const [surveyAnswers, setSurveyAnswers] = useState({});

    useEffect(() => {
        sendQueryUsingTokens('edit_survey', { request: 'GET_SURVEY_DATA', survey_id: id })
            .then(response => {
                setSurveyData(response.data);
            });
    }, [id]);

    const handleGetState = (value) => {
        let tmpState = surveyAnswers;
        tmpState[value.number] = value.state;
        setSurveyAnswers(tmpState);
    };

    const handleReadyToSubmit = () => {
        return false;
    };

    if (surveyData.hasOwnProperty('questions')) {
        return (
            <SurveyTemplate>
                <StyledWrapper>
                    <Alert variant="dark">{surveyData.title}</Alert>
                    <div>
                        {surveyData.questions.map((item, index) => {
                            return (
                                <AnswersWrapper>
                                    {item.hasOwnProperty('answers') &&
                                    <>
                                        <QuestionMultiAnswer key={`question__multi_${index}`} number={index}
                                                             question={item.question} type={item.type}
                                                             answers={item.answers.split('\n')}
                                                             stateAction={handleGetState}/>
                                    </>
                                    }
                                    {!item.hasOwnProperty('answers') &&
                                    <>
                                        <InputTextareaWithText text={item.question}/>
                                    </>
                                    }
                                </AnswersWrapper>
                            );
                        })
                        }
                    </div>
                </StyledWrapper>
                {handleReadyToSubmit &&
                <Button type="submit" text="Submit" action={() => console.log(surveyAnswers)}/>
                }
                {!handleReadyToSubmit &&
                <Button type="submit" text="Please answer all questions." action={() => console.log(surveyAnswers)}/>
                }
            </SurveyTemplate>
        );
    } else {
        return (
            <div>
            </div>
        );
    }
};
export default PreviewSurvey;