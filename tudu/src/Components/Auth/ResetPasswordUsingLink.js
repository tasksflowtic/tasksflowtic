import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import AlertPopUp from '../Shared/AlertPopUp'

const ResetPasswordUsingLink = () => {

    const URL = process.env.REACT_APP_SERVER_URL
    const [callOnce, setcallOnce] = useState(true)
    const [newPassword, setnewPassword] = useState()
    const [error, seterror] = useState()
    const { token } = useParams()
    const Navigate = useNavigate()

    const resetPassword = async () => {
        if (!callOnce) return;
        if (!newPassword) return alert('Enter password')
        if (newPassword.length < 8) alert('Password must be at least 8 characters long.')
        try {
            const res = await axios.patch(`${URL}/reset-password/${token}`, { newPassword })
            seterror(res?.data?.message)
            setTimeout(() => {
                Navigate('/signin')
            }, (2000));
        } catch (error) {
            const status = error?.response?.status
            if (status === 500 || status === 401 || status === 404) {
                seterror(error?.response?.data?.message)
            }
            setcallOnce(true)
        }
    }

    return (
        <>
            <AlertPopUp error={error} />
            <div className='auth-page'>
                <div className='child-auth-page'>

                    <div className='wrapper-content'>
                        <p style={{ fontSize: '13px' }}> Enter your new password below to reset your account password.</p>

                        <div className='data'>
                            <input type="password" name="password" id="" onChange={(e) => setnewPassword(e.target.value)} placeholder='Enter new password' />
                        </div>
                        <button onClick={resetPassword} id='signup-btn' style={{ cursor: callOnce ? 'pointer' : 'not-allowed' }}>{callOnce ? 'Reset password' : 'Wait...'}</button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ResetPasswordUsingLink
