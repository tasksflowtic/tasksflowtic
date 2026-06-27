import React from 'react'
import '../../Styles/Announcement.css'
import AllAnnouncements from '../Shared/AllAnnouncements'
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { useNavigate } from 'react-router-dom';

const UserAnnouncement = () => {

    const Navigate = useNavigate()

    return (
        <div className='announcements-page'>
            <div className='go-back-page'>
                <span onClick={()=>Navigate(-1)}><KeyboardBackspaceRoundedIcon /></span>
                <p>Announcements</p>
            </div>
            <div style={{marginTop:'10px'}}>
                <AllAnnouncements />
            </div>
        </div>
    )
}

export default UserAnnouncement
