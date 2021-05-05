import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const host = '127.0.0.1:3000';

const SurveyLinkModal = ({ show, link, closeAction }) => {

    const handleCopy = () => {
        navigator.clipboard.writeText(`http://${host}/survey/${link}`);
        closeAction();
    };

    return (
        <>
            <Modal show={show} onHide={() => closeAction()}>
                <Modal.Dialog>
                    <Modal.Header closeButton> </Modal.Header>
                    <Modal.Body>
                        {`http://${host}/survey/${link}`}
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
