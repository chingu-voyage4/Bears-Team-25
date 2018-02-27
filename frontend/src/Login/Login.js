import React from 'react';

import Input from './Input';

import { ButtonLikeText, Fields, Form, Heading2, Wrapper } from './styled';

const MIN_PASSWORD_LENGTH = 6;
const MIN_USERNAME_LENGTH = 3;

class Login extends React.Component {
  state = {
    register: false,
    username: '',
    password1: '',
    password2: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState(() => ({
      [name]: value,
    }));
  };

  handleSubmit = e => {
    e.preventDefault();

    // eslint-disable-next-line
    alert(JSON.stringify(this.state));
    this.setState(() => ({
      username: '',
      password1: '',
      password2: '',
    }));
  };

  switchToRegister = () => {
    this.setState(({ register }) => ({
      register: !register,
      username: '',
      password1: '',
      password2: '',
    }));
  };

  render() {
    const { password1, password2, register, username } = this.state;

    const isSubmitDisabled =
      password1.length < MIN_PASSWORD_LENGTH ||
      username.length < MIN_USERNAME_LENGTH ||
      (register && password1 !== password2);

    return (
      <Wrapper>
        <Form onSubmit={this.handleSubmit}>
          <Heading2>{!register ? 'Login' : 'Register'}</Heading2>
          <Fields>
            <Input
              label={
                register
                  ? `Username (min ${MIN_USERNAME_LENGTH} characters):`
                  : 'Username:'
              }
              name="username"
              onChange={this.handleChange}
              value={username}
              autofocus
            />
            <Input
              label={
                register
                  ? `Password (min ${MIN_PASSWORD_LENGTH} characters):`
                  : 'Password:'
              }
              name="password1"
              type="password"
              onChange={this.handleChange}
              value={password1}
            />
            {register && (
              <Input
                label="Repeat password:"
                name="password2"
                type="password"
                onChange={this.handleChange}
                value={password2}
              />
            )}
          </Fields>
          <Input
            disabled={isSubmitDisabled}
            name="submit"
            type="submit"
            onChange={this.handleChange}
            value={register ? 'Register' : 'Login'}
          />
        </Form>
        <ButtonLikeText onClick={this.switchToRegister}>
          {!register
            ? 'Click to register new user'
            : 'Click to login as an existing user'}
        </ButtonLikeText>
        <a
          href="/"
          onClick={e => {
            e.preventDefault();
            // eslint-disable-next-line
            alert('Redirect to GitHub login');
          }}
        >
          Login using GitHub
        </a>
      </Wrapper>
    );
  }
}

export default Login;