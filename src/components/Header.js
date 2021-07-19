import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { setAuthedUser } from '../actions/authedUser';

class Header extends Component {
  handleLogout = () => {
    this.props.dispatch(setAuthedUser(null));
    this.props.history.push('/');
  };

  render() {
    const { authedUser, users } = this.props;
    return (
      <div className = "header">
        <h2>Would you rather</h2>
        <img className = "authed-avatar" src = {users[authedUser].avatarURL} alt = {`${users[authedUser].name} avatar`}/>
        <h1>{users[authedUser].name}</h1>
        <button onClick={this.handleLogout}>
          Logout
        </button>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users
  };
}
export default withRouter(connect(mapStateToProps)(Header));
