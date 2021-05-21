import React, { useEffect } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
import { AnswerStyle, QuestionStyle, CardHeaderStyle, CardStyle } from './stylesMobile';

const MobileView = ({ surveyAnswers }) => {

    useEffect(() => {
        console.log(surveyAnswers);
    });

    return (
        <Accordion>
            {surveyAnswers.map((answers, index) => {
                return (
                    <Card style={CardStyle}>
                        <Card.Header style={CardHeaderStyle}>
                            <Accordion.Toggle as={Button} variant="link" eventKey={index + 1}>
                                {`Answers ${index + 1}`}
                            </Accordion.Toggle>
                        </Card.Header>
                        {answers.map((item) => {
                            return (
                                <Accordion.Collapse eventKey={index + 1}>
                                    <Card.Body>
                                        <span style={QuestionStyle}>{item.question}</span>
                                        {item.answer.split('\n').map(item => {
                                            return (
                                                <p style={AnswerStyle}>{item}</p>
                                            );
                                        })}
                                    </Card.Body>
                                </Accordion.Collapse>
                            );
                        })}
                    </Card>
                );
            })}
        </Accordion>


    );
};

export default MobileView;


