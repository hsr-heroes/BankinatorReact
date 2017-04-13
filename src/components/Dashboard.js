// @flow

import React from 'react'
import { Container, Segment, Form, Input, Button, Icon, Grid } from 'semantic-ui-react'


/*
  Use the api functions to call the API server. For example, the transactions
  can be retrieved and stored in the state as follows:
  
  getTransactions(this.props.token)
    .then(({result: transactions}) => 
      this.setState({transactions})
    )
    
  import { getAccountDetails, getAccount, transfer, getTransactions } from '../api'
*/

export type Props = {
  token: string,
}

class Dashboard extends React.Component {

  props: Props

  render() {

    return (
      <Container>
        <Segment style={{ marginTop: 10 }}>

          <Grid columns={2} divided>
            <Grid.Row>
              <Grid.Column>
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

class PayHistory extends React.Component {

  render() {
    return (
      <div>
        This is a payment history
      </div>
    );
  }
}

class NewPayment extends React.Component {
  state: {
    from: string,
    to: string,
  }
  state = {
    from: "",
    to: "",
  }
  handleSubmit() {
    console.log("just submited form")
  }
  render() {
    return (
      <Form className='attached fluid segment'>
        <Form.Field>
          <Input label="Von" placeholder='10000002' value={this.state.from} />
        </Form.Field>
        <Form.Field>
          <Input label="zu" placeholder='Konto Nr' value={this.state.to} />
        </Form.Field>
        <Button onClick={this.handleSubmit}>Log-in</Button>
      </Form>

    )
  }

}

export default Dashboard
