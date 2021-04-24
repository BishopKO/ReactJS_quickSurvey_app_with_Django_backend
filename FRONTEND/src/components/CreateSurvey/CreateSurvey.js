import React, { useReducer } from 'react';
import { useHistory } from 'react-router';
import createReducer from './createReducer';
import styled from 'styled-components';
import { Form, Button, ButtonGroup } from 'react-bootstrap';
import { sendQueryUsingTokens } from '../../utils/jwt';

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
  margin-top: 5px;  
  font-size: 4px;
`;

const TopBarButtonsWrapper = styled.div`
  display: flex;  
  flex-direction: row;
  justify-content: flex-end;  
`;


const CreateSurvey = () => {
    const history = useHistory();

    const initState = { title: '', questions: [{ question: '' }] };
    const [state, dispatch] = useReducer(createReducer, initState);

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
        console.log(state);

        sendQueryUsingTokens('create_survey', { data: state }).then(() => {
            history.push('/list');
        }).catch(error => console.log(error));
    };

    const handleClear = () => {
        dispatch({ type: 'CLEAR' });
    };

    return (
        <MainWrapper>
            <TopBarWrapper>
                <Form.Control type="text" size="sm" placeholder="Title" style={{ width: '60%' }}
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

export default CreateSurvey;