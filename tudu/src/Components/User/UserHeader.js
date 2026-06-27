import React, { useContext } from 'react'
import '../../Styles/UserHeader.css'
import logo from '../../Images/logo.png'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../App';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import SignOutApi from '../Controller/SignOutApi';

const UserHeader = () => {

    const { user } = useContext(ThemeContext)

    return (
        <div className='user-header'>

            <Link to={'/Flowtic'} id='links'>
            <img src={logo} alt="" id='logo' />
            </Link>

            <div className='nav-links'>
                <div>
                    <Link to={'/alltasks'} id='links'><p><WidgetsRoundedIcon style={{ color: 'black' }} /></p></Link>
                </div>
                <div>
                    <Link to={'/daily/weekly/monthly'} id='links'><p><CalendarMonthRoundedIcon style={{ color: 'black' }} /></p></Link>
                </div>
                <div>
                    <Link to={'/createtask'} id='links'><p><AddRoundedIcon style={{ color: 'black' }} /></p></Link>
                </div>
                <div>
                    <Link to={'/contactsupport/issues'} id='links'><p><SendRoundedIcon style={{ color: 'black', transform: 'rotate(-45deg)' }} /></p></Link>
                </div>
                <div>
                    <Link to={'/setting'} id='links'><p><SettingsRoundedIcon style={{ color: 'black' }} /></p></Link>
                </div>
                <div>
                    <Link to={'/announcements'} id='links'><p><CampaignRoundedIcon style={{ color: 'black' }} /></p></Link>
                </div>
            </div>

            <div className='btns'>
                {
                    !user ? <button>SignUp</button> :
                        <button onClick={()=>SignOutApi()}>SignOut</button>
                }
            </div>

        </div>
    )
}

export default UserHeader
