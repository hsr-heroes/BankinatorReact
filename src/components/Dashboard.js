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
    from: "1000001",
    to: "",
    amount: "",
  }
  accounts: any[];
  accounts = [{ key: '1 ', text: '1000001', value: '1000001' }, { key: '2', text: '1000002', value: '1000002  ' }];
  defaultValue = this.accounts[0].value;

  onChangeFrom = (event: Event, result: Object) => {
      this.setState({from: result.value})
  }

  onChangeTo = (evnet: Event, result: Object) => {
    this.setState({to: result.value})
  }
  onChangeAmount = (evnet: Event, result: Object) => {
     if(!isNaN( result.value)){
      this.setState({amount:  result.value})
     }
  }


  handleSubmit(event: Event) {
    event.preventDefault();


  }
  render() {
    return (
      <Form className='attached fluid segment'>
        <Form.Field>
          
          <Dropdown placeholder='Konto Nr' onChange={this.onChangeFrom} value={this.state.from}  selection options={this.accounts} />
          
        </Form.Field>
        <Form.Field>
          <Input label={<FormLabel value="zu" />} onChange={this.onChangeTo} placeholder='Konto Nr' value={this.state.to} />
        </Form.Field>
        <Form.Field>
          <Input label={<FormLabel value="Betrag" />} onChange={this.onChangeAmount} placeholder='0 CHF' value={this.state.amount} />
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
