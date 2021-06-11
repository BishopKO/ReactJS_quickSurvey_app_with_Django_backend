import React, { useState } from 'react';
import TickAnswer from '../../Molecules/TickAnswer';


const QuestionMultiAnswer = ({ type, question, answers }) => {
    const [singleChecked, setSingleChecked] = useState(null);
    const [multiChecked, setMultiChecked] = useState(Array(answers.length).fill(false));

    const handleCheckedMulti = (index) => {
        let tmpState = multiChecked;
        tmpState[index] = !tmpState[index];
        setMultiChecked(tmpState);
    };

    if (type === 'single') {
        return (
            <>
                <p>{question}</p>
                {answers.map((item, index) => {
                    return (
                        <TickAnswer checked={index === singleChecked} setChecked={() => setSingleChecked(index)}>
                            {item}
                        </TickAnswer>
                    );
                })}
            </>
        );
    } else if (type === 'multi') {
        return (
            <>
                <p>{question}</p>
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