// @flow

import React from 'react'
import { Container, Segment, Form, Dropdown, Button } from 'semantic-ui-react'
import type { User } from '../api'
import { PayHistory } from './PayHistory'
import { allYears, allMonth } from '../Utils.js'


export type Props = {
  token: string,
  user: User,
}


class AllTransactions extends React.Component {
  state:{
    from: string,
    to: string
  }
  constructor(props: any) {
    super(props)
    this.state = {
    from: undefined,
    to: undefined
    }
  }
  onChangeYear = (event: Event, result: Object) => {
    this.setState({year: result.value})
    /*todo: find a better way to reaload transections from child*/ 
    this.payHistory.getTransections(
      this.createISODateFrom(result.value, this.state.month), 
      this.createISODateTo(result.value, this.state.month), 
      10)
  }
  onChangeMonth = (event: Event, result: Object) => {
    this.setState({ month: result.value })
      this.payHistory.getTransections(
      this.createISODateFrom( this.state.year,result.value), 
      this.createISODateTo( this.state.year,result.value), 
      10)
  }
  handleSubmit = (event: Event) => {
    event.preventDefault();
    this.setState({
      year: undefined,
      month: undefined,
    })
    this.payHistory.getTransections(undefined, undefined, 10)
  }

  createISODateFrom (year, month) {
    if (year === undefined) return undefined
    if (month === undefined) {
      return new Date(year, 0, 1).toISOString()
    } else {
      return new Date(year, month, 1).toISOString()
    }
  }
  createISODateTo (year, month) {
    if (year === undefined) return undefined
    if (month === undefined) {
      return new Date(year, 11, 31).toISOString()
    } else {
       return new Date(year, month, 31).toISOString()
    }
  }

  render() {

    return (
      <Container>
        <Segment style={{ marginTop: 10 }}>
          <Container textAlign='right' style={{ width: 465, float: 'right' }}>
            <Form>
              <Form.Group>
                <Form.Field>
                  <Dropdown labeled placeholder='Nach Jahr Filtern' onChange={this.onChangeYear} value={this.state.year} selection options={allYears} />
                </Form.Field>
                <Form.Field>
                  <Dropdown labeled placeholder='Nach Monat Filtern' onChange={this.onChangeMonth} value={this.state.month} selection options={allMonth} />
                </Form.Field>
                <Button onClick={this.handleSubmit} fluid style={{ width: 50 }} >X</Button>
              </Form.Group>
            </Form>
          </Container>
          <PayHistory onRef={ref => (this.payHistory = ref)} count="10"  />
        </Segment>
      </Container>
    )
  }
}




export default AllTransactions
