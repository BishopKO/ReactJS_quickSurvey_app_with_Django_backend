import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, useParams, useHistory, Redirect } from 'react-router-dom';
import LoginPage from './LoginPage';
import Registration from './Registration';
import EditSurvey from '../components/EditSurvey/EditSurvey';
import SurveysList from '../components/SurveysList/SurveysList';
import PreviewSurvey from '../components/PreviewSurvey/PreviewSurvey';
import PublishedSurvey from '../components/PublishedSurvey/PublishedSurvey';
import { connect } from 'react-redux';

import NavbarTemplate from '../components/MainTemplate/NavbarTemplate';

import CreateSurvey from '../components/CreateSurvey/CreateSurvey';

// TODO: REDIRECT TO LIST VIEW AFTER CLOSED BROWSER
const MainRoutingView = ({ loggedIn }) => {

    const location_pathname = window.location.pathname;

    if (location_pathname.search('/survey') !== -1) {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/survey/:id" component={PublishedSurvey}/>
                </Switch>
            </BrowserRouter>
        );
    } else {
        return (
            <BrowserRouter>
                <Switch>
                    {loggedIn ?
                        <>
                            <Route exact path="/edit/:id">
                                <NavbarTemplate>
                                    <EditSurvey/>
                                </NavbarTemplate>
                            </Route>
                            <Route exact path="/survey_preview/">
                                <NavbarTemplate>
                                    <PreviewSurvey/>
                                </NavbarTemplate>
                            </Route>
                            <Route exact path="/list">
                                <NavbarTemplate>
                                    <SurveysList/>
                                </NavbarTemplate>
                            </Route>
                            <Route exact path="/create_survey">
                                <NavbarTemplate>
                                    <CreateSurvey/>
                                </NavbarTemplate>
                            </Route>
                        </>
                        :
                        <>
                            <Route exact path="/login">
                                <NavbarTemplate>
                                    <LoginPage/>
                                </NavbarTemplate>
                            </Route>
                            <Route exact path="/registration">
                                <NavbarTemplate>
                                    <Registration/>
                                </NavbarTemplate>
                            </Route>
                        </>
                    }
                </Switch>
                {loggedIn ? <Redirect to="/list"/> : <Redirect to="/login"/>}

            </BrowserRouter>
        );
    }
};

const mapStateToProps = () => {
    const localStorageLoggedIn = localStorage.loggedIn;

    if (localStorageLoggedIn) {
        return { loggedIn: true };
    } else {
        return { loggedIn: false };
    }
};


export default connect(mapStateToProps, null)(MainRoutingView);
