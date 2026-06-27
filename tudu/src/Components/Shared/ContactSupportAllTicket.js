import React from 'react'
import UserHeader from '../User/UserHeader'
import useGet from '../../Hooks/useGet'
import '../../Styles/ContactSupport.css'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { useNavigate } from 'react-router-dom'
import AlertPopUp from './AlertPopUp'

const ContactSupportCard = () => {

    const URL = process.env.REACT_APP_SERVER_URL
    const Navigate = useNavigate()
    const { data, error, loading } = useGet(`${URL}/contactsupport/allissues`)
    if (loading) return <h1>Loading...</h1>
    if(error) return <AlertPopUp error={error}/>

    const getConversation = (ticket) => {
        const conversationId = ticket?._id
        if (!conversationId) return;
        Navigate(`/support/request/${conversationId}`)
    }

    return (
        <div className='userpanel'>
            <div className='child-panel'>
                <div className='panel-left-side'>
                    <UserHeader />
                </div>
                <div className='panel-right-side'>
                    <div className='allissues-page'>
                        <h1 style={{fontSize:'20px',fontWeight:'lighter'}}>Support Requests</h1>
                        <div className="issue-card-sec">
                            {
                                data?.allIssues.length > 0 ? data?.allIssues.map((ticket, index) => {
                                    return (
                                        <div className='issue-card' onClick={() => getConversation(ticket)}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div className='name-box'>
                                                    <span>{ticket?.name.split('')[0].toUpperCase()}</span>
                                                </div>
                                                <div className='ticket-content'>
                                                    <h1>{ticket?.name.charAt(0).toUpperCase() + ticket?.name.slice(1)}</h1>
                                                    <p>{ticket?.issue}</p>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div className='status-createdAt'>
                                                    <span className={`ticket-status ${ticket?.status}`}>{ticket?.status}</span>
                                                    <span style={{ color: '#9A9AA3', fontSize: '10px' }}>{ticket?.createdAt.split('T')[0]}</span>
                                                </div>
                                                <span id='right-icon'><ChevronRightRoundedIcon style={{ color: '#9A9AA3' }} /></span>
                                            </div>
                                        </div>
                                    )
                                }) : <h1 id='no-tickets'>No Support Requests Yet</h1>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactSupportCard
