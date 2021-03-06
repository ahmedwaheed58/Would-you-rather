import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import { BrowserRouter as Router, Route, Switch  , Redirect} from 'react-router-dom';

import { handleInitialData } from '../actions/shared';

import HandleError from './HandleError';
import Header from './Header';
import Login from './Login';
import Navigation from './Navigation';
import Poll from './Poll';
import PollPreview from './PollPreview';
import PollPreviewList from './PollPreviewList';
import PrivateRoute from './PrivateRoute';
import ScorecardList from './ScorecardList';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { authedUser, answeredIds, unansweredIds } = this.props;
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          {authedUser !== null && (
            <div className="App">
              <Header />
              <Navigation />
            </div>
          )}
          <Switch>
            <Route path="/" exact component={Login} />
            <PrivateRoute
              isAuthenticated={authedUser !== null}
              exact
              path="/questions"
              component={props => (
                <PollPreviewList
                  {...props}
                  answeredIds={answeredIds}
                  unansweredIds={unansweredIds}
                />
              )}
            />
            <PrivateRoute
              isAuthenticated={authedUser !== null}
              path="/questions/:id"
              component={props => (
                <Poll
                  {...props}
                  answeredIds={answeredIds}
                  unansweredIds={unansweredIds}
                />
              )}
            />
            <PrivateRoute
              isAuthenticated={authedUser !== null}
              path="/add"
              component={PollPreview}
            />
            <PrivateRoute
              isAuthenticated={authedUser !== null}
              path="/leaderboard"
              component={ScorecardList}
            />
            <PrivateRoute 
              isAuthenticated={authedUser !== null}
              path="*"
              component={HandleError} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  if (users && authedUser) {
    const unansweredIds = [];
    const answeredIds = Object.keys(users[authedUser].answers);
    const questionsId = Object.keys(questions).sort( (a, b) => questions[b].timestamp - questions[a].timestamp);
    questionsId.map( (id) => answeredIds.includes(id) === false && unansweredIds.push(id) );
    answeredIds.sort((a, b) => questions[b] - questions[a]);
    return {
      authedUser,
      answeredIds,
      unansweredIds
    };
  }
  return {
    authedUser
  };
}

export default connect(mapStateToProps)(App);
