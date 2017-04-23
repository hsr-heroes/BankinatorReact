import React from 'react'
import { Table, Button, Container } from 'semantic-ui-react'
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
    resultcount: number,
}

export class PayHistory extends React.Component {
    state: {
        token: ?string,
        transections: ?TransferResult[],
}
skip = 0;

constructor(props: any) {
    super(props);
    this.state = {
        token: sessionStorage.getItem('token'),
        transections: null,
        resultcount: undefined,
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

getTransections = (from: string, to: string, skip: number) => {
    if (from !== undefined) {
        this.from = from
        this.to = to
    }
    if (skip !== undefined) this.skip = skip
    api.getTransactions(this.state.token, from, to, this.props.count, this.skip)
        .then((val) => {
            let i = 0;
            let transections: Array<KeyTransections>;
            transections = [];
            val.result.forEach((e) => {
                e.key = i;
                i++;
                transections.push(e);
            });
            this.setState({
                transections: transections,
                resultcount: val.query.resultcount,
                count: val.query.count
            })
        })
}
pageUp = () => {
    this.skip = this.skip + 10;
    this.getTransections(this.from, this.to)
}
pageDown = () => {
    this.skip = this.skip - 10;
    this.getTransections(this.from, this.to)
}


render() {
    if (this.state.transections) {
        const transections: TransferResult[] = this.state.transections
        if (transections.length === 0){
            return (<Container><br /><br />In diesem Zeitraum wurden keine Transaktionen getätigt</Container>)
        }
        const rows = transections.map((transection) => {
            return (

                <Table.Row key={transection.key}>
                    <Table.Cell>{formatDate(transection.date)} - {transection.amount > 0 ? "Gutschrit" : "Belastung" }</Table.Cell>
                    <Table.Cell>{transection.from}</Table.Cell>
                    <Table.Cell>{transection.target}</Table.Cell>
                    <Table.Cell>{transection.amount} CHF</Table.Cell>
                    <Table.Cell>{transection.total} CHF</Table.Cell>
                </Table.Row>

            )
        })
        const pageCount = <PageCount resultcount={this.state.resultcount} skip={this.skip} count={this.state.count} />
        const enableUp = (this.state.count + this.skip) > this.state.resultcount
        const enableDown = this.skip === 0
        const enablePageChanger = this.state.count >= 10 && this.state.resultcount > 10
        const pageChanger = (
            <Container textAlign='right'>
            <Button.Group >
                <Button icon='left chevron' disabled={enableDown} basic onClick={this.pageDown} />
                <Button content={pageCount} disabled style={{ backgroundColor: 'white' }} />
                <Button icon='right chevron' disabled={enableUp} onClick={this.pageUp} basic />
            </Button.Group>
            </Container>
        )
        return (
            <Container>
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
                {enablePageChanger ? pageChanger : null}
            </Container>
        )
    } else {
        return (
            <div>Loading...</div>
        );
    }
}
}


function PageCount(props) {
    var until = (props.count + props.skip) > props.resultcount ? props.resultcount : (props.count + props.skip)
    return <div>Transaction {props.skip} bis {until} von {props.resultcount}</div>
}