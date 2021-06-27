import React from 'react';
import Button from '../../Atoms/Button';
import { Modal } from 'react-bootstrap';

const ConfirmSaveModal = ({ show, closeAction, submitAction }) => {
    return (
        <>
            <Modal show={show} onHide={() => closeAction()}>
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>Save as a new survey?</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button action={() => submitAction()} color="green" size="big">Save</Button>
                        <Button action={() => closeAction()} color="red" size="big">Cancel</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        </>
    );
};

export default ConfirmSaveModal;