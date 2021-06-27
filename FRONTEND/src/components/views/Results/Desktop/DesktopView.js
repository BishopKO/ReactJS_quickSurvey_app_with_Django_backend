import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ListGroup } from 'react-bootstrap';
import { StyledWrapper, AnswersWrapper, AnswerWrapper } from './styledComponents';
import {
    ListGroupStyle,
    ListGroupItemActiveStyle,
    ListGroupItemStyle,
    AnswerStyle,
    QuestionStyle,
} from './stylesDesktop';

import ChartDesktopView from './ChartDesktopView';

import Button from '../../../Atoms/Button';

const StyledTopbar = styled.div`
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;


const DesktopView = ({ textResults, chartResults }) => {
    const [activeItem, setActiveItem] = useState(null);
    const [view, setView] = useState('text');


    const handleSelectAnswer = (index) => {
        setActiveItem(index);
    };
    if (view === 'text') {
        return (<>
                <StyledTopbar>
                    <>
                        <Button color="yellow" text="Chart View" action={() => setView('chart')}/>
                    </>
                </StyledTopbar>

                <StyledWrapper>
                    <ListGroup style={ListGroupStyle}>
                        {textResults.map((item, index) => {
                            return (
                                <ListGroup.Item
                                    style={activeItem === index ? ListGroupItemActiveStyle : ListGroupItemStyle}
                                    onClick={() => handleSelectAnswer(index)}>{`Answers ${index + 1}`}
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup>

                    <AnswersWrapper>
                        {activeItem !== null &&
                        textResults[activeItem].map((item, index) => {
                            return (
                                <AnswerWrapper key={`answers_${index}`}>
                                    <span style={QuestionStyle}>{item.question}</span>
                                    {item.answer.split('\n').map(item => {
                                        return (
                                            <p style={AnswerStyle}>{item}</p>
                                        );
                                    })}
                                </AnswerWrapper>
                            );
                        })
                        }
                    </AnswersWrapper>
                </StyledWrapper>
            </>
        );
    } else {
        return (
            <>
                <StyledTopbar>
                    <>
                        <Button color="green" text="Text View" action={() => setView('text')}/>

                    </>
                </StyledTopbar>
                <ChartDesktopView chartResults={chartResults} counter={textResults.length}/>
            </>);
    }
};

export default DesktopView;
