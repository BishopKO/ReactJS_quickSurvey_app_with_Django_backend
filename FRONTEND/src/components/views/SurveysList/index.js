import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SurveyLinkModal from './SurveyLinkModal';
import DeleteSurveyModal from './DeleteSurveyModal';

import { sendQueryUsingTokens } from '../../../utils/jwt';
import { useHistory } from 'react-router';
import Button from '../../Atoms/Button';

import { ListGroup, ButtonGroup, Form } from 'react-bootstrap';
import { SurveyWrapper, TopWrapper, ButtonsWrapper } from './styledComponents';
import { DateStyle } from './styles';

const StyledButtonsGroup = styled.div`
  display: flex;
  width: fit-content;
  //border: 1px solid grey;
  
  overflow: hidden;
  button{
    margin-right: 3px;
  }

`;

const SurveysList = () => {
    const [surveysList, setSurveysList] = useState([]);
    const [showModalLink, setShowModalLink] = useState({ show: false, link: '' });
    const [showModalDelete, setShowModalDelete] = useState({ show: false, id: '' });
    const history = useHistory();

    useEffect(() => {
        sendQueryUsingTokens('surveys_list', {
            order: '-date',
        }).then(data => {
            setSurveysList(data['surveys_list']);
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
                                    <ListGroup.Item variant="secondary"
                                                    style={{ fontWeight: 'bold' }}>{item.title}</ListGroup.Item>
                                </ListGroup>
                                <ButtonsWrapper>
                                    <StyledButtonsGroup>
                                        <Button text="Results" color="green" type="outline"
                                                action={() => handleRedirect('results', item.id)}/>
                                        <Button text="Preview" color="yellow" type="outline"
                                                action={() => handleRedirect('preview', item.id)}/>
                                        <Button text="Edit" color="blue" type="outline"
                                                action={() => handleRedirect('edit', item.id)}/>
                                        <Button text="Link" color="grey" type="outline"
                                                action={() => showLinkModal(item.id)}/>
                                    </StyledButtonsGroup>
                                    <Button text="Delete" color="red" type="outline"
                                            action={() => handleShowDeleteModal(item.id)}/>

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
