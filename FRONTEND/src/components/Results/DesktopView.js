import React, { useReducer, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import BackButtonChart from '../Atoms/BackButtonWithLinkToChart';
import { ListGroup } from 'react-bootstrap';
import { Wrapper, AnswersWrapper, AnswerWrapper } from './styledComponents';
import {
    ListGroupStyle,
    ListGroupItemActiveStyle,
    ListGroupItemStyle,
    AnswerStyle,
    QuestionStyle,
} from './stylesDesktop';

const DesktopView = ({ textResults, chartResults }) => {
    const { id } = useParams();
    const [view, setView] = useState('text');
    const [activeItem, setActiveItem] = useState(null);

    useEffect(() => {
        console.log('chart', chartResults);
    }, [view]);


    const handleSelectAnswer = (index) => {
        setActiveItem(index);
    };

    const handleChangeView = () => {
        if (view === 'text') {
            setView('chart');
        } else if (view === 'chart') {
            setView('text');
        }
    };

    return (
        <div>
            <BackButtonChart action={handleChangeView} view={view} active={view === 'chart'}/>
            {view === 'text' &&
            <Wrapper>
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
            </Wrapper>
            }
            {view === 'chart' && <div>
                {Object.values(chartResults).map(item => {
                    return (
                        <p>{item.question}</p>
                    );
                })}
            </div>}
        </div>
    );


};

export default DesktopView;
