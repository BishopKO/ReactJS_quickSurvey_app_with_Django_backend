import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import CustomNavbar from '../Navbar/Navbar';
import LoginPage from '../../views/LoginPage';
import Registration from '../../views/Registration';
import EditSurvey from '../EditSurvey/EditSurvey';
import Main from '../../views/Main';
import SurveysList from '../SurveysList/SurveysList';
import { connect } from 'react-redux';

import CreateSurvey from '../CreateSurvey/CreateSurvey';


const MainTemplate = ({ loggedIn }) => {

    return (
        <BrowserRouter>
            <Container>
                <CustomNavbar/>
                <Switch>
                    <Route exact path="/login">
                        <LoginPage/>
                    </Route>
                    <Route exact path="/registration">
                        <Registration/>
                    </Route>
                    {loggedIn ?
                        <>
                            <Route path="/edit/:id">
                                <EditSurvey/>
                            </Route>
                            <Route exact path="/main">
                                <Main/>
                            </Route>
                            <Route exact path="/list">
                                <SurveysList/>
                            </Route>
                            <Route exact path="/create_survey">
                                <CreateSurvey/>
                            </Route>
                        </>
                        :
                        <Route>
                            <LoginPage/>
                        </Route>
                    }
                </Switch>
            </Container>
        </BrowserRouter>
    );
};

const mapStateToProps = () => {
    const localStorageLoggedIn = localStorage.loggedIn;

    if (localStorageLoggedIn) {
        return { loggedIn: true };
    } else {
        return { loggedIn: false };
    }
};


export default connect(mapStateToProps, null)(MainTemplate);
