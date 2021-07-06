import React from 'react';
import Button from '../../Atoms/Button';
import { Modal } from 'react-bootstrap';


const SurveyLinkModal = ({ show, closeAction, deleteAction }) => {
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
                        <Button action={() => closeAction()} color="green" size="big">Cancel</Button>
                        <Button action={deleteAction} color="red" size="big">Delete</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        </>
    );
};

export default SurveyLinkModal;
