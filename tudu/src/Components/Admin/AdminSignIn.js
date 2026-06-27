import React, { useState } from 'react'
import logo from '../../Images/logo.png'
import axios from 'axios'

const AdminSignIn = () => {

    const URL = process.env.REACT_APP_SERVER_URL
    const [callOnce, setcallOnce] = useState(true)
    const [adminAuth, setadminAuth] = useState({
        name: '',
        email: '',
        password: '',
        confirmpassword: '',
        uniqueId: ''
    })

    const handlechanges = (e) => {
        const { name, value } = e.target
        setadminAuth(prev => ({ ...prev, [name]: value }))
    }

    const adminSignIn = async (e) => {
        e.preventDefault()
        if(!callOnce) return;
        const isEmpty = Object.values(adminAuth).some(val => val === undefined || val === null || val === '')
        if (adminAuth.password !== adminAuth.confirmpassword) return alert('Passowrd not match')
        if (isEmpty) return alert('Fill up all imfromation')
        try {
            setcallOnce(false)
            const res = await axios.post(`${URL}/admin/signin`, { adminAuth }, {
                withCredentials: true
            })
            if(res.status === 200){
                window.location.reload()
            }
        } catch (error) {
            const status = error?.response?.status
            if (status === 404 || status === 401 || status === 500) {
                alert(error?.response?.data?.message)
            }
            setcallOnce(true)
        }
    }

    return (
        <div className='auth-page'>
            <div className='child-auth-page'>

                <div className='wrapper-content'>
                    <img src={logo} alt="" id='auth-logo' />

                    <p id='auth-title'>SignUp</p>
                    <p style={{ fontSize: '14px' }}> Enter your admin credentials to access the dashboard</p>

                    <form onSubmit={adminSignIn}>
                        <div className='data'>
                            <input type="text" name="name" required id="" onChange={handlechanges} placeholder='Your name' style={{ height: '35px', borderRadius: '8px' }} />
                            <input type="email" name="email" required id="" onChange={handlechanges} placeholder='Enter email' style={{ height: '35px', borderRadius: '8px' }} />
                            <input type="password" name="password" required id="" onChange={handlechanges} placeholder='Enter password' style={{ height: '35px', borderRadius: '8px' }} />
                            <input type="password" name="confirmpassword" required id="" onChange={handlechanges} placeholder='Confirm password' style={{ height: '35px', borderRadius: '8px' }} />
                            <input type="text" name="uniqueId" id="" required onChange={handlechanges} placeholder='Enter an uniqueId' style={{ height: '35px', borderRadius: '8px' }} />
                        </div>

                        <button id='signup-btn' type='submit' style={{ cursor: callOnce ? 'pointer' : 'not-allowed' }}>SignIn</button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default AdminSignIn
