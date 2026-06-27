import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { ThemeContext } from '../../App'
import axios from 'axios'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import AlertPopUp from '../Shared/AlertPopUp';

const DeleteAccount = () => {

    const Navigate = useNavigate()
    const [callOnce, setcallOnce] = useState(true)
    const { user } = useContext(ThemeContext)
    const URL = process.env.REACT_APP_SERVER_URL
    const [password, setpassword] = useState()
    const [error, seterror] = useState()

    const deleteAccount = async () => {
        if (!callOnce) return;
        if (!password) return alert('Enter password')
        try {
            setcallOnce(false)
            const res = await axios.delete(`${URL}/deleteaccount/${user?._id}`, {
                withCredentials: true,
                data: {
                    password: password
                }
            })
            if(res?.status === 200){
                window.location.reload()
            }

        } catch (error) {
            const status = error?.response?.status
            if (status === 404 || status === 500 || status === 401) {
                seterror(error?.response?.data?.message || 'Something went wrong')
            }
            setcallOnce(true)
        }
    }
    setTimeout(() => {
        seterror('')
    }, 3000);

    return (
        <>
            <AlertPopUp error={error} />
            <div className='email-update-page'>

                <div id='go-back-sec'>
                    <p onClick={() => Navigate(-1)}>Setting</p>
                    <span>/</span>
                    <p>Delete account</p>
                </div>

                <div className='email-main-sec'>
                    <div className='warning-popup'>
                        <span style={{ marginRight: '10px' }}><WarningRoundedIcon style={{ color: 'red' }} /></span>
                        <p style={{ color: 'red', fontSize: '14px' }}>Please read carefully before deleting</p>
                    </div>
                    <div className='note'>
                        <p>This will erase your account and all data permanantly from our server i cannot be undone</p>
                        <input type="password" name="" id="dlt-password" onChange={(e) => setpassword(e.target.value)} placeholder='Enter password' />
                        <button id='delete-account' onClick={deleteAccount} style={{ cursor: callOnce ? 'pointer' : 'not-allowed' }}>
                            <span style={{ marginRight: '7px',cursor:callOnce?'pointer':'not-allowed'}}>{callOnce ? '' : <Spin indicator={<LoadingOutlined spin />} size="small" style={{ color: 'white' }} />}</span>
                            Delete my account
                        </button>
                    </div>
                </div>

            </div >
        </>
    )
}

export default DeleteAccount
