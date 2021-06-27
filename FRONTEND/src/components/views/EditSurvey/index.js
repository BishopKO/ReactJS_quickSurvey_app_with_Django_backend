import React, { useReducer, useEffect } from 'react';
import styled from 'styled-components';
import editReducer from './editReducer';
import AnswerTypeButtons from '../../Atoms/answerTypeButtons';
import Button from '../../Atoms/Button';
import StyledInput from '../../Atoms/StyledInput';
import { sendQueryUsingTokens } from '../../../utils/jwt';
import { useHistory, useParams } from 'react-router';

// TODO: ADD MODAL, SAVE AS NEW

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
  box-shadow: -1px 1px 5px black ;
  box-shadow: 1px -1px 5px black ;
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
    const [state, dispatch] = useReducer(editReducer, { title: '', questions: [] });
    const { id } = useParams();

    useEffect(() => {
        console.log(id);
        sendQueryUsingTokens('edit_survey', { request: 'GET_SURVEY_DATA', survey_id: id })
            .then(data => {
                dispatch({ type: 'UPDATE_DATA', payload: data });
            });
    }, []);

    const history = useHistory();

    const handleChangeTitle = (element) => {
        const title = element.target.value;
        dispatch({ type: 'UPDATE_TITLE', payload: title });
    };

    const handleAddQuestion = () => {
        dispatch({ type: 'ADD_QUESTION' });
    };

    const handleRemove = (number) => {
        dispatch({ type: 'REMOVE_QUESTION', payload: number });
    };

    const handleChangeQuestion = (element, index) => {
        dispatch({ type: 'UPDATE_QUESTION', payload: [index, element.target.value] });
    };

    const handleChangeAnswers = (element, index) => {
        dispatch({ type: 'UPDATE_ANSWERS', payload: [index, element.target.value] });
    };

    const handleAddAnswers = (index) => {
        dispatch({ type: 'ADD_ANSWERS', payload: index });
    };

    const handleRemoveAnswers = (index) => {
        dispatch({ type: 'REMOVE_ANSWERS', payload: index });
    };

    const handleSave = () => {
        sendQueryUsingTokens('edit_survey', { request: 'SAVE_SURVEY', survey_id: id, data: state }).then(() => {
            history.push('/');
        }).catch(error => console.log(error));
    };

    const handleAnswerType = (index, type) => {
        dispatch({ type: 'SET_ANSWER_TYPE', payload: { index: index, type: type } });
    };

    const handleClear = () => {
        dispatch({ type: 'CLEAR' });
    };


    return (
        <StyledWrapper>
            <TopBarWrapper>
                <StyledInput onChange={(element) => handleChangeTitle(element)} value={state.title}
                             placeholder="Survey title..."/>
                <TopBarButtonsWrapper>
                    <Button color="green" text="Save"
                            action={handleSave}/>
                    <Button color="yellow" text="Clear" action={handleClear}/>
                </TopBarButtonsWrapper>
            </TopBarWrapper>

            {state.questions.map((item, index) => {
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

                                {/*TODO: create styled textarea*/}
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
};

export default EditSurvey;