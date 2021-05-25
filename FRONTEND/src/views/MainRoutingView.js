import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginPage from './LoginPage';
import Registration from './Registration';
import EditSurvey from '../components/EditSurvey/EditSurvey';
import SurveysList from '../components/SurveysList/SurveysList';
import PreviewSurvey from '../components/PreviewSurvey/PreviewSurvey';
import PublishedSurvey from '../components/PublishedSurvey/PublishedSurvey';
import SubmitSuccessPage from '../components/PublishedSurvey/SubmitSuccessPage';
import ResultsMainView from '../components/Results/ResultsMainView';
import { Container } from 'react-bootstrap';
import NavbarTemplate from '../components/MainTemplate/NavbarTemplate';
import CreateSurvey from '../components/CreateSurvey/CreateSurvey';


const MainRoutingView = ({ loggedIn }) => {
    const location_pathname = window.location.pathname;

    if (location_pathname.slice(0, 7) === '/survey') {
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
                                <Route exact path="/list">
                                    <SurveysList/>
                                </Route>
                                <Route exact path="/create_survey">
                                    <CreateSurvey/>
                                </Route>
                                <Route exact path="/edit/:id">
                                    <EditSurvey/>
                                </Route>
                                <Route exact path="/preview/:id">
                                    <PreviewSurvey/>
                                </Route>
                                <Route exact path="/results/:id">
                                    <ResultsMainView/>
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
