import React, { useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import { Wrapper, AnswersWrapper, AnswerWrapper } from './styledComponents'
import {
    ListGroupStyle,
    ListGroupItemActiveStyle,
    ListGroupItemStyle,
    AnswerStyle,
    QuestionStyle,
} from './stylesDesktop'
import BackButtonChart from '../../Atoms/BackButtonWithLinkToChart'
import ChartDesktopView from './ChartDesktopView'

const DesktopView = ({ textResults, chartResults }) => {
    const [view, setView] = useState('text')
    const [activeItem, setActiveItem] = useState(null)


    const handleSelectAnswer = (index) => {
        setActiveItem(index)
    }

    const handleChangeView = () => {
        if (view === 'text') {
            setView('chart')
        } else if (view === 'chart') {
            setView('text')
        }
    }

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
                        )
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
                                    )
                                })}
                            </AnswerWrapper>
                        )
                    })
                    }
                </AnswersWrapper>
            </Wrapper>
            }
            {view === 'chart' &&
            <ChartDesktopView chartResults={chartResults} count={textResults.length}/>
            }
        </div>

    )


}

export default DesktopView
