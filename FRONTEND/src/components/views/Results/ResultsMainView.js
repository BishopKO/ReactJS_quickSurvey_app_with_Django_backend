import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getSurveyResults } from '../../../utils/jwt';
import DesktopView from './Desktop/DesktopView';
import MobileView from './Mobile/MobileView';


const ResultsMainView = () => {
    const { id } = useParams();
    const [textResults, setTextResults] = useState([]);
    const [chartResults, setChartResults] = useState([]);
    const [error, setError] = useState(false);
    const [view] = useState(window.innerWidth >= 550 ? 'desktop' : 'mobile');


    useEffect(() => {
        (async () => {
            const response = await getSurveyResults(id);
            if (response.status === 200) {
                const { textResults, chartResults } = response.data;
                setTextResults(textResults);
                setChartResults(chartResults);
            } else {
                setError(true);
            }
        })();
    }, [id]);

    if (!error) {
        return (
            <>
                {view === 'desktop' &&
                <DesktopView textResults={textResults} chartResults={chartResults}/>}
                {view === 'mobile' &&
                <MobileView textResults={textResults} chartResults={chartResults}/>}
            </>
        );
    } else {
        return (
            <div>Upsssss.....</div>
        );
    }

};

export default ResultsMainView;