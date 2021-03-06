import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props) {
  const { logout } = props
  return (
    <div className="navbar">
      <Link to="/profile">Profile</Link>
      <Link to="/poses">Yoga Poses</Link>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

// sarab samarah