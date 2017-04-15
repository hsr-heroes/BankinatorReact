// @flow

import React from 'react'
import { Container, Segment, Form, Input, Button, Grid, Header, Label, Dropdown } from 'semantic-ui-react'
import * as api from '../api'

import type {User, Transection, TransferResult} from '../api'

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
    accounts: any,
    to: string,
    amount: number,
    token: ?string,
  }


  accounts: any[];
  defaultValue: string;
  constructor(props: any) {
    super(props)
    const token = sessionStorage.getItem('token')
    this.state = {
      accounts: null,
      from: "",
      to: "",
      amount: 0,
      token,
    }
    this.setAccountDetails();
  }

  onChangeFrom = (event: Event, result: Object) => {
    this.setState({ from: result.value })
  }

  onChangeTo = (evnet: Event, result: Object) => {
    this.setState({ to: result.value })
  }
  onChangeAmount = (evnet: Event, result: Object) => {
    if (!isNaN(result.value)) {
      this.setState({ amount: result.value })
    }
  }


  handleSubmit = (event: Event) => {
    event.preventDefault();

  }


  setAccountDetails = () => {
    api.getAccountDetails(this.state.token)
      .then(({ accountNr, amount }) => {
        this.setState({
          accounts: [{key: accountNr, text: accountNr + " (" + amount + " CHF)", value: accountNr}],
          from: accountNr,
        })
      })
  }
  render() {
    const sumbmitEnable = (this.state.to === "" || this.state.amount === 0)
    return (
      <Form className='attached fluid segment'>
        <Form.Field>
          <Dropdown placeholder='Konto Nr' onChange={this.onChangeFrom} value={this.state.from} selection options={this.state.accounts} />
        </Form.Field>
        <Form.Field>
          <Input label={<FormLabel value="zu" />} onChange={this.onChangeTo} placeholder='Konto Nr' value={this.state.to} />
        </Form.Field>
        <Form.Field>
          <Input label={<FormLabel value="Betrag" />} onChange={this.onChangeAmount} placeholder='0 CHF' value={this.state.amount} />
        </Form.Field>
        <Button onClick={this.handleSubmit} fluid disabled={sumbmitEnable} >Betrag überweisen</Button>
      </Form>

    )
  }

}

const FormLabel = (props) => (
  <Label style={{ width: 80 }}>{props.value}</Label>
)


export default Dashboard
