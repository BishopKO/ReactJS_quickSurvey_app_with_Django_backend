import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const SurveyLinkModal = ({ show, closeAction, deleteAction, surveyId }) => {
    return (
        <>
            <Modal show={show} onHide={() => closeAction()}>
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete survey?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <span>Are You sure You want to delete survey?</span>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => closeAction()} variant='success' size='sm'>Cancel</Button>
                        <Button onClick={() => deleteAction(surveyId)} variant='danger' size='sm'>Delete</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        </>
    );
};

export default SurveyLinkModal;
