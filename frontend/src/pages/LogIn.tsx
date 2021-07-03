import React, { useState } from 'react'
import logo from './Darsolar_logo.png'
const LogIn = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }
  return (
    <div>
      <div className="background_login"></div>
      <div className="page_container">
        <div className="image_container">
          <img src={logo} className="logo" alt="logo" />
        </div>
        <div className="logIn_Container">
          <h3> Please Sign In. </h3>
          <br />
          <form className="form_container">
            Email : <br />
            <input
              type="text"
              className="Input_form"
              placeholder="Type your email"
              name="email"
              value={input.email}
              onChange={handleChange}
            />
            <br />
            Password : <br />
            <input
              value={input.password}
              type="Password"
              className="Input_form"
              placeholder="Type your Password"
              onChange={handleChange}
              name="password"
            />
            <br />
            <button type="submit" className="Btn">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LogIn
