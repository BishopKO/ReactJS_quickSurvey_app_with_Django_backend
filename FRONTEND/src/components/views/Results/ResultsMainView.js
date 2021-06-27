import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { sendQueryUsingTokens } from '../../../utils/jwt';
import DesktopView from './Desktop/DesktopView';
import MobileView from './Mobile/MobileView';


const ResultsMainView = () => {
    const { id } = useParams();
    const [textAnswers, setTextAnswers] = useState([]);
    const [chartAnswers, setChartAnswers] = useState([]);
    const [error, setError] = useState(false);
    const [view] = useState(window.innerWidth >= 550 ? 'desktop' : 'mobile');


    useEffect(() => {
        sendQueryUsingTokens('get_results', { survey_id: id })
            .then(data => {
                setTextAnswers(data['text_results']);
                setChartAnswers(data['chart_results']);
            })
            .catch(() => setError(true));
    }, [id]);

    if (!error) {
        return (
            <>
                {view === 'desktop' &&
                <DesktopView textResults={textAnswers} chartResults={chartAnswers}/>}
                {view === 'mobile' &&
                <MobileView textResults={textAnswers} chartResults={chartAnswers}/>}
            </>
        );
    } else {
        return (
            <div>upsssss.....</div>
        );
    }

};

export default ResultsMainView;