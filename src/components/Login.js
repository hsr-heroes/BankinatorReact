// @flow

import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Button, Input, Form, Container, Icon, Message  } from 'semantic-ui-react'

export type Props = {
  /* Callback to submit an authentication request to the server */
  authenticate: (login: string, password: string, callback: (error: ?Error) => void) => void,
  /* We need to know what page the user tried to access so we can 
     redirect after logging in */
  location: {
    state?: {

      from: string,
    }
  }
}

class Login extends React.Component {
  
  props: Props


  state: {
    login: string,
    password: string,
    error?: Error,
    redirectToReferrer: boolean,
  }
  
  state = {
    login: "",
    password: "",
    error: undefined,
    redirectToReferrer: false,
  }

  handleLoginChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({login: event.target.value})
    }
  }

  handlePasswordChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({password: event.target.value})
    }
  }

  handleSubmit = (event: Event) => {
    event.preventDefault()
    const { login, password } = this.state
    
    this.props.authenticate(login, password, (error) => {
      if(error) {
        this.setState({error})
      } else {
        this.setState({redirectToReferrer: true, error: null})
      }
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/dashboard' } }
    const { redirectToReferrer, error } = this.state

    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }

    return (
      <Container text style={{padding: 50, width: 500}}>
          <Message
            attached
            header="Bank of Rapperswil"
            content="Please login"
            color="black"
            
          />
          <Form className='attached fluid segment'>
            <Form.Field>
              <Input icon="user" iconPosition='left' onChange={this.handleLoginChanged} placeholder='Login' value={this.state.login} />
            </Form.Field>
            <Form.Field>
              <Input icon="lock" iconPosition='left' onChange={this.handlePasswordChanged} placeholder='Password' type="password" value={this.state.password} />
            </Form.Field>
            <Button onClick={this.handleSubmit}>Log-in</Button>
          </Form>
          {error && 
            <Message attached error>
              Es ist ein Fehler aufgetreten!
            </Message>
          }
          <Message attached='bottom' warning>
            <Icon name="help" /> <Link to="/signup">Noch keinen Account?</Link>
          </Message>
          </Container>
    )
  }
}

export default Login
