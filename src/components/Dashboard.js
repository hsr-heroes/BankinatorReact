// @flow

import React from 'react'
import { Container, Segment, Form, Input, Button, Icon, Grid, Header, Label } from 'semantic-ui-react'


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
          <Header as="h1">Kontoübersicht</Header>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column width="5">
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
    amount: number,
  }
  state = {
    from: "",
    to: "",
    amount: 0,
  }
  handleSubmit() {
    console.log("just submited form")
  }
  render() {
    return (
      <Form className='attached fluid segment'>
        <Form.Field>
          <Input label={<FormLabel value="von" />}  placeholder='10000002' value={this.state.from} />
        </Form.Field>
        <Form.Field>
          <Input label={<FormLabel value="zu" />} placeholder='Konto Nr' value={this.state.to} />
        </Form.Field>
        <Form.Field>
          <Input label={<FormLabel value="Betrag" />} placeholder='0 CHF' value={this.state.amount} />
        </Form.Field>
        <Button onClick={this.handleSubmit} fluid>Log-in</Button>
      </Form>

    )
  }

}

const FormLabel = (props) => (
  <Label style={{width: 80}}>{props.value}</Label>
)


export default Dashboard
