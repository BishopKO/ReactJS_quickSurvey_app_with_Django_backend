import React from 'react';
import { Navbar } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Button from '../../Atoms/Button';
import styled from 'styled-components';


const StyledBrand = styled.span`
  font-family: 'Rajdhani', sans-serif;
  font-style: italic;
  font-size: 25px;
  color: ${({ theme }) => theme.yellow};
`;

const StyledNav = styled.nav`
  display: flex; 
  width: 100%;
  
  @media (min-width: 300px){
    flex-direction: column;
    
    button{     
     width: 100%;
     background-color: transparent;
     margin-top: 5px;
    }
  }  
  
  @media (min-width: 576px){  
   flex-direction: row;  
   justify-content: flex-end;
   
   button{   
    width: fit-content;
    background-color: transparent;
    margin-right: 5px;   
   }
  }
  

`;

const CustomNavbar = ({ loggedIn }) => {
    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        localStorage.removeItem('loggedIn');
        history.push('/login');
    };

    const handleCreate = () => {
        history.push('/create_survey');
    };

    const mainView = () => {
        history.push('/');
    };

    return (
        <Navbar variant="dark" bg="dark" expand="sm" style={{ padding: 3 }}>
            <Navbar.Brand href="/"><StyledBrand>quickSurvey</StyledBrand></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                {loggedIn ?
                    <StyledNav>
                        <Button text="Main View" color="green" type="outline" action={mainView}/>
                        <Button text="Create New" color="yellow" type="outline" action={handleCreate}/>
                        <Button text="Logout" color="blue" type="outline" action={handleLogout}/>
                    </StyledNav>
                    :
                    <StyledNav>
                        <Button variant=" outline-warning" onClick={() => history.push('/registration')}
                                size=" sm" className=" mx-1">Register</Button>
                        <Button variant='outline-success' onClick={() => history.push('/login')}
                                size=" sm" className=" mx-1">Login</Button>
                    </StyledNav>
                }
            </Navbar.Collapse>
        </Navbar>
    );
};

export default CustomNavbar;