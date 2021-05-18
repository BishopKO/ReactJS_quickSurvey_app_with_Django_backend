import React, { useReducer, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import editReducer from './editReducer';
import styled from 'styled-components';
import AnswerTypeButtons from '../Atoms/answerTypeButtons';
import { Form, Button, ButtonGroup } from 'react-bootstrap';
import { sendQueryUsingTokens } from '../../utils/jwt';
import BackButtonComponent from '../Atoms/BackButton';

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

const TopBarWrapper = styled.div`
  display: grid;
  justify-content: center;  
  max-width: inherit;  
  grid-template-columns: 80% 20% ;  
  margin-top: 20px;  
  font-size: 4px;
  border-bottom: 1px solid lightgrey;
  padding-bottom: 5px
`;

const TopBarButtonsWrapper = styled.div`
  display: flex;  
  flex-direction: row;
  justify-content: flex-end;  
`;


const EditSurvey = () => {
    const [state, dispatch] = useReducer(editReducer, { title: '', questions: [] });
    const { id } = useParams();

    useEffect(() => {
        sendQueryUsingTokens('edit_survey', { request: 'GET_SURVEY_DATA', survey_id: id }).then(response => {
            const surveyData = response.data;
            dispatch({ type: 'UPDATE_DATA', payload: surveyData });
        });
    }, [id]);

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
            history.push('/list');
        }).catch(error => console.log(error));
    };

    const handleAnswerType = (index, type) => {
        dispatch({ type: 'SET_ANSWER_TYPE', payload: { index: index, type: type } });
    };

    const handleClear = () => {
        dispatch({ type: 'CLEAR' });
    };

    return (
        <MainWrapper>
            <BackButtonComponent text={'Cancel and Go Back'}/>
            <TopBarWrapper>
                <Form.Control type="text" size="sm" placeholder="Title" style={{ width: '80%', fontWeight: 'bold' }}
                              onChange={(element) => handleChangeTitle(element)} value={state.title}/>
                <TopBarButtonsWrapper>
                    <Button variant="outline-success" size="sm" className="mx-1"
                            onClick={() => handleSave()}>Save</Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleClear()}>Clear</Button>
                </TopBarButtonsWrapper>
            </TopBarWrapper>
            <Form>
                {state.questions.map((item, index) => {
                    return (
                        <Form.Group className="mt-3" key={`question_${index}`}>
                            <Form.Label style={{ fontWeight: 'bold' }}>Question {index + 1}:</Form.Label>
                            <Form.Control type="text" value={item.question} name={index}
                                          onChange={(element) => handleChangeQuestion(element, index)}/>
                            <ButtonGroup className=" mt-1">
                                {item.hasOwnProperty('answers') ?
                                    <Button variant="outline-success" size="sm"
                                            onClick={() => handleRemoveAnswers(index)}>Remove answers</Button>
                                    :
                                    <Button variant="success" size="sm"
                                            onClick={() => handleAddAnswers(index)}>Add answers</Button>

                                }
                                <Button variant="danger" size="sm"
                                        onClick={() => handleRemove(index)}>Delete</Button>
                            </ButtonGroup>
                            {item.hasOwnProperty('answers') &&
                            <Form.Group className="mt-1">
                                <AnswerTypeButtons index={index} select={item.type} action={handleAnswerType}/>
                                <Form.Label>Possible answers:</Form.Label>


                                <Form.Control as="textarea" rows={3} value={item.answers}
                                              onChange={(element) => handleChangeAnswers(element, index)}/>


                            </Form.Group>
                            }
                        </Form.Group>

                    );
                })
                }

            </Form>
            <Button variant="primary" className="mt-3" onClick={handleAddQuestion}>Add +</Button>
        </MainWrapper>
    );
};

export default EditSurvey;