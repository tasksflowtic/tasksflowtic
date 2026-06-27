import React, { useState } from 'react'
import '../../Styles/Auth.css'
import logo from '../../Images/logo.png'
import { Link } from 'react-router-dom';
import axios from 'axios'

const SignIn = () => {

  const [callOnce, setcallOnce] = useState(true)
  const URL = process.env.REACT_APP_SERVER_URL
  const [authData, setauthData] = useState({
    email: '',
    password: ''
  })

  const handlechanges = (e) => {
    const { name, value } = e.target
    setauthData(data => ({ ...data, [name]: value }))
  }

  // signin
  const signin = async (e) => {
    e.preventDefault()
    if (!callOnce) return;
    try {
      setcallOnce(false)
      const isempty = Object.values(authData).some(val => val === '' || val === undefined || val === null)
      if (isempty) return alert('Fill up all informations')
      const res = await axios.post(`${URL}/signin`, { authData }, {
        withCredentials: true
      })
      if (res?.status === 200) {
        window.location.reload()
      }
    } catch (err) {
      const status = err?.response?.status
      if (status === 400 || status === 404 || status === 500) {
        alert(err?.response?.data?.message)
      }
      setcallOnce(true)
    }
  }

  return (
    <div className='auth-page'>
      <div className='child-auth-page'>

        <div className='wrapper-content'>
          <img src={logo} alt="" id='auth-logo' />

          <p id='auth-title'>SignIn</p>
          <p style={{ fontSize: '14px' }}>Enter email and password to SignIn</p>

          <form onSubmit={signin}>
            <div className='data'>
              <input type="email" name="email" id="" onChange={handlechanges} placeholder='Enter email' />
              <input type="password" name="password" id="" onChange={handlechanges} placeholder='Enter password' />
              <Link to={'/forgot-password'} id='link'><p id='fp'>Forgot password?</p></Link>
            </div>

            <button type='submit' id='signup-btn' style={{ cursor: callOnce ? 'pointer' : 'not-allowed' }}>SignIn</button>
          </form>
          <p id='alr-acc'>Don't have an account? <Link to={'/signup'}><strong style={{ color: '#6C66EC', cursor: 'pointer' }}>SignUp</strong></Link></p>
        </div>

      </div>
    </div>
  )
}

export default SignIn
