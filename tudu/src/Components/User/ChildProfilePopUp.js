import React, { useContext } from 'react'
import '../../Styles/EditProfile.css'
import { ThemeContext } from '../../App'
import { useNavigate } from 'react-router-dom'

const ChildProfilePopUp = () => {

    const { user } = useContext(ThemeContext)
    const Navigate = useNavigate()
    const toeditProfile = () => {
        Navigate(`/profile/edit/${user?._id}`, { state: { user } })
    }

    return (
        <div className='child-profile-popup'>
            <div className='name-card' onClick={toeditProfile}>
                <h1>{user?.name.split('')[0].toUpperCase()}</h1>
            </div>
            <h1 id='username'>{user?.name.toUpperCase()}</h1>
        </div>
    )
}

export default ChildProfilePopUp
