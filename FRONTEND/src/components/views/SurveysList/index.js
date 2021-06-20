import React, { useEffect, useState } from 'react';
import SurveyLinkModal from './SurveyLinkModal';
import DeleteSurveyModal from './DeleteSurveyModal';

import { sendQueryUsingTokens } from '../../../utils/jwt';
import { useHistory } from 'react-router';

import { ListGroup, Button, ButtonGroup, Form } from 'react-bootstrap';
import { SurveyWrapper, TopWrapper, ButtonsWrapper } from './styledComponents';
import { DateStyle } from './styles';

const SurveysList = () => {
    const [surveysList, setSurveysList] = useState([]);
    const [showModalLink, setShowModalLink] = useState({ show: false, link: '' });
    const [showModalDelete, setShowModalDelete] = useState({ show: false, id: '' });
    const history = useHistory();

    useEffect(() => {
        sendQueryUsingTokens('surveys_list', {
            order: '-date',
        }).then(response => {
            setSurveysList(response.data['surveys_list']);
        }).catch(error => console.log(error));
    }, []);

    const handleSetActive = (id) => {
        sendQueryUsingTokens('edit_survey', { request: 'SET_ACTIVE', survey_id: id })
            .then(() => window.location.reload());
    };

    const handleDeleteSurveyAction = (id) => {
        sendQueryUsingTokens('edit_survey', { request: 'DELETE_SURVEY', survey_id: id }).then(() => {
            window.location.reload();
        });
    };

    const showLinkModal = (id) => {
        setShowModalLink({ show: true, link: id });
    };

    const handleCloseLinkModal = () => {
        setShowModalLink(showModalLink.show = false);
    };

    const handleShowDeleteModal = (id) => {
        setShowModalDelete({ show: true, id: id });
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
        }
    };


    if (surveysList.length > 0) {
        return (
            <>
                <SurveyLinkModal show={showModalLink.show} link={showModalLink.link}
                                 closeAction={handleCloseLinkModal}/>
                <DeleteSurveyModal show={showModalDelete.show} surveyId={showModalDelete.id}
                                   closeAction={handleCloseDeleteModal}
                                   deleteAction={() => handleDeleteSurveyAction(showModalDelete.id)}/>
                <>
                    {surveysList.map((item, index) => {
                        return (
                            <SurveyWrapper key={`survey_${index}`}>
                                <TopWrapper>
                                    <span style={DateStyle}>{item.date}</span>
                                    <Form.Check type="checkbox" onChange={() => handleSetActive(item.id)}
                                                label="active" checked={item.active}/>
                                </TopWrapper>
                                <ListGroup>
                                    <ListGroup.Item variant="secondary">{item.title}</ListGroup.Item>
                                </ListGroup>
                                <ButtonsWrapper>
                                    <ButtonGroup>
                                        <Button onClick={() => handleRedirect('results', item.id)} size='sm'
                                                variant='outline-success'>Results</Button>
                                        <Button onClick={() => handleRedirect('preview', item.id)}
                                                size="sm"
                                                variant="outline-dark">Preview</Button>
                                        <Button onClick={() => handleRedirect('edit', item.id)} size='sm'
                                                variant='outline-primary'>Edit</Button>
                                        <Button onClick={() => showLinkModal(item.id)} size="sm"
                                                variant="outline-secondary">Link</Button>
                                    </ButtonGroup>
                                    <Button onClick={() => handleShowDeleteModal(item.id)} size="sm"
                                            variant="outline-danger">Delete</Button>
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
                <Button onClick={() => history.push('/create_survey')} variant="success">Create new</Button>
            </>
        );
    }
};

export default SurveysList;
