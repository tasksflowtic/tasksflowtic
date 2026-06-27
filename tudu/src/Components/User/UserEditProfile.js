import React, { useState } from 'react'
import '../../Styles/EditProfile.css'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import usePatch from '../../Hooks/usePatch'

const UserEditProfile = () => {

  const URL = process.env.REACT_APP_SERVER_URL
  const Navigate = useNavigate()
  const location = useLocation()
  const user = location.state?.user
  const [profile, setprofile] = useState(user)
  const [callOnce, setcallOnce] = useState(false)
  // custom hook
  const { patchdata, updateError} = usePatch(`${URL}/updateprofile`, setcallOnce)

  const handlechanges = (e) => {
    const { name, value } = e.target
    setprofile(prev => ({ ...prev, [name]: value }))
    setcallOnce(true)
  }

  const updateProfile = async (e) => {
    e.preventDefault()
    if (!callOnce) return;
    const isNameempty = profile?.name === '' || profile?.name === null || profile?.name === undefined
    if (isNameempty) return alert('Username cannot be empty')
    setcallOnce(false)
    patchdata(profile)
    setTimeout(() => {
      Navigate('/user')
      window.location.reload()
    }, 2000);
  }

  if (updateError) return alert(updateError)

  return (
    <div className='edit-profile-page'>
      <div className='child-edit-profile-page'>
        <div id='go-back'>
          <h3 onClick={() => Navigate(-1)}>Home</h3>
          <span>/</span>
          <h3 style={{ color: 'black', fontFamily: 'flamebold' }}>Edit profile</h3>
        </div>

        <div className='profile-content-page'>
          <p style={{ fontSize: '14px' }}>Make changes to your account details here.</p>
          <div className='profile-content' style={{ marginTop: '15px' }}>

            <form onSubmit={updateProfile}>
              <div className='name-popup'>
                <h1>{user?.name.split('')[0].toUpperCase()}</h1>
              </div>
              <div className='input-box'>
                <label for="profile-inp">Fullname</label>
                <input type="text" name="name" id="profile-inp" value={profile?.name} onChange={handlechanges} />
              </div>
              <div className='input-box'>
                <label for="profile-inp">Email</label>
                <input type="email" name="email" value={profile?.email} id="profile-inp" />
              </div>
              <div className='input-box'>
                <label for="profile-inp">Phone</label>
                <input type="tel" name="phone" id="profile-inp" value={profile?.phone ? user?.phone : 'xxxxxxxxxx'} />
              </div>
              <p id='createdAt'>{profile?.createdAt.split('T')[0]}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '15px' }}>
                <button id='reset-btn' type='submit'>Reset</button>
                <button id='update-btn' type='submit' style={{ cursor: callOnce ? 'pointer' : 'not-allowed' }}>Update</button>
              </div>
            </form>

          </div>

        </div>

      </div>
    </div>
  )
}

export default UserEditProfile
