import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SurveyLinkModal from './SurveyLinkModal';
import DeleteSurveyModal from './DeleteSurveyModal';
import Button from '../../Atoms/Button';
import { useHistory } from 'react-router';
import { getSurveysList, activateSurvey, deleteSurvey } from '../../../utils/jwt';
import { ListGroup, Form } from 'react-bootstrap';
import { SurveyWrapper, TopWrapper, ButtonsWrapper } from './styledComponents';
import { DateStyle } from './styles';
import Spinner from '../../Atoms/Spinner';

const StyledButtonsGroup = styled.div`
  display: flex;
  width: fit-content; 
  overflow: hidden;
  button{
    margin-right: 3px;
  }
`;

const SurveysList = () => {
    const [surveysList, setSurveysList] = useState([]);
    const [showModalLink, setShowModalLink] = useState({ show: false, link: '' });
    const [showModalDelete, setShowModalDelete] = useState({ show: false, survey_id: null });
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        (async () => {
            const surveys = await getSurveysList();
            setSurveysList(surveys);
            setLoading(false);
        })();
    }, []);

    const handleSetActive = async (id, isActive) => {
        await activateSurvey(id, !isActive);
        window.location.reload();
    };

    const handleDeleteSurvey = async () => {
        await deleteSurvey(showModalDelete.survey_id);
        window.location.reload();
    };

    const showLinkModal = (id) => {
        setShowModalLink({ show: true, link: id });
    };

    const handleCloseLinkModal = () => {
        setShowModalLink(false);
    };

    const handleShowDeleteModal = (survey_id) => {
        setShowModalDelete({ show: true, survey_id: survey_id });
    };

    const handleCloseDeleteModal = () => {
        setShowModalDelete(false);
    };

    const handleRedirect = (view, id) => {
        switch (view) {
            case 'results':
                history.push(`/results/${id}`);
                break;
            case 'preview':
                history.push(`/preview/${id}`);
                break;
            case 'edit':
                history.push(`/edit/${id}`);
                break;
            default:
                break;
        }
    };
    if (loading) {
        return (
            <Spinner/>
        );
    }

    if (surveysList.length > 0) {
        return (
            <>
                <SurveyLinkModal show={showModalLink.show} link={showModalLink.link}
                                 closeAction={handleCloseLinkModal}/>

                <DeleteSurveyModal show={showModalDelete.show}
                                   closeAction={handleCloseDeleteModal}
                                   deleteAction={handleDeleteSurvey}
                />
                <>
                    {surveysList.map((item, index) => {
                        return (
                            <SurveyWrapper key={`survey_${index}`}>
                                <TopWrapper>
                                    <span style={DateStyle}>{item.date}</span>

                                    <Form.Check type="checkbox"
                                                onChange={() => handleSetActive(item.survey_id, item.isActive)}
                                                label="active" checked={item.isActive}/>
                                </TopWrapper>
                                <ListGroup>
                                    <ListGroup.Item variant="secondary"
                                                    style={{ wordBreak: 'break-word', fontWeight: 'bold' }}>
                                        {item.survey_title}
                                    </ListGroup.Item>
                                </ListGroup>
                                <ButtonsWrapper>
                                    <StyledButtonsGroup>
                                        <Button text="Results" color="green" type="outline"
                                                action={() => handleRedirect('results', item.survey_id)}/>
                                        <Button text="Preview" color="yellow" type="outline"
                                                action={() => handleRedirect('preview', item.survey_id)}/>
                                        <Button text="Edit" color="blue" type="outline"
                                                action={() => handleRedirect('edit', item.survey_id)}/>
                                        <Button text="Link" color="grey" type="outline"
                                                action={() => showLinkModal(item.survey_id)}/>
                                    </StyledButtonsGroup>
                                    <Button text="Delete" color="red" type="outline"
                                            action={() => handleShowDeleteModal(item.survey_id)}/>

                                </ButtonsWrapper>
                            </SurveyWrapper>
                        );
                    })}
                </>
            </>
        );
    } else {
        return (
            <>
                <Button action={() => history.push('/create_survey')} color="green" variant="submit">Create new</Button>
            </>
        );
    }
};

export default SurveysList;
