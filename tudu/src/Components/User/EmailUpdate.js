import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ThemeContext } from '../../App'
import AlertPopUp from '../Shared/AlertPopUp'
//setting css use inside

const EmailUpdate = () => {

    const Navigate = useNavigate()
    const URL = process.env.REACT_APP_SERVER_URL
    const { user } = useContext(ThemeContext)
    const [isActive, setisActive] = useState(false)
    const [callOnce, setcallOnce] = useState(false)
    const [isotp, setisotp] = useState(false) //is otp send or not
    const [error, seterror] = useState()

    const [newemail, setnewemail] = useState({
        email: '',
        otp: ''
    })

    const handlechange = (e) => {
        const { name, value } = e.target
        setnewemail(prev => ({ ...prev, [name]: value }))
        setcallOnce(true)
    }

    const handleemail = async (e) => {
        e.preventDefault()
        if (!callOnce) return;
        if (!newemail?.email) return alert('Enter a new email to proceed')
        try {
            setcallOnce(false)
            const res = await axios.post(`${URL}/requestotp`, { newemail }, {
                withCredentials: true
            })
            if (res?.status === 200) {
                setcallOnce(true)
                setisotp(true)
            }
        } catch (error) {
            const status = error?.response?.status
            if (status === 404 || status === 500 || status === 401) {
                seterror(error?.response?.data?.message)
            }
            setcallOnce(true)
        }
    }

    const verifyOtp = async () => {
        if (!callOnce) return;
        const isempty = Object.values(newemail).some(val => val === '' || val === undefined || val === null)
        if (isempty) return alert('Email and otp cannot be empty')
        try {
            setcallOnce(false)
            const res = await axios.patch(`${URL}/requestEmailupdate`, { newemail }, {
                withCredentials: true
            })
            if(res?.status === 200){
                window.location.reload()
            }
        } catch (error) {
            const status = error?.response?.status
            if (status === 404 || status === 400 || status === 500 || status === 401) {
                seterror(error?.response?.data?.message)
            }
            setcallOnce(true)
        }
    }
    setTimeout(() => {
        seterror('')
    }, (3000));

    return (
        <>
            <AlertPopUp error={error} />
            <div className='email-update-page'>

                <div id='go-back-sec'>
                    <p onClick={() => Navigate(-1)}>Setting</p>
                    <span>/</span>
                    <p>Email address</p>
                </div>

                <div className='email-main-sec'>
                    <div className='child-email-main-sec'>
                        <div className='email-content'>
                            <div className='title-email'>
                                <h3>Email</h3>
                                <p>{user?.email}</p>
                            </div>
                            <button id='editbtn' onClick={() => setisActive(prev => !prev)}>{!isActive ? 'Edit' : 'Cancel'}</button>
                        </div>
                        {
                            isActive && <div>
                                {
                                    !isotp ? <div className='email-form'>
                                        < input type="email" name="email" id="" onChange={handlechange} placeholder='Enter new email address' />
                                        <button onClick={handleemail} style={{ cursor: callOnce ? 'pointer' : 'not-allowed' }}>{callOnce ? 'Confirm' : 'Wait...'}</button>
                                    </div> : <div className='email-form'>
                                        <input type="number" name="otp" id="" maxLength={6} onChange={handlechange} placeholder='Enter 6 digit otp' style={{ textAlign: 'center' }} />
                                        <button onClick={verifyOtp}>{callOnce ? 'Verify' : 'Wait...'}</button>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                </div>

            </div >
        </>
    )
}

export default EmailUpdate
