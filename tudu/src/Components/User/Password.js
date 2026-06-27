import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import usePatch from '../../Hooks/usePatch'
import AlertPopUp from '../Shared/AlertPopUp'

const Password = () => {

    const [isActive, setisActive] = useState()
    const Navigate = useNavigate()
    const [callOnce, setcallOnce] = useState(true)
    const URL = process.env.REACT_APP_SERVER_URL
    const [password, setpassword] = useState({
        oldPassword: '',
        newPassword: ''
    })

    const { patchdata, updateError } = usePatch(`${URL}/updatepassword`, setcallOnce)

    const handleChanges = (e) => {
        const { name, value } = e.target
        setpassword(prev => ({ ...prev, [name]: value }))
    }

    const updatePassword = async () => {
        if (!callOnce) return;
        const isempty = Object.values(password).some(val => val === '' || val === undefined || val === null)
        if (isempty) return alert('Enter both your old and new password.')
        if (password?.newPassword.length <= 8) return alert('Password must contain at least 8 characters.')
        patchdata(password)
    }

    return (
        <>
        <AlertPopUp error={updateError}/>
        <div className='email-update-page'>
            <div id='go-back-sec'>
                <p onClick={() => Navigate(-1)}>Setting</p>
                <span>/</span>
                <p>Password</p>
            </div>

            <div className='email-main-sec'>
                <div className='child-email-main-sec'>
                    <div className='email-content'>
                        <div className='title-email'>
                            <h3>Password</h3>
                            <p></p>
                        </div>
                        <button id='editbtn' onClick={() => setisActive(prev => !prev)}>{!isActive ? 'Edit' : 'Cancel'}</button>
                    </div>
                    {
                        isActive && <>
                            <div className='email-form'>
                                <input type="text" name="oldPassword" id="" onChange={handleChanges} placeholder='Enter old password' />
                            </div>
                            <div className='email-form'>
                                <input type="text" name="newPassword" id="" onChange={handleChanges} placeholder='Enter new password' />
                                <button onClick={() => updatePassword()} style={{ cursor: callOnce ? 'pointer' : 'not-allowed' }}>Confirm</button>
                            </div>
                        </>
                    }
                </div>
            </div>

        </div>
        </>
    )
}

export default Password
