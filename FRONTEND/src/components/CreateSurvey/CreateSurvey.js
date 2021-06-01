import React, { useReducer } from 'react'
import createReducer from './createReducer'
import BackButtonComponent from '../Atoms/BackButton'
import AnswerTypeButtons from '../Atoms/answerTypeButtons'
import { sendQueryUsingTokens } from '../../utils/jwt'
import { useHistory } from 'react-router'
import { Form, Button, ButtonGroup } from 'react-bootstrap'
import { TopBarButtonsWrapper, TopBarWrapper, MainWrapper } from './styledComponents'
import { FormLabelStyle, FormControlStyle } from './styles'


// TODO: Add button on the top

const CreateSurvey = () => {
    const history = useHistory()

    const initState = { title: '', questions: [{ question: '' }] }
    const [state, dispatch] = useReducer(createReducer, initState)

    const handleChangeTitle = (element) => {
        const title = element.target.value
        dispatch({ type: 'UPDATE_TITLE', payload: title })
    }

    const handleAddQuestion = () => {
        dispatch({ type: 'ADD_QUESTION' })
    }

    const handleRemove = (number) => {
        dispatch({ type: 'REMOVE_QUESTION', payload: number })
    }

    const handleChangeQuestion = (element, index) => {
        dispatch({ type: 'UPDATE_QUESTION', payload: [index, element.target.value] })
    }

    const handleChangeAnswers = (element, index) => {
        dispatch({ type: 'UPDATE_ANSWERS', payload: [index, element.target.value] })
    }

    const handleAddAnswers = (index) => {
        dispatch({ type: 'ADD_ANSWERS', payload: index })
    }

    const handleRemoveAnswers = (index) => {
        dispatch({ type: 'REMOVE_ANSWERS', payload: index })
    }

    const handleSave = () => {
        console.log(state)

        sendQueryUsingTokens('create_survey', { data: state }).then(() => {
            history.push('/list')
        }).catch(error => console.log(error))
    }

    const handleClear = () => {
        dispatch({ type: 'CLEAR' })
    }

    const handleAnswerType = (index, type) => {
        dispatch({ type: 'SET_ANSWER_TYPE', payload: { index: index, type: type } })
    }


    return (
        <MainWrapper>
            <BackButtonComponent text={'Cancel and Go Back'}/>
            <TopBarWrapper>
                <Form.Control type="text" size="sm" placeholder="Title" style={FormControlStyle}
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
                            <Form.Label style={FormLabelStyle}>Question {index + 1}:</Form.Label>
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
                                <AnswerTypeButtons index={index} select={'single'} action={handleAnswerType}/>
                                <Form.Label>Possible answers:</Form.Label>

                                <Form.Control as="textarea" rows={3} value={item.answers}
                                              onChange={(element) => handleChangeAnswers(element, index)}/>
                            </Form.Group>
                            }
                        </Form.Group>

                    )
                })
                }
            </Form>
            <Button variant="primary" className="mt-3" onClick={handleAddQuestion}>Add +</Button>
        </MainWrapper>
    )
}

export default CreateSurvey