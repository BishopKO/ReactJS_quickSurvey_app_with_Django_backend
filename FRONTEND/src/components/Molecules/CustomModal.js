import React from 'react';
import Button from '../Atoms/Button';
import { Modal } from 'react-bootstrap';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  .modal-dialog{
    width: 900px;
  }
`;

const DialogStyle = {
    width: '100%',
    height: '100%',
};

const CustomModal = ({ show, closeAction, submitAction }) => {
    return (
        <StyledWrapper>
            <Modal show={show} onHide={() => closeAction()}>
                <Modal.Dialog style={DialogStyle}>
                    <Modal.Header closeButton>
                        <Modal.Title>Submit survey?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <span>Do You want to submit answers?</span>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => submitAction()} color="green" variant='success' size='sm'>Submit</Button>
                        <Button onClick={() => closeAction()} color="red" size='sm'>Cancel</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        </StyledWrapper>
    );
};

export default CustomModal;