import React, { useEffect, useState } from 'react';
import Button from '../../Atoms/Button';
import QuestionMultiAnswer from '../../Organisms/QuestionMultiAnswer';
import InputTextareaWithText from '../../Atoms/InputTextareaWithText';
import styled from 'styled-components';
import StyledTitle from '../../Atoms/StyledTitle';
import ConfirmSubmitModal from '../../Molecules/ConfirmSubmitModal';
import ErrorPage from '../ErrorPage';
import Spinner from '../../Atoms/Spinner';
import { useHistory } from 'react-router';
import { useParams } from 'react-router';
import { saveSurveyResults, getPublishedSurvey } from '../../../utils/jwt';

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

const PublishedSurvey = ({ preview }) => {
    const { id } = useParams();
    const history = useHistory();
    const [surveyData, setSurveyData] = useState({});
    const [surveyAnswers, setSurveyAnswers] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [readyToSubmit, setReadyToSubmit] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const survey = await getPublishedSurvey(id);
            if (!survey.isActive) {
                history.push({ pathname: '/survey_not_found' });
            } else {
                survey.data = JSON.parse(survey.data);
                setSurveyData(survey);
                setLoading(false);
            }
        })();

    }, [id, history]);

    const handleGetState = (value) => {
        let tmpState = surveyAnswers;
        tmpState[value.number] = value.state;
        setSurveyAnswers(tmpState);
        if (surveyData.data.length === Object.keys(surveyAnswers).length) {
            setReadyToSubmit(true);
        }
    };

    const handleSubmitAnswers = async () => {
        if (preview) {
            console.log(surveyAnswers);
        } else {
            const response = await saveSurveyResults(id, surveyAnswers);
            if (response.statusText === 'Created') {
                setShowConfirmModal(false);
                history.push('/survey_success');
            }
        }
    };

    if (loading) {
        return (<Spinner/>);
    }

    if (!loading) {
        return (
            <>
                <ConfirmSubmitModal show={showConfirmModal} closeAction={() => setShowConfirmModal(false)}
                                    submitAction={handleSubmitAnswers}/>
                <StyledWrapper>
                    <StyledTitle>{surveyData.survey_title}</StyledTitle>
                    <InnerWrapper>
                        {surveyData.data.map((item, index) => {
                            return (
                                <AnswersWrapper key={`answers_key_${index}`}>
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
                                        <InputTextareaWithText key={`question__text_${index}`} number={index}
                                                               text={item.question}
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
    } else {
        return (
            <div>
                <ErrorPage error_message={'Sorry... survey not found or is not active...'}/>
            </div>
        );
    }
};
export default PublishedSurvey;