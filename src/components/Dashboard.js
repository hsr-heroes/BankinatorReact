// @flow

import React from 'react'
import { Container, Segment, Form, Input, Button, Grid, Header, Label, Dropdown } from 'semantic-ui-react'
// import * as api from '../api'

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

  // constructor(props: any){
  //   super(props);

  // }

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
  accounts: any[];
  accounts = [{ key: '1000001 ', text: '1000001', value: '10000001' }, { key: '10000002', text: '1000002', value: '100000002' }];
  defaultValue = this.accounts[0].value;
  constructor(props: any) {
    super(props);

  }


  handleSubmit(event: Event) {

  }
  render() {
    return (
      <Form className='attached fluid segment'>
        <Form.Field>
          
          <Dropdown placeholder='Konto Nr' labeled  label={<FormLabel value="zu" />} defaultValue={this.defaultValue} selection options={this.accounts} />
          
        </Form.Field>
        <Form.Field>
          <Input label={<FormLabel value="zu" />} placeholder='Konto Nr' value={this.state.to} />
        </Form.Field>
        <Form.Field>
          <Input label={<FormLabel value="Betrag" />} placeholder='0 CHF' value={this.state.amount} />
        </Form.Field>
        <Button onClick={this.handleSubmit} fluid>Betrag überweisen</Button>
      </Form>

    )
  }

}

const FormLabel = (props) => (
  <Label style={{ width: 80 }}>{props.value}</Label>
)


export default Dashboard
