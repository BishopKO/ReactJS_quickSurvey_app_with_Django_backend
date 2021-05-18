import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from './LoginPage';
import Registration from './Registration';
import EditSurvey from '../components/EditSurvey/EditSurvey';
import SurveysList from '../components/SurveysList/SurveysList';
import PreviewSurvey from '../components/PreviewSurvey/PreviewSurvey';
import PublishedSurvey from '../components/PublishedSurvey/PublishedSurvey';
import SubmitSuccessPage from '../components/PublishedSurvey/SubmitSuccessPage';
import Results from '../components/Results/Results';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import NavbarTemplate from '../components/MainTemplate/NavbarTemplate';
import CreateSurvey from '../components/CreateSurvey/CreateSurvey';


const MainRoutingView = ({ loggedIn }) => {
    const location_pathname = window.location.pathname;

    if (location_pathname.search('/survey') !== -1) {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/survey/:id" component={PublishedSurvey}/>
                </Switch>
                <Switch>
                    <Route exact path="/survey_success" component={SubmitSuccessPage}/>
                </Switch>
            </BrowserRouter>

        );
    } else {
        return (
            <BrowserRouter>
                <Container>
                    <Switch>
                        {loggedIn ?
                            <NavbarTemplate>
                                <Route exact path="/edit/:id">
                                    <EditSurvey/>
                                </Route>
                                <Route exact path="/survey_preview/">
                                    <PreviewSurvey/>
                                </Route>
                                <Route exact path="/list">
                                    <SurveysList/>
                                </Route>
                                <Route exact path="/create_survey">
                                    <CreateSurvey/>
                                </Route>
                                <Route exact path="/results">
                                    <Results/>
                                </Route>
                            </NavbarTemplate>
                            :
                            <NavbarTemplate>
                                <Route exact path="/login">
                                    <LoginPage/>
                                </Route>
                                <Route exact path="/registration">
                                    <Registration/>
                                </Route>
                            </NavbarTemplate>
                        }
                    </Switch>
                    {!loggedIn && <Redirect to="/login"/>}
                </Container>
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
