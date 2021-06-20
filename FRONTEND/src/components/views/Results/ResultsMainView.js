import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { sendQueryUsingTokens } from '../../../utils/jwt';
import DesktopView from './Desktop/DesktopView';
import MobileView from './Mobile/MobileView';


const ResultsMainView = () => {
    const { id } = useParams();
    const [textAnswers, setTextAnswers] = useState([]);
    const [chartAnswers, setChartAnswers] = useState([]);
    const [error, setError] = useState(null);
    const [view] = useState(window.innerWidth >= 550 ? 'desktop' : 'mobile');


    useEffect(() => {
        console.log(id);
        sendQueryUsingTokens('get_results', { survey_id: id }).then(resp => {
            console.log(resp.data);
            if (Object(resp.data).hasOwnProperty('error')) {
                setError(resp.data.error);
            } else {
                setTextAnswers(resp.data['text_results']);
                setChartAnswers(resp.data['chart_results']);
            }
        }).catch(err => console.log(err));
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
        return (<>{error}</>);
    }
};

export default ResultsMainView;