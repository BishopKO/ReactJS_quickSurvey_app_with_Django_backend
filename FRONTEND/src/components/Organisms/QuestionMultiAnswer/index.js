import React, { useEffect } from 'react';
import useState from 'react-usestateref';
import TickAnswer from '../../Molecules/TickAnswer';
import styled from 'styled-components';


const StyledParagraph = styled.p`
  font-weight: bold; 
  margin:0;
`;


const QuestionMultiAnswer = ({ type, number, question, answers, stateAction }) => {
    const [singleChecked, setSingleChecked, singleRef] = useState(null);
    const [multiChecked, setMultiChecked, multiRef] = useState(Array(answers.length).fill(false));

    const handleCheckedSingle = (index) => {
        setSingleChecked(index);
        stateAction({ number: number, state: singleRef.current });
    };

    const handleCheckedMulti = (index) => {
        let tmpState = multiChecked;
        tmpState[index] = !tmpState[index];
        setMultiChecked(tmpState);
        stateAction({ number: number, state: multiRef.current });
    };


    if (type === 'single') {
        return (
            <>
                <StyledParagraph>{question}</StyledParagraph>
                <small>(select one)</small>
                {answers.map((item, index) => {
                    return (
                        <TickAnswer checked={index === singleChecked} setChecked={() => handleCheckedSingle(index)}>
                            {item}
                        </TickAnswer>
                    );
                })}
            </>
        );
    } else if (type === 'multi') {
        return (
            <>
                <StyledParagraph>{question}</StyledParagraph>
                <small>(select multi)</small>
                {answers.map((item, index) => {
                    return (
                        <TickAnswer setChecked={() => handleCheckedMulti(index)}>
                            {item}
                        </TickAnswer>
                    );
                })}
            </>
        );
    }
};

export default QuestionMultiAnswer;