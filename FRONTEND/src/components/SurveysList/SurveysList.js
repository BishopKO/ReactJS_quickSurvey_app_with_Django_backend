import React, { useEffect, useState } from 'react';
import { ListGroup, Button, ButtonGroup, Form } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { sendQueryUsingTokens } from '../../utils/jwt';
import SurveyLinkModal from './SurveyLinkModal';
import DeleteSurveyModal from './DeleteSurveyModal';
import styled from 'styled-components';

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 700px;
  margin: 30px auto;
  justify-content: center;  
  border: 1px solid lightgrey;
  padding: 5px;
  border-radius: 5px;
`;

const ButttonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 2px;   
`;

const TopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TestWrapper = styled.div`
  border: 1px solid grey;
  border-radius: 5px;
  padding: 5px;
  margin-top: 5px;
`;

const SurveysList = () => {
    const [surveysList, setSurveysList] = useState([]);
    const [showModalLink, setShowModalLink] = useState({ show: false, link: '' });
    const [showModalDelete, setShowModalDelete] = useState({ show: false, id: '' });
    const history = useHistory();


    useEffect(() => {
        sendQueryUsingTokens('surveys_list', {
            order: 'date',
        }).then(response => {
            setSurveysList(response.data);

        }).catch(error => console.log(error));
    }, []);

    const handleSetActive = (id) => {
        sendQueryUsingTokens('edit_survey', { request: 'SET_ACTIVE', survey_id: id })
            .then(() => window.location.reload());
    };

    const handleEdit = (id) => {
        history.push(`/edit/${id}`);
    };

    const handleDeleteSurveyAction = (id) => {
        sendQueryUsingTokens('edit_survey', { request: 'DELETE_SURVEY', survey_id: id }).then(response => {
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

    if (surveysList.length > 0) {
        return (
            <>
                <SurveyLinkModal show={showModalLink.show} link={showModalLink.link}
                                 closeAction={handleCloseLinkModal}/>
                <DeleteSurveyModal show={showModalDelete.show} surveyId={showModalDelete.id}
                                   closeAction={handleCloseDeleteModal}
                                   deleteAction={() => handleDeleteSurveyAction(showModalDelete.id)}/>
                <MainWrapper>
                    {surveysList.map((item, index) => {
                        return (
                            <TestWrapper key={`survey_${index}`}>
                                <TopWrapper>
                                    <span style={{ textAlign: 'center', fontWeight: 'bold' }}>{item.date}</span>
                                    <Form.Check type="checkbox" onChange={() => handleSetActive(item.id)}
                                                label="active" checked={item.active}/>
                                </TopWrapper>
                                <ListGroup>
                                    <ListGroup.Item variant="secondary">{item.title}</ListGroup.Item>
                                </ListGroup>
                                <ButttonsWrapper>
                                    <ButtonGroup>
                                        <Button size="sm" variant="outline-success">Results</Button>
                                        <Button size="sm" variant="outline-dark">View</Button>
                                        <Button onClick={() => handleEdit(item.id)} size="sm"
                                                variant="outline-primary">Edit</Button>
                                        <Button onClick={() => showLinkModal(item.id)} size="sm"
                                                variant="outline-secondary">Link</Button>
                                    </ButtonGroup>
                                    <Button onClick={() => handleShowDeleteModal(item.id)} size="sm"
                                            variant="outline-danger">Delete</Button>
                                </ButttonsWrapper>
                            </TestWrapper>
                        );
                    })}
                </MainWrapper>


            </>
        );
    } else {
        return (
            <MainWrapper>
                <Button onClick={() => history.push('/create_survey')} variant="success">Create new</Button>
            </MainWrapper>
        );
    }

};

export default SurveysList;
