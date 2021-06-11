import React from 'react'
import { connect } from 'react-redux'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import store from '../../../reducer/store'

const StyledBrand = styled.span`
  font-family: Arimo;
  font-style: italic;
  text-shadow: 1px 1px green;
`

const CustomNavbar = ({ loggedIn }) => {
    const history = useHistory()

    const handleLogout = () => {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        localStorage.removeItem('loggedIn')
        store.dispatch({ type: 'LOGOUT', payload: 'SUCCESS' })
        history.push('/login')
    }

    const handleCreate = () => {
        history.push('/create_survey')
    }

    return (
        <Navbar variant="dark" bg="dark" expand="sm" style={{ padding: '5px' }}>
            <Navbar.Brand href="/list"><StyledBrand>quickSurvey</StyledBrand></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                {loggedIn ?
                    <Nav>
                        <Button variant="outline-secondary" onClick={() => history.push('/list')}
                                size="sm" className="mx-1">Main View</Button>
                        <Button variant="outline-success" onClick={handleCreate} role="link" size="sm"
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
    )
}

const mapStateToProps = () => {
    const localStorageLoggedIn = localStorage.loggedIn

    if (localStorageLoggedIn) {
        return { loggedIn: true }
    } else {
        return { loggedIn: false }
    }
}

export default connect(mapStateToProps, null)(CustomNavbar)