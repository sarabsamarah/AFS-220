import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Navbar from './components/Navbar.js'
import Auth from './components/Auth.js'
import Profile from './components/Profile.js'
import Issues from './components/Issues.js'
import ProtectedRoute from './components/ProtectedRoute'
import { UserContext } from './context/UserProvider'

export default function App() {
  const { token, logout } = useContext(UserContext)

  return (
      <div className="app">
          <h1>Rock the Vote</h1>
          { token && <Navbar logout={logout} /> }
          <Switch>
            <Route 
              exact path="/" 
              render={()=> token ? <Redirect to='/profile' /> : <Auth />}
            />
            <ProtectedRoute 
              path="/profile"
              component={Profile}
              redirectTo='/'
              token={token}
            />
            <ProtectedRoute 
              path="/issues"
              component={Issues}
              redirectTo='/'
              token={token}
            />
          </Switch>
    </div>
  )
}
