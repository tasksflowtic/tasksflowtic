import React, { useState } from 'react'
import logo from '../../Images/logo.png'
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { Link } from 'react-router-dom';
import SignOutApi from '../Controller/SignOutApi';

const DashboardHeader = () => {

    const [showLinks, setshowLinks] = useState(false)

    return (
        <div className='dashboard-header'>
            <img src={logo} alt="" />
            <div className='d-right-side'>
                <div className='adminprofile' onClick={() => setshowLinks(prev => !prev)}>
                    <div className='a-name' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span>A</span>
                    </div>
                    <div style={{ marginLeft: '10px', marginRight: '10px' }}>
                        <h1>Admin</h1>
                        <p>Super Admin</p>
                    </div>
                    <ArrowDropDownRoundedIcon style={{ color: 'black' }} />
                </div>
                {showLinks && <div className='dashboard-links-sec'>
                    <div>
                        <Link to={'/admin/profile'} id='dashboard-links'>
                            <p>Profile</p>
                            <span><KeyboardArrowRightRoundedIcon fontSize='small' /></span>
                        </Link>
                    </div>
                    <div>
                        <Link to={'/admin/contactsupport/requests'} id='dashboard-links'>
                            <p>Contact support</p>
                            <span><KeyboardArrowRightRoundedIcon fontSize='small' /></span>
                        </Link>
                    </div>
                    <div>
                        <Link to={'/admin/announcements'} id='dashboard-links'>
                            <p>Announcement</p>
                            <span><KeyboardArrowRightRoundedIcon fontSize='small' /></span>
                        </Link>
                    </div>
                    <div>
                        <button onClick={()=>SignOutApi()}>SignOut</button>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default DashboardHeader
