// @flow
import React from 'react'
import { Form, Input, Button, Label, Dropdown } from 'semantic-ui-react'
import * as api from '../api'

export class NewPayment extends React.Component {
    state: {
        from: string,
        accounts: any,
        to: string,
        amount: number,
        token: ?string,
    }

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
                    accounts: [{ key: accountNr, text: accountNr + " (" + amount + " CHF)", value: accountNr }],
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
