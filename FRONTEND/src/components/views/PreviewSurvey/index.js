import React, { useEffect, useState } from 'react'
import BackButtonComponent from '../../Atoms/BackButton'
import { useParams } from 'react-router'
import { sendQueryUsingTokens } from '../../../utils/jwt'
import { MainWrapper, AnswersWrapper } from './styledComponents'
import { AlertStyle, ButtonStyle, FormLabelStyle } from './styles'
import { Button, Form, Alert, InputGroup } from 'react-bootstrap'

import SurveyTemplate from '../../../templates/SurveyTemplate'


const PreviewSurvey = () => {
    const { id } = useParams()
    const [surveyData, setSurveyData] = useState({})

    useEffect(() => {
        sendQueryUsingTokens('edit_survey', { request: 'GET_SURVEY_DATA', survey_id: id })
            .then(response => {
                console.log(response.data)
                setSurveyData(response.data)
            })
    }, [id])

    if (surveyData.hasOwnProperty('questions')) {
        return (
            <SurveyTemplate>
                <BackButtonComponent/>
                <Alert variant="dark" style={AlertStyle}>{surveyData.title}</Alert>
                <Form>
                    {surveyData.questions.map((item, index) => {
                        return (
                            <Form.Group className={index === 0 ? 'mt-1' : 'mt-5'}
                                        key={`question_${index}`}>
                                <Form.Label style={FormLabelStyle}><p>{item.question}:</p></Form.Label>
                                {item.hasOwnProperty('answers') &&
                                <AnswersWrapper>
                                    <small>{item.type === 'single' ? '(select one)' : '(select multi)'}</small>
                                    {item.answers.split('\n').map((item, index) => {
                                        return (
                                            <InputGroup key={`answer_${index}`}>
                                                <InputGroup.Checkbox/>

                                                <Form.Control type="textarea" value={item}
                                                              readOnly/>

                                            </InputGroup>
                                        )
                                    })}
                                </AnswersWrapper>
                                }
                                {!item.hasOwnProperty('answers') &&
                                <InputGroup>
                                    <Form.Control/>
                                </InputGroup>
                                }
                            </Form.Group>
                        )
                    })
                    }
                </Form>
                <Button style={ButtonStyle}>Submit</Button>
            </SurveyTemplate>
        )
    } else {
        return (
            <div>
            </div>
        )
    }
}
export default PreviewSurvey