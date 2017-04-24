// @flow

import React from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Input, Form, Container, Message  } from 'semantic-ui-react'

import { signup } from '../api'

class Signup extends React.Component {

  state: {
    login: string,
    firstname: string,
    lastname: string,
    password: string,
    error: string,
    loginerror: boolean,
    firstnameerror: boolean,
    lastnameerror: boolean,
    passworderror:boolean,
    redirectToReferrer: boolean,
    redirect: string,
  }

  state = {
    login: "",
    firstname: "",
    lastname: "",
    password: "",
    error: null,
    loginerror: false,
    firstnameerror: false,
    lastnameerror: false,
    passworderror: false,
    redirectToReferrer: false,
    redirect: '/'

  }

  handleLoginChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ login: event.target.value })
    }
  }

  handleFirstNameChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ firstname: event.target.value })
    }
  }

  handleLastNameChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ lastname: event.target.value })
    }
  }

  handlePasswordChanged = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({ password: event.target.value })
    }
  }

  handleSubmit = (event: Event) => {
    event.preventDefault()
    const { login, firstname, lastname, password} = this.state
    this.setState({loginerror: (login === "")})
    this.setState({firstnameerror: (firstname === "")})
    this.setState({lastnameerror: (lastname === "")})
    this.setState({passworderror: (password === "")})
    signup(login, firstname, lastname, password).then(result => {
      this.setState({ redirectToReferrer: true, error: null })
    }).catch(error =>
      this.setState({ error })
      )
  }

  redirect = (to: string) => {
    this.setState({redirect: to})
  }

  render() {
    const { redirectToReferrer, error, redirect } = this.state

    if (redirectToReferrer) {
      return (
        <Redirect to='/login' />
      )
    }
    if(redirect !== '/'){
        return (
           <Redirect to={redirect} />
        )
    }

    return (
      <Container text style={{ padding: 50, width: 500 }}>
        <Message
          attached
          header="Bank of Rapperswil"
          content="Registration"
          color="black"

        />
        <Form className='attached fluid segment'>
          <Form.Field  error={this.state.loginerror}>
            <Input icon='user' iconPosition='left' onChange={this.handleLoginChanged} placeholder='Login' value={this.state.login} />
          </Form.Field>
          <Form.Field error={this.state.firstnameerror}>
            <Input icon='user' iconPosition='left' onChange={this.handleFirstNameChanged} placeholder='Vorname' value={this.state.firstname} />
          </Form.Field>
          <Form.Field error={this.state.lastnamerror}>
            <Input icon='user' iconPosition='left' onChange={this.handleLastNameChanged} placeholder='Nachname' value={this.state.lastname} />
          </Form.Field>
          <Form.Field error={this.state.passworderror}>
            <Input icon='user' iconPosition='left' onChange={this.handlePasswordChanged} placeholder='Passwort' type="password" value={this.state.password} />
          </Form.Field>
          <Button.Group fluid>
          <Button onClick={this.handleSubmit} color='blue'>Account eröffnen</Button>
          <Button onClick={() => this.redirect('/home')}>Zurück zum Login</Button>
          </Button.Group>
        </Form>
        {error &&
          <Message attached error>
            Es ist ein Fehler aufgetreten!
            </Message>
        }
      </Container>
    )
  }
}

export default Signup
