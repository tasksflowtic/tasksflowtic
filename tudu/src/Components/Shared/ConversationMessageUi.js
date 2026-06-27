import React, { useContext, useState } from 'react'
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { ThemeContext } from '../../App';
import axios from 'axios'

const ConversationMessageUi = ({ conversationId, setdata }) => {

    const URL = process.env.REACT_APP_SERVER_URL
    const { user } = useContext(ThemeContext)
    const [Message, setMessage] = useState()
    const [callOnce, setcallOnce] = useState(true)
    const sendMessage = async () => {
        if (!conversationId) return;
        if(!callOnce) return;
        if (!Message) return alert('Message cannot be empty')
        try {
    setcallOnce(false) 
            const res = await axios.post(`${URL}/contactsupport/create/${conversationId}`, { Message }, {
                withCredentials: true
            })
            if(res?.status === 200){
                setdata(prev => ({
                ...prev,
                conversation: {
                    ...prev.conversation,
                    messages: [...prev.conversation.messages, {
                        message: Message,
                        role: user?.Role
                    }]
                }
            }))
            }
            setMessage('')
            setcallOnce(true)
        } catch (error) {
            const status = error?.response?.status
            if (status === 500 || status === 404) {
                return alert(error?.response?.data?.message)
            }
            setcallOnce(true)
        }
    }

    return (
        <div>
            <input type="text" name="message" id="" value={Message} onChange={(e) => setMessage(e.target.value)} placeholder='Write your message' />
            <button onClick={sendMessage}><SendRoundedIcon style={{ color: '#3B82F6', cursor: callOnce ? 'pointer' : 'not-allowed' }} /></button>
        </div>
    )
}

export default ConversationMessageUi
