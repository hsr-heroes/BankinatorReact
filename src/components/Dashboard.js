// @flow

import React from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Segment, Grid, Header, Button } from 'semantic-ui-react'
import { NewPayment } from './NewPayment'
import { PayHistory } from './PayHistory'

export type Props = {
  token: string,
}

class Dashboard extends React.Component {
  state: {
    urlRedirect: string
  }
  constructor(props: Props){
    super(props)
    this.state = {
      urlRedirect: '/'
    }
  }


    redirect = (url: string) => {
    event.preventDefault()
    this.setState(
      { urlRedirect: url }
    )
  }



  render() {
    if (this.state.urlRedirect !== "/") {
      return (
        <Redirect to={this.state.urlRedirect} />
      )
    }
    return (
      <Container>
        <Segment style={{ marginTop: 10 }}>
          <Header as="h1">Kontoübersicht</Header>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column width={7}>
                <Header as="h3">Neue Zahlung</Header>
                <NewPayment />
              </Grid.Column>
              <Grid.Column>
                <Header as="h3">Letzte Zahlungen</Header>
                <PayHistory />
                <Container textAlign='right'>
                  <br />
                <Button onClick={() => this.redirect('/transactions')}>Alle Transaktionen</Button>
                </Container>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    )
  }
}

export default Dashboard
