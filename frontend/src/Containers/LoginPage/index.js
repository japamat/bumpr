/*
 * HomePage
 *
 * LOGIN CONTAINER
 *
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';


import Form from './Form';
import Input from './Input';
import { loginUser } from '../App/actions';

import Button from '../../Components/Button';

export class HomePage extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       username: '',
       password: '',
    }
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit = evt => {
    console.log('fired');
    
    evt.preventDefault();
    this.props.onLoginUser({ ...this.state });
  }
  
  
  render() {
    const { username, password } = this.state;
    return (
      <div>
        <h1>
          LOGIN PAGE
        </h1>
        <Form onSubmit={this.handleSubmit}>
          <Input
            required
            id="username"
            name="username"
            type="text"
            placeholder="username"
            value={username}
            onChange={this.handleChange}
          />
          <Input
            required
            id="password"
            name="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={this.handleChange}
          />
          <Button handleRoute={this.handleSubmit}>
            Submit
          </Button>
        </Form>
  
      </div>
  
    );
  }
}


export function mapDispatchToProps(dispatch) {
  return {
    onLoginUser: payload => dispatch(loginUser(payload)),
  };
}

const withConnect = connect(
  () => ({}),
  mapDispatchToProps,
);

const connected = compose(withConnect)(HomePage);

export default withRouter(connected)