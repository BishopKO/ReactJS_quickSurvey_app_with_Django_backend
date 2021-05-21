import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { sendQueryUsingTokens } from '../../utils/jwt';
import DesktopView from './DesktopView';
import MobileView from './MobileView';

const Results = () => {
    const location = useLocation();
    const survey_id = location.state.survey_id;
    const [surveyAnswers, setSurveyAnswers] = useState([]);
    const [view] = useState(window.innerWidth >= 550 ? 'desktop' : 'mobile');


    useEffect(() => {
        sendQueryUsingTokens('get_results', { survey_id: survey_id }).then(resp => {
            setSurveyAnswers(resp.data.survey_results);
        }).catch(err => console.log(err));
    }, [survey_id]);


    if (surveyAnswers.length > 0) {
        return (
            <div>
                {view === 'mobile' && <MobileView surveyAnswers={surveyAnswers}/>}
                {view === 'desktop' && <DesktopView surveyAnswers={surveyAnswers}/>
                }
            </div>
        );
    } else {
        return (<>Error Page</>);
    }
};

export default Results;