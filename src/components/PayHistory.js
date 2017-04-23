import React from 'react'
import { Table } from 'semantic-ui-react'
import * as api from '../api'
import { formatDate } from '../Utils'
import type {TransferResult, AccountNr } from "../api"

export type KeyTransections = {
    key: number,
    from: AccountNr,
    target: AccountNr,
    amount: number,
    total: number,
    date: string,
}

export class PayHistory extends React.Component {
    state: {
        token: ?string,
        transections: ?TransferResult[],
}
reload = false;

constructor(props: any) {
    super(props);
    this.state = {
        token: sessionStorage.getItem('token'),
        transections: null,
    }
    this.getTransections();

}
componentDidMount() {
    if (typeof this.props.onRef === 'function') {
        this.props.onRef(this)
    }
}
componentWillUnmount() {
    if (typeof this.props.onRef === 'function') {
        this.props.onRef(null)
    }
}

getTransections = (from: string, to: string) => {
    api.getTransactions(this.state.token, from, to, this.props.count)
        .then((val) => {
            let i = 0;
            let transections: Array<KeyTransections>;
            transections = [];
            val.result.forEach((e) => {
                e.key = i;
                i++;
                transections.push(e);
            });
            this.setState({ transections: transections })
        })
}
getTransectionsP = (from, to, count) => {
    this.from = from,
        this.to = to,
        this.getTransections()
}
render() {
    if (this.state.transections) {
        const transections: TransferResult[] = this.state.transections
        const rows = transections.map((transection) => {
            return (

                <Table.Row key={transection.key}>
                    <Table.Cell>{formatDate(transection.date)}</Table.Cell>
                    <Table.Cell>{transection.from}</Table.Cell>
                    <Table.Cell>{transection.target}</Table.Cell>
                    <Table.Cell>{transection.amount}</Table.Cell>
                    <Table.Cell>{transection.total}</Table.Cell>
                </Table.Row>

            );
        });
        return (
            <Table definition>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell>Von</Table.HeaderCell>
                        <Table.HeaderCell>Nach</Table.HeaderCell>
                        <Table.HeaderCell>Betrag</Table.HeaderCell>
                        <Table.HeaderCell>Saldo</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {rows}
                </Table.Body>

            </Table>
        )
    } else {
        return (
            <div>Loading...</div>
        );
    }
}
}