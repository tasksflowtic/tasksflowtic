import React from 'react'
import '../../Styles/AdminProfile.css'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';

const AdminProfile = () => {



    return (
        <div className='adminprofile-page'>
            <div className='go-back-sec'>
                <p style={{ fontFamily: 'flamebold', cursor: 'pointer' }}>Dashboard</p>
                <span><KeyboardArrowLeftRoundedIcon fontSize='small' /></span>
                <p style={{ color: 'black' }}>Profile</p>
            </div>
            <div className='profile-data'>
                <div className='admin-name'>
                    <h1>A</h1>
                    <p>Admin</p>
                </div>
                <div className='profile-form'>
                    <div>
                            <label>Name</label>
                            <p>Admin</p>
                        </div>
                        <div>
                            <label>Email</label>
                            <p>@gmail.com</p>
                        </div>
                        <div>
                            <label>Password</label>
                            <p>xxxxxxxxxx</p>
                        </div>
                        <div>
                            <label>Unique key</label>
                            <p>Unique key</p>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default AdminProfile
