import React, { useState } from 'react';
import styled from 'styled-components';
import AnswerTypeButtons from '../../Atoms/answerTypeButtons';
import Button from '../../Atoms/Button';
import StyledInput from '../../Atoms/StyledInput';
import { createNewSurvey } from '../../../utils/jwt';
import { useHistory } from 'react-router';


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
  grid-template-rows: 40px 40px fit-content();
  border: ${({ theme }) => `2px solid ${theme.lightGrey}`};
  box-shadow: ${({ theme }) => `0 0 3px ${theme.green}`} ;

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


const CreateSurvey = () => {
    const [questions, setQuestions] = useState([]);
    const [title, setTitle] = useState('');
    const history = useHistory();

    const handleChangeTitle = (event) => {
        let text = event.target.value;
        setTitle(text);
    };

    const handleAddQuestion = () => {
        setQuestions([...questions, { 'question': '' }]);
    };

    const handleRemove = (number) => {
        setQuestions([...questions].filter((question, index) => index !== number));
    };

    const handleChangeQuestion = (element, index) => {
        let tmpState = questions;
        tmpState[index].question = element.target.value;
        setQuestions([...tmpState]);
    };

    const handleChangeAnswers = (element, index) => {
        let tmpState = questions;
        tmpState[index].answers = element.target.value;
        setQuestions([...tmpState]);
    };

    const handleAddAnswers = (index) => {
        Object.assign(questions[index], { answers: '', type: 'single' });
        setQuestions([...questions]);
    };

    const handleRemoveAnswers = (index) => {
        delete questions[index].answers;
        setQuestions([...questions]);
    };

    const handleSave = async () => {
        const data = { survey_title: title, data: questions };
        const response = await createNewSurvey(data);
        if (response.statusText === 'Created') {
            history.push('/');
        }
    };

    const handleAnswerType = (index, type) => {
        let tmpState = questions;
        questions[index].type = type;
        setQuestions([...tmpState]);
    };

    const handleClear = () => {
        setQuestions([]);
        setTitle('');
    };


    return (
        <StyledWrapper>
            <TopBarWrapper>
                <StyledInput onChange={handleChangeTitle} value={title}
                             placeholder="Survey title..."/>
                <TopBarButtonsWrapper>
                    <Button color="green" text="Save"
                            action={handleSave}/>
                    <Button color="yellow" text="Clear" action={handleClear}/>
                </TopBarButtonsWrapper>
            </TopBarWrapper>

            {questions.map((item, index) => {
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

export default CreateSurvey;