import React, { useRef } from 'react';
import styled from 'styled-components';
import { Modal, Button } from 'react-bootstrap';

const StyledInput = styled.input`
  border: none;
  width: 100%;
  :focus{
    outline: none;
  }
`;

const SurveyLinkModal = ({ show, link, closeAction }) => {
    const { REACT_APP_FRONTEND_ADDRESS: host } = process.env;

    const linkRef = useRef(null);

    const handleCopy = () => {
        linkRef.current.select();
        document.execCommand('copy');
        closeAction();
    };

    return (
        <>
            <Modal show={show} onHide={() => closeAction()}>
                <Modal.Dialog>
                    <Modal.Header closeButton> </Modal.Header>
                    <Modal.Body>
                        <StyledInput ref={linkRef} value={`${host}/survey/${link}`}/>
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
