// @flow

import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  NavLink
} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import AllTransactions from './components/AllTransactions'
import PrivateRoute from './components/PrivateRoute'
import { Menu, Container, Segment, Header } from 'semantic-ui-react'



import * as api from './api'

import type { User } from './api'

class App extends React.Component {
  state: {
    isAuthenticated: boolean,
    token: ?string,
    user: ?User,
  }



  constructor(props: any) {
    super(props)
    const token = sessionStorage.getItem('token')
    const user = sessionStorage.getItem('user')
    if (token && user) {  
      this.state = {
        isAuthenticated: true,
        token,
        user: JSON.parse(user),
      }
    } else {
      this.state = {
        isAuthenticated: false,
        token: undefined,
        user: undefined,
      }
    }
  }

  authenticate = (login: string, password: string, cb: (error: ?Error) => void) => {
    debugger;
    api.login(login, password)
      .then(({ token, owner }) => {
        this.setState({ isAuthenticated: true, token, user: owner })
        sessionStorage.setItem('token', token)
        sessionStorage.setItem('user', JSON.stringify(owner))
        cb(null)
      })
      .catch(error => cb(error))
  }

  signout = (callback: () => void) => {
    this.setState({ isAuthenticated: false, token: undefined, user: undefined })
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    callback()
  }


  render() {
    const { isAuthenticated, user, token } = this.state
    const MenuBar = withRouter(({ history, location: { pathname } }) => {
      if (isAuthenticated && user) {
        return (
          <Container>
            <Segment style={{ marginTop: 10 }}>
              <Menu pointing secondary>
                <Header as='h3' style={{ margin: 0, paddingTop: 7 }}>{user.firstname} {user.lastname} &ndash; {user.accountNr}</Header>
                {/* Links inside the App are created using the react-router's Link component */}
                <Menu.Item name='Home' as={NavLink} to='/home' />
                <Menu.Item name='Dashboard' as={NavLink} to='/dashboard' />
                <Menu.Item name='Zahlungen' as={NavLink} to='/transactions' />
                <div className='right menu' style={{ paddingTop: 10 }}>
                  <a href='/logout' onClick={(event) => {
                    event.preventDefault()
                    this.signout(() => history.push('/'))
                  }}>Logout {user.firstname} {user.lastname}</a>
                </div>
              </Menu>
            </Segment>
          </Container>
        )
      } else {
        return null
      }
    })

    return (
      <Router>
        <div>
          <MenuBar />
          <Route exact path='/' render={props => <Home {...props} isAuthenticated={isAuthenticated} />} />
          <Route exact path='/home' render={props => <Home {...props} isAuthenticated={isAuthenticated} />} />
          <Route path='/login' render={props => <Login {...props} authenticate={this.authenticate} />} />
          <Route path='/signup' component={Signup} />
          {/* 
            The following are protected routes that are only available for logged-in users. We also pass the user and token so 
            these components can do API calls. PrivateRoute is not part of react-router but our own implementation.
          */}            <PrivateRoute path='/dashboard' isAuthenticated={isAuthenticated} token={token} component={Dashboard} />
          <PrivateRoute path='/transactions' isAuthenticated={isAuthenticated} token={token} user={user} component={AllTransactions} />
        </div>
      </Router>
    )
  }
}

export default App
