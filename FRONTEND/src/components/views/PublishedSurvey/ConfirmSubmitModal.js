import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const ConfirmSubmitModal = ({ show, closeAction, submitAction }) => {
    return (
        <>
            <Modal show={show} onHide={() => closeAction()}>
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>Submit survey?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <span>Do You want to submit answers?</span>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => submitAction()} variant='success' size='sm'>Submit</Button>
                        <Button onClick={() => closeAction()} variant='danger' size='sm'>Cancel</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        </>
    );
};

export default ConfirmSubmitModal;