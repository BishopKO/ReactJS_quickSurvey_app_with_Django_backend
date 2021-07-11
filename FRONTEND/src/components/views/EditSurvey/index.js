import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AnswerTypeButtons from '../../Atoms/answerTypeButtons';
import Button from '../../Atoms/Button';
import StyledInput from '../../Atoms/StyledInput';
import ConfirmSaveModal from './ConfirmSaveModal';
import { getSurveyData, createNewSurvey } from '../../../utils/jwt';
import { useHistory, useParams } from 'react-router';
import Spinner from '../../Atoms/Spinner';


const StyledWrapper = styled.div`
      display: flex;
      flex-direction: column;   
      justify-content: center;  
      width: 100%;
      padding: 10px;
      border-radius: 5px; 
      border: ${({ theme }) => `1px solid ${theme.lightGrey}`};
      textarea{
        resize: none;
      } 
  `;

const TopBarWrapper = styled.div`
      display: grid;
      justify-content: center;  
      max-width: inherit;  
      grid-template-columns: 1fr 150px; 
      border-bottom: 1px solid lightgrey;
      padding-bottom: 5px
    `;

const TopBarButtonsWrapper = styled.div`
      display: flex;  
      flex-direction: row;
      justify-content: flex-end;  
      button{
        margin-right: 5px;
      } 
    `;

const StyledAnswersBar = styled.div`
      display: flex;
      justify-content: space-between;
      flex-direction: row;     
  `;

const StyledQuestionWrapper = styled.div`
  display: grid;
  grid-template-rows: 40px 40px fit-content;
  border: ${({ theme }) => `2px solid ${theme.lightGrey}`};
  box-shadow: 0 0 5px black ; 
  border-radius: 5px;
  padding: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  
  div:nth-child(1){
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 2em;       
  }
  `;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 5em;
  border: ${({ theme }) => `1px solid ${theme.lightGrey}`};
  border-radius: 5px;
  :focus{
    outline: none;
  }
  
`;

const EditSurvey = () => {
    const [state, setState] = useState({ title: '', data: [] });
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        (async () => {
            const survey = await getSurveyData(id);
            survey.data = JSON.parse(survey.data);
            setState(survey);
            setLoading(false);
        })();
    }, [id]);


    const handleChangeTitle = (element) => {
        const { value } = element.target;
        const tmpState = state;
        tmpState.survey_title = value;
        setState({ ...tmpState });
    };

    const handleAddQuestion = () => {
        const tmpState = state;
        tmpState.data.push({ 'question': '' });
        setState({ ...tmpState });
    };

    const handleRemove = (number) => {
        let tmpState = state;
        tmpState.data = tmpState.data.filter((item, index) => index !== number);
        setState({ ...tmpState });
    };

    const handleChangeQuestion = (element, index) => {
        const { value } = element.target;
        let tmpState = state;
        tmpState.data[index].question = value;
        setState({ ...tmpState });
    };

    const handleChangeAnswers = (element, index) => {
        const { value } = element.target;
        let tmpState = state;
        tmpState.data[index].answers = value;
        setState({ ...tmpState });
    };

    const handleAddAnswers = (index) => {
        let tmpState = state;
        tmpState.data[index].answers = '';
        tmpState.data[index].type = 'single';
        setState({ ...tmpState });
    };

    const handleRemoveAnswers = (index) => {
        let tmpState = state;
        delete tmpState.data[index].answers;
        delete tmpState.data[index].type;
        setState({ ...tmpState });
    };

    const handleSave = async () => {
        const response = await createNewSurvey(state);
        if (response.statusText === 'Created') {
            history.push('/');
        }
    };

    const handleAnswerType = (index, type) => {
        let tmpState = state;
        tmpState.data[index].type = type;
        setState({ ...tmpState });
    };

    const handleClear = () => {
        setState({ title: '', data: [] });
    };

    if (loading) {
        return (
            <Spinner/>
        );
    } else {
        return (
            <StyledWrapper>
                <ConfirmSaveModal show={showModal} submitAction={handleSave} closeAction={() => setShowModal(false)}/>
                <TopBarWrapper>
                    <StyledInput onChange={(element) => handleChangeTitle(element)} value={state.survey_title}
                                 placeholder="Survey title..."/>
                    <TopBarButtonsWrapper>
                        <Button color="green" text="Save"
                                action={() => setShowModal(true)}/>
                        <Button color="yellow" text="Clear" action={handleClear}/>
                    </TopBarButtonsWrapper>
                </TopBarWrapper>

                {state.data.map((item, index) => {
                    return (
                        <StyledQuestionWrapper>
                            <div>
                                Question {index + 1}:
                                <Button color="red" size="small" variant="outline" text="delete question"
                                        action={() => handleRemove(index)}>
                                </Button>
                            </div>
                            <div>
                                <StyledInput type="text" value={item.question} name={index}
                                             onChange={(element) => handleChangeQuestion(element, index)}/>


                                {!item.hasOwnProperty('answers') &&
                                <Button color="blue" text="Add answers" size="small" variant="outline"
                                        action={() => handleAddAnswers(index)}/>
                                }
                            </div>
                            <div>
                                {item.hasOwnProperty('answers') &&
                                <>
                                    <StyledAnswersBar>
                                        <AnswerTypeButtons index={index} select={item.type} action={handleAnswerType}/>

                                        <Button color="red" size="small"
                                                variant="outline"
                                                action={() => handleRemoveAnswers(index)}
                                                text="Remove answers"/>
                                    </StyledAnswersBar>

                                    <StyledTextarea type="textarea" value={item.answers}
                                                    onChange={(element) => handleChangeAnswers(element, index)}/>
                                </>
                                }
                            </div>
                        </StyledQuestionWrapper>
                    );
                })
                }
                <Button color="green" text="Add+" variant="submit" action={handleAddQuestion}/>
            </StyledWrapper>
        );
    }
};

export default EditSurvey;