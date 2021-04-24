import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const host = window.location.hostname.toString();

const SurveyLinkModal = ({ show, link, closeAction }) => {

    const handleCopy = () => {
        navigator.clipboard.writeText(`${host}${link}`);
        closeAction();
    };

    return (
        <>
            <Modal show={show} onHide={() => closeAction()}>
                <Modal.Dialog>
                    <Modal.Header closeButton> </Modal.Header>
                    <Modal.Body>
                        {`http://${host}/${link}`}
                    </Modal.Body>
                    <Modal.Footer style={{ justifyContent: 'center' }}>
                        <Button onClick={() => handleCopy()} variant='secondary' size='sm'>Copy to
                            clipboard</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        </>

    );

};

export default SurveyLinkModal;
