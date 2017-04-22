// @flow

import React from 'react'
import { Container, Segment } from 'semantic-ui-react'
import type { User } from '../api'
import {PayHistory} from './PayHistory'
import {Filter} from './Filter'

export type Props = {
  token: string,
  user: User,
}

class AllTransactions extends React.Component {

  props: Props

  render() {
    return (
      <Container>
        <Segment style={{ marginTop: 10 }}>
          <Filter />
          <PayHistory count="10" />
        </Segment>
      </Container>
    )
  }
}

export default AllTransactions
