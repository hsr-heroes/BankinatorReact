// @flow

import React from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Input, Form, Container, Icon, Message  } from 'semantic-ui-react'

import { signup } from '../api'

class Signup extends React.Component {

  state: {
    login: string,
    firstname: string,
    lastname: string,
    password: string,
    error: string,
    redirectToReferrer: boolean,
  }

  state = {
    login: "",
    firstname: "",
    lastname: "",
    password: "",
    error: null,
    redirectToReferrer: false,
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
    const { login, firstname, lastname, password } = this.state
    signup(login, firstname, lastname, password).then(result => {
      console.log("Signup result ", result)
      this.setState({ redirectToReferrer: true, error: null })
    }).catch(error =>
      this.setState({ error })
      )
  }

  render() {
    const { redirectToReferrer, error } = this.state

    if (redirectToReferrer) {
      return (
        <Redirect to='/login' />
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
          <Form.Field>
            <Input icon='user' iconPosition='left' onChange={this.handleLoginChanged} placeholder='Login' value={this.state.login} />
          </Form.Field>
          <Form.Field>
            <Input icon='user' iconPosition='left' onChange={this.handleFirstNameChanged} placeholder='Vorname' value={this.state.firstname} />
          </Form.Field>
          <Form.Field>
            <Input icon='user' iconPosition='left' onChange={this.handleLastNameChanged} placeholder='Nachname' value={this.state.lastname} />
          </Form.Field>
          <Form.Field>
            <Input icon='user' iconPosition='left' onChange={this.handlePasswordChanged} placeholder='Passwort' type="password" value={this.state.password} />
          </Form.Field>
          <Button onClick={this.handleSubmit}>Account eröffnen</Button>
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
