// @flow

import React from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Message, Button, Link, Icon } from 'semantic-ui-react'

export type Props = {
  isAuthenticated: bool,
}


class Home extends React.Component {
  state: {
    isAuthenticated: bool,
      urlRedirect: string,
  }

  constructor(props: any) {
    super(props)
    if (props.isAuthenticated) {
      this.state = {
        isAuthenticated: props.isAuthenticated,
          urlRedirect: "/",
      }
    } else {
      this.state = {
        isAuthenticated: false,
        urlRedirect: "/",

      }
    }
  }

  redirectS = (url: string) => {
      event.preventDefault()
      this.setState(
        {urlRedirect: url}
      )
  }



  render() {
    if (this.state.urlRedirect != "/") {
      return (
        <Redirect to={this.state.urlRedirect}/>
      )
    }
    return (
      <Container text style={{ padding: 50, width: 500 }}>
        <Message
          header="Bank of Rapperswil"
          content="best bank world wide"
          color="black"
        />
        <Message>
          {this.state.isAuthenticated
            ? <div>
              <p>Willkommen zurück!</p>
              <Button width="300" onClick={'/dashboard'}>Zum Dashboard</Button>
            </div>
            : <div>
              <Button onClick={() => this.redirectS('/login')}>Einloggen</Button>
              <p>Falls Sie noch keinen Account besitzen können Sie sich hier registrieren:</p>
              <Button onClick={() => this.redirectS('/register')}>Registrieren</Button>
            </div>
          }
        </Message>
      </Container >
    )
  }
}

export default Home
