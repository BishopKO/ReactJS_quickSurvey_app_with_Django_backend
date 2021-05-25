import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { sendQueryUsingTokens } from '../../utils/jwt';
import DesktopView from './DesktopView';
import MobileView from './MobileView';

const ResultsMainView = () => {
    const { id } = useParams();
    const [textAnswers, setTextAnswers] = useState([]);
    const [chartAnswers, setChartAnswers] = useState([]);
    const [view] = useState(window.innerWidth >= 550 ? 'desktop' : 'mobile');


    useEffect(() => {
        sendQueryUsingTokens('get_results', { survey_id: id }).then(resp => {
            console.log(resp.data);
            setTextAnswers(resp.data['text_results']);
            setChartAnswers(resp.data['chart_results']);
        }).catch(err => console.log(err));
    }, [id]);


    if (textAnswers.length > 0) {
        return (
            <div>
                {view === 'desktop' && <DesktopView textResults={textAnswers} chartResults={chartAnswers}/>}
                {view === 'mobile' && <MobileView textResults={textAnswers} chartResults={chartAnswers}/>}
            </div>
        );
    } else {
        return (<>Error Page</>);
    }
};

export default ResultsMainView;