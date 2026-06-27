import React, { useState } from 'react'
import axios from 'axios'

const PasswordResetLink = () => {

    const URL = process.env.REACT_APP_SERVER_URL
    const [callOnce, setcallOnce] = useState(true)
    const [email, setemail] = useState()

    const sendResetlink = async (e) => {
        e.preventDefault()
        if (!callOnce) return;
        if (!email) return alert('Enter email address')
        try {
            setcallOnce(false)
            const res = await axios.post(`${URL}/password-reset-link`, {email}, {
                withCredentials: true
            })
            alert(res?.data?.message)
        } catch (error) {
            const status = error?.response?.status
            if (status === 500 || status === 404) {
                alert(error?.response?.data?.message)
            }
            setcallOnce(true)
        }
    }

    return (
        <div className='auth-page'>
            <div className='child-auth-page'>

                <div className='wrapper-content'>

                    <p style={{ fontSize: '13px', color: '#9A9AA3' }}>Enter your email address and we'll send you a password reset link.</p>

                    <form onSubmit={sendResetlink}>
                        <div className='data'>
                            <input type="email" name="email" id="" onChange={(e) => setemail(e.target.value)} placeholder='Enter email' />
                        </div>

                        <button type='submit' id='signup-btn' style={{ cursor: callOnce ? 'pointer' : 'not-allowed' }}>{callOnce ? 'Send reset link' : 'Wait...'}</button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default PasswordResetLink
