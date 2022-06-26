import React, { useState, useContext } from 'react'
import AuthForm from './NewAcct'
import Login from './Login'
import { UserContext } from '../context/UserProvider'

const initLoginInputs = { username: '', password: '' }
const initNewAcctInputs = { firstname: '', lastname: '', username: '', password: ''}

export default function Auth() {
  const [loginInputs, setLoginInputs] = useState(initLoginInputs)
  const [newAcctInputs, setNewAcctInputs] = useState(initNewAcctInputs)
  const [toggle, setToggle] = useState(false)
  const { signup, login, errMsg, resetAuthErr } = useContext(UserContext)


  function handleChangeLogin(e){
    const {name, value} = e.target
    setLoginInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  


  function handleChangeNewAcct(e){
    const {name, value} = e.target
    setNewAcctInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSignup(e){
    e.preventDefault()
    signup(newAcctInputs)
  }

  function handleLogin(e){
    e.preventDefault()
    login(loginInputs)
  }

  function toggleForm() {
    setToggle(prev => !prev)
    resetAuthErr()
  }

  return (
    <div className="auth-container">
      { !toggle ?
        <>
        <Login 
          handleChange={handleChangeLogin}
          handleSubmit={handleLogin}
          inputs={loginInputs}
          btnText="Login"
          errMsg={errMsg}
        />
        <p className='link' onClick={toggleForm}>Not a member?</p>
        </>
      :
        <>
        <AuthForm 
          handleChange={handleChangeNewAcct}
          handleSubmit={handleSignup}
          inputs={newAcctInputs}
          btnText="Sign up"
          errMsg={errMsg}
        />
        <p className='link' onClick={toggleForm}>Already a member?</p>
        </>
      }
    </div>
  )
}