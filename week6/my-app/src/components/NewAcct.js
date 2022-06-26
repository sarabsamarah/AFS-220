import React from 'react'

export default function NewAcct(props){
  const {
    handleChange, 
    handleSubmit, 
    btnText,
    errMsg, 
    inputs: {
      firstname,
      lastname,
      username, 
      password
    } 
  } = props
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={firstname} 
        name="firstname" 
        onChange={handleChange} 
        placeholder="First Name"/>
      <input 
        type="text" 
        value={lastname} 
        name="lastname" 
        onChange={handleChange} 
        placeholder="Last Name"/>
      <input 
        type="text" 
        value={username} 
        name="username" 
        onChange={handleChange} 
        placeholder="Username"/>
      <input 
        type="text" 
        value={password} 
        name="password" 
        onChange={handleChange} 
        placeholder="Password"/>
      <button>{ btnText }</button>
      <p style={{backgroundColor:"#c00000",color: "ffffff", textAlign: "center"}} >{ errMsg }</p>
    </form>
  )
}