import React, { useState } from 'react'
import '../../Styles/Announcement.css'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import { useNavigate } from 'react-router-dom';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import axios from 'axios'
import AllAnnouncements from '../Shared/AllAnnouncements';

const Announcement = () => {

    const Navigate = useNavigate()
    const URL = process.env.REACT_APP_SERVER_URL
    const [callOnce, setcallOnce] = useState(true)
    const [Announcement, setAnnouncement] = useState({
        title: '',
        message: ''
    })
    const handleChanges = (e) => {
        const { name, value } = e.target
        setAnnouncement(prev => ({ ...prev, [name]: value }))
    }

    const createAnnouncement = async () => {
        if (!callOnce) return;
        const isempty = Object.values(Announcement).some(val => val === undefined || val === null || val === '')
        if (isempty) alert('Fill up all information')
        try {
            setcallOnce(false)
            const res = await axios.post(`${URL}/admin/createannouncement`, { Announcement }, {
                withCredentials: true
            })
            if(res?.status === 200){
                window.location.reload()
            }
        } catch (error) {
            const status = error?.response?.status
            if (status === 404 || status === 403 || status === 500) {
                alert(error?.response?.data?.message)
            }
            setcallOnce(true)
        }
    }

    return (
        <div className='announcement'>
            <div className='go-back-sec'>
                <p style={{ fontFamily: 'flamebold', cursor: 'pointer' }} onClick={() => Navigate(-1)}>Dashboard</p>
                <span><KeyboardArrowLeftRoundedIcon /></span>
                <p style={{ color: 'black' }}>Annnouncements</p>
            </div>
            <div className='create-show-announcement'>
                <div className='show-announcements'>
                    <AllAnnouncements />
                </div>
                <div className='create-announcement'>
                    <input type="text" name="title" id="a-title" onChange={handleChanges} placeholder='Enter announcement title' />
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                        <textarea rows="3" name='message' onChange={handleChanges} placeholder='Write announcement details here...'></textarea>
                        <button onClick={createAnnouncement} style={{ cursor: callOnce ? 'pointer' : 'not-allowed' }}><SendRoundedIcon style={{ color: 'black' }} /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Announcement
