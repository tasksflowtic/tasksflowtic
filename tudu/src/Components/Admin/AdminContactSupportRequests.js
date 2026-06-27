import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../App'
import '../../Styles/ContactSupport.css'
import axios from 'axios'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import { useNavigate } from 'react-router-dom';

const AdminContactSupportRequests = () => {

    const Navigate = useNavigate()
    const URL = process.env.REACT_APP_SERVER_URL
    const { token } = useContext(ThemeContext)
    const [contactsupportRequests, setcontactsupportReuquests] = useState([])

    useEffect(() => {
        const getContactSupportRequests = async () => {
            try {
                const res = await axios.get(`${URL}/contactsupport/allissues`, {
                    withCredentials: true
                })
                setcontactsupportReuquests(res?.data?.allIssues)
            } catch (error) {
                const status = error?.response?.status
                if (status === 400 || status === 500) {
                    alert(error?.response?.data?.message)
                }
            }
        }
        getContactSupportRequests()
    }, [URL, token])

    const getConversation = (ticket) => {
        const conversationId = ticket?._id
        if (!conversationId) return;
        Navigate(`/support/request/${conversationId}`)

    }

    return (
        <div className='admin-contact-support-requests'>
            <div className='go-back-sec'>
                <p style={{ fontFamily: 'flamebold', cursor:'pointer'}} onClick={()=>Navigate(-1)}>Dashaboard</p>
                <span><KeyboardArrowLeftRoundedIcon /></span>
                <p style={{ color: 'black' }}>Contact support requests</p>
            </div>
            <div className='cs-requests'>
                {
                    contactsupportRequests.length > 0 ? contactsupportRequests.map((ticket, index) => {
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
    )
}

export default AdminContactSupportRequests
