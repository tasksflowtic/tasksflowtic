import React from 'react'
import '../../Styles/AccountSuspend.css'
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';

const AccountSuspend = () => {
    return (
        <div className='account-suspend'>
            <div className='accound-suspend-child'>
                <div className='suspended-container'>
                    <span><BlockRoundedIcon style={{fontSize:'100px',color:'red'}}/></span>
                    <h1>Your account is suspended</h1>
                    <p>Your account has been suspended by administrator <br /> You currenty can't create, edit or manage you tasks</p>
                </div>
                <div className='suspension-date-section'>
                    <span><CalendarMonthRoundedIcon style={{fontSize:'30px',color:'#3B82F6'}}/></span>
                    <div className='suspension-date-content'>
                        <span>Suspended on</span>
                        {/* <p>{suspendDate && suspendDate.split('T')[0]}</p> */}
                    </div>
                </div>
                <div className='suspension-need-help'>
                        <span><TaskAltRoundedIcon style={{fontSize:'30px',color:'#3B82F6'}}/></span>
                        <div className='suspension-need-help-content'>
                            <h1>Contact Support</h1>
                            <p>If you believe this suspension was a mistake, please contact us via email. We're here to help you</p>
                            <span>tasksflowtic@gmail.com</span>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default AccountSuspend
