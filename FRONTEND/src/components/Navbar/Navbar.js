import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

const StyledBrand = styled.span`
  font-family: Arimo;
`;

const CustomNavbar = ({ logoutAction, loggedIn }) => {
    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        localStorage.removeItem('loggedIn');
        logoutAction();
        history.push('/login');
    };

    return (
        <Navbar variant="dark" bg="dark" expand="sm" style={{ padding: '5px' }}>
            <Navbar.Brand href="#home"><StyledBrand>quickSurvey</StyledBrand></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                {loggedIn ?
                    <Nav>
                        <Button variant="outline-success" onClick={handleLogout} role="link" size="sm"
                                className="mx-1">Create +</Button>
                        <Button variant="outline-primary" onClick={handleLogout} role="link" size="sm"
                                className="mx-1">Logout</Button>
                    </Nav>
                    :
                    <Nav>
                        <Button variant="outline-warning" onClick={() => history.push('/registration')}
                                size="sm" className="mx-1">Register</Button>
                        <Button variant='outline-success' onClick={() => history.push('/login')}
                                size="sm" className="mx-1">Login</Button>
                    </Nav>
                }
            </Navbar.Collapse>
        </Navbar>
    );
};


const mapStateToProps = (state) => {
    if (localStorage.getItem('loggedIn')) {
        state.loggedIn = true;
        return state;
    } else {
        return state;
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logoutAction: () => dispatch({ type: 'LOGOUT', payload: 'SUCCESS' }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomNavbar);