import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../../Styles/SupportConversation.css'
import useGet from '../../Hooks/useGet'
import { ThemeContext } from '../../App'
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import ConversationMessageUi from './ConversationMessageUi'
import usePatch from '../../Hooks/usePatch'

const SupportConversations = () => {
    const { conversationId } = useParams()
    const Navigate = useNavigate()
    const [callOnce, setcallOnce] = useState(true)
    const { role, user } = useContext(ThemeContext)
    const URL = process.env.REACT_APP_SERVER_URL
    const { data, setdata, error, loading } = useGet(`${URL}/support/message/${conversationId}`)
    const { patchdata, updateError } = usePatch(`${URL}/admin/contactsupport/${conversationId}`, setcallOnce)
    if (loading) return <h1>Loading...</h1>
    if (error) alert(error)
    if (updateError) alert(updateError)

    const handleConversationStatus = async (e) => {
        if (!callOnce) return;
        const requestStatus = e.target.value
        if (!requestStatus) return;
        if (!conversationId) return;
        setcallOnce(false)
        patchdata(requestStatus)
    }

    return (
        <div className='support-conversation-page'>
            <div className='conversation-header'>
                <div className='header-leftside'>
                    <button onClick={() => Navigate(-1)}><KeyboardBackspaceRoundedIcon /></button>
                    <div>
                        <span>R</span>
                    </div>
                    <h1>{data?.conversation?.name.split('')[0].toUpperCase()+data?.conversation?.name.slice(1)}</h1>
                    <p></p>
                </div>
                {role === 'Admin' && user?.Role === 'Admin' && <select onChange={handleConversationStatus}>
                    <option value="">Update</option>
                    <option value="Pending">Pending</option>
                    <option value="Open">Open</option>
                    <option value="Resolve">Resolve</option>
                </select>}
            </div>
            <div className='message-ui' style={{ display: 'flex', flexDirection: 'column' }}>
                {
                    data?.conversation.messages.length > 0 ? data?.conversation?.messages.map((msg, index) => {
                        return (
                            <div className={`msg-popup ${msg?.role}`} style={{alignSelf:user?.Role === msg?.role ? 'flex-end':'flex-start'}}>
                                <p>{msg?.message}</p>
                            </div>
                        )
                    }) : <h1>No Messages Yet</h1>
                }
            </div>
            <div className='send-message'>
                <ConversationMessageUi conversationId={conversationId} setdata={setdata} />
            </div>
        </div>
    )
}

export default SupportConversations
