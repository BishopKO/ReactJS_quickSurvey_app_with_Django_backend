import React, { useEffect, useState } from 'react';
import Button from '../../Atoms/Button';
import QuestionMultiAnswer from '../../Organisms/QuestionMultiAnswer';
import InputTextareaWithText from '../../Atoms/InputTextareaWithText';
import styled from 'styled-components';
import StyledTitle from '../../Atoms/StyledTitle';
import ConfirmSubmitModal from '../../Molecules/ConfirmSubmitModal';
import Spinner from '../../Atoms/Spinner';
import { useHistory } from 'react-router';
import { useParams } from 'react-router';
import { saveSurveyResults, getSurveyData } from '../../../utils/jwt';

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

const Survey = ({ preview }) => {
    const { id } = useParams();
    const history = useHistory();
    const [surveyData, setSurveyData] = useState({ 'questions': [] });
    const [surveyAnswers, setSurveyAnswers] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [readyToSubmit, setReadyToSubmit] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const survey = await getSurveyData(id);
            survey.data = JSON.parse(survey.data);
            setSurveyData(survey);
            setLoading(false);
        })();

    }, [id]);

    const handleGetState = (value) => {
        let tmpState = surveyAnswers;
        tmpState[value.number] = value.state;
        setSurveyAnswers(tmpState);
        if (surveyData.data.length === Object.keys(surveyAnswers).length) {
            setReadyToSubmit(true);
        }
    };

    const handleSubmitAnswers = () => {
        if (preview) {
            console.log(surveyAnswers);
        } else {
            saveSurveyResults(id, surveyAnswers)
                .then(() => {
                    setShowConfirmModal(false);
                    history.push('/survey_success');
                })
                .catch(error => console.log(error));
        }
    };


    if (loading) {
        return (
            <Spinner/>
        );
    } else {
        return (
            <>
                <ConfirmSubmitModal show={showConfirmModal} closeAction={() => setShowConfirmModal(false)}
                                    submitAction={handleSubmitAnswers}/>
                <StyledWrapper>
                    <StyledTitle>{surveyData.survey_title}</StyledTitle>
                    <InnerWrapper>
                        {surveyData.data.map((item, index) => {
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
                    <Button variant="submit" text="Submit" color="green" action={() => setShowConfirmModal(true)}/>
                    }
                    {!readyToSubmit &&
                    <Button variant="submit" text="Please answer all questions." color="green"/>
                    }
                </StyledWrapper>
            </>
        );
    }
};
export default Survey;