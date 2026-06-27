import React, { useState } from 'react'
import '../../Styles/ContactSupport.css'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import { useNavigate } from 'react-router-dom';
import cs from '../../Images/cs.png'
import axios from 'axios'
import AlertPopUp from '../Shared/AlertPopUp';

const ContactSupport = () => {

    const Navigate = useNavigate()
    const URL = process.env.REACT_APP_SERVER_URL
    const [callOnce, setcallOnce] = useState(true)
    const [error, seterror] = useState()
    const [message, setmessage] = useState({
        issue: '',
        message: ''
    })
    const handlechanges = (e) => {
        const { name, value } = e.target
        setmessage(prev => ({ ...prev, [name]: value }))
    }

    const sendMessage = async (e) => {
        e.preventDefault()
        if (!callOnce) return;
        if (!message) return;
        try {
            setcallOnce(false)
            const res = await axios.post(`${URL}/support/message`, { message }, {
                withCredentials: true
            })
            if(res?.status === 200){
                window.location.reload()
            }
        } catch (error) {
            const status = error?.response?.status
            if (status === 404 || status === 500) {
                seterror(error?.response?.data?.message)
            }
            setcallOnce(true)
        }
    }

    return (
        <>
            <AlertPopUp error={error} />
            <div className='contact-support'>
                <div className='cs-go-back'>
                    <button onClick={() => Navigate(-1)}><KeyboardArrowLeftRoundedIcon /></button>
                    <p>Contact Support</p>
                </div>
                <div className='cs-page' style={{ marginTop: '15px' }}>
                    <div className='cs-top-content'>
                        <img src={cs} alt="" id='cs-img' />
                        <h3>We,re here to help</h3>
                        <p>Have a question, feedback or need help <br /> Send us a message we,ll get back to you soon </p>
                    </div>
                    <div className='cs-form'>
                        <form onSubmit={sendMessage}>
                            <input type="text" name="issue" id="" onChange={handlechanges} placeholder='What the issue?' />
                            <textarea cols="30" rows="3" name='message' placeholder='Message' onChange={handlechanges}></textarea>
                            <button type='submit' style={{ cursor: callOnce ? 'pointer' : 'not-allowed' }}>Send message</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactSupport
