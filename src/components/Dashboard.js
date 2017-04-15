// @flow

import React from 'react'
import { Container, Segment, Grid, Header } from 'semantic-ui-react'
import { NewPayment } from './NewPayment'
import { PayHistory } from './PayHistory'

export type Props = {
  token: string,
}

class Dashboard extends React.Component {

  props: Props

  render() {
    return (
      <Container>
        <Segment style={{ marginTop: 10 }}>
          <Header as="h1">Kontoübersicht</Header>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column width={7}>
                <NewPayment />
              </Grid.Column>
              <Grid.Column>
                <PayHistory />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    )
  }
}

export default Dashboard
