import React, { useEffect, useState } from 'react';
import Button from '../../Atoms/Button';
import QuestionMultiAnswer from '../../Organisms/QuestionMultiAnswer';
import InputTextareaWithText from '../../Atoms/InputTextareaWithText';
import styled from 'styled-components';
import StyledTitle from '../../Atoms/StyledTitle';
import ConfirmSubmitModal from '../../Molecules/ConfirmSubmitModal';
import ErrorPage from '../ErrorPage';
import { useHistory } from 'react-router';
import { useParams } from 'react-router';
import { getPublishedSurveyData, savePublishedSurveyData } from '../../../utils/jwt';

const StyledWrapper = styled.div`
  width: 100%;
  background-color: white;
  border: ${({ theme }) => `1px solid ${theme.lightGrey}`};
  border-radius: 10px;
  overflow: hidden;
`;

const AnswersWrapper = styled.div`
  margin-bottom: 25px;
`;

const InnerWrapper = styled.div`
  padding: 5px;
`;

const PreviewSurvey = ({ preview }) => {
    const { id } = useParams();
    const history = useHistory();
    const [surveyData, setSurveyData] = useState({});
    const [surveyAnswers, setSurveyAnswers] = useState({});
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [readyToSubmit, setReadyToSubmit] = useState(false);

    useEffect(() => {
        console.log(preview);
        getPublishedSurveyData(id)
            .then(response => {
                setSurveyData(response.data);
            })
            .catch(error => console.log(error));
    }, [id]);

    const handleGetState = (value) => {
        let tmpState = surveyAnswers;
        tmpState[value.number] = value.state;
        setSurveyAnswers(tmpState);
        if (surveyData.questions.length === Object.keys(surveyAnswers).length) {
            setReadyToSubmit(true);
        }
    };

    const handleSubmitAnswers = () => {
        if (preview) {
            console.log(surveyAnswers);
        } else {
            savePublishedSurveyData(id, surveyAnswers)
                .then(() => {
                    setShowConfirmModal(false);
                    history.push('/survey_success');
                })
                .catch(error => console.log(error));
        }
    };

    if (surveyData.hasOwnProperty('questions')) {
        return (
            <>
                <ConfirmSubmitModal show={showConfirmModal} closeAction={() => setShowConfirmModal(false)}
                                    submitAction={handleSubmitAnswers}/>
                <StyledWrapper>
                    <StyledTitle>{surveyData.title}</StyledTitle>
                    <InnerWrapper>
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
                                        <InputTextareaWithText number={index} text={item.question}
                                                               actionOnChange={handleGetState}/>
                                    </>
                                    }
                                </AnswersWrapper>
                            );
                        })
                        }
                    </InnerWrapper>
                    {readyToSubmit &&
                    <Button type="submit" text="Submit" action={() => setShowConfirmModal(true)}/>
                    }
                    {!readyToSubmit &&
                    <Button type="submit" text="Please answer all questions."/>
                    }
                </StyledWrapper>

            </>
        );
    } else {
        return (
            <div>
                <ErrorPage error_message={'Sorry... survey not found or is not active...'}/>
            </div>
        );
    }
};
export default PreviewSurvey;