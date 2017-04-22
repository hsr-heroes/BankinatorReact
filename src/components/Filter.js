// @flow
import React from 'react'
import { Container, Form, Dropdown, Button } from 'semantic-ui-react'

export class Filter extends React.Component {
    state: {
        year: ?number,
        month: string,
    }
    allYears: Object[]
    allMonth: Object[]
    constructor(props: any) {
        super(props)
        this.state = {
            year: undefined,
            month: "",
        }

        this.allYears = [
            { key: 2017, text: "2017", value: 2017 },
            { key: 2016, text: "2016", value: 2016 },
            { key: 2015, text: "2015", value: 2015 }]
        this.allMonth = [
            { key: 1, text: "Januar", value: 1 },
            { key: 2, text: "Februr", value: 2 },
            { key: 3, text: "März", value: 3 },
            { key: 4, text: "April", value: 4 },
            { key: 5, text: "Mai", value: 5 },
            { key: 6, text: "Juni", value: 6 },
            { key: 7, text: "Juli", value: 7 },
            { key: 8, text: "August", value: 8 },
            { key: 9, text: "September", value: 9 },
            { key: 10, text: "Oktober", value: 10 },
            { key: 11, text: "November", value: 11 },
            { key: 12, text: "Dezember", value: 12 }]
    }

    onChangeYear = (event: Event, result: Object) => {
        this.setState({ year: result.value })
    }
    onChangeMonth = (event: Event, result: Object) => {
        this.setState({ month: result.value })
    }
    handleSubmit = (event: Event) => {
        event.preventDefault();
        this.setState({
            year: null,
            month: "",
        })
    }

    render() {
        return (
            <Container textAlign='right' style={{width: 465, float: 'right'}}>
                <Form>
                    <Form.Group>
                        <Form.Field>
                            <Dropdown labeled placeholder='Nach Jahr Filtern' onChange={this.onChangeYear} value={this.state.year} selection options={this.allYears} />
                        </Form.Field>
                        <Form.Field>
                            <Dropdown labeled placeholder='Nach Monat Filtern' onChange={this.onChangeMonth} value={this.state.month} selection options={this.allMonth} />
                        </Form.Field>
                        <Button onClick={this.handleSubmit} fluid style={{width: 50}} >X</Button>
                    </Form.Group>
                </Form>
            </Container>
        )
    }
}
