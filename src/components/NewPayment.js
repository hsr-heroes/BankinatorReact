// @flow
import React from 'react'
import { Form, Input, Button, Label, Dropdown } from 'semantic-ui-react'
import * as api from '../api'


export class NewPayment extends React.Component {
    state: {
        from: string,
        accounts: any,
        to: string,
        isToValid: boolean,
        toOwner: string,
        amount: ?number,
        token: ?string,
        transferIsRunning: boolean,

    }

    constructor(props: any) {
        super(props)
        const token = sessionStorage.getItem('token')
        this.state = {
            accounts: null,
            from: "",
            to: "", 
            toOwner: "",
            isToValid: true,
            amount: null,
            token,
            transferIsRunning: false,
            
        }
        this.setAccountDetails();
    }

    onChangeFrom = (event: Event, result: Object) => {
        this.setState({ from: result.value })
    }

    onChangeTo = (evnet: Event, result: Object) => {
        this.setState({ to: result.value})
        if(result.value.length == 7){
            api.getAccount(result.value, this.state.token)
            .then((Account) => {
                 this.setState({isToValid: true})
                    this.setState({toOwner: Account.owner.firstname + " " + Account.owner.lastname })
            })
            .catch(this.setState({isToValid: false}))
        }else{
            this.setState({isToValid: false})
        }
        console.log(this.state.isToValid)
            
    }

    onChangeAmount = (evnet: Event, result: Object) => {
        if (!isNaN(result.value)) {
            this.setState({ amount: result.value })
        }
    }

    handleSubmit = (event: Event) => {
        event.preventDefault()
        this.setState({transferIsRunning: true})
        api.transfer(this.state.to, this.state.amount, this.state.token)
        .then((transferResult) => {
            this.setState({
                transferIsRunning: true,
                to: "",
                amount: 0,
            })
        })
        .catch((e: Error) => {
            if(e.message === "Bad Request"){
                //TODO: Handle error Message to user
                console.error("This transfer is not possible, please check account nr and amount")
            }else{
                console.error("Unkonown error during transfer, please try again")
            }
        });
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
        const isToValid: boolean = this.state.isToValid;
        const sumbmitEnable = (this.state.to === "" || this.state.amount === 0 || !isToValid)
        return (
            <Form className='attached fluid segment'>
                <Form.Field>
                    <Dropdown placeholder='Konto Nr' onChange={this.onChangeFrom} value={this.state.from} selection options={this.state.accounts} />
                </Form.Field>
                <Form.Field error={ isToValid ? false : true}>
                    {isToValid && this.state.to !== '' ?
                        <Label basic color='green' pointing='below'>{this.state.toOwner}</Label> : ''
                    }
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
