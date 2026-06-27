import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useGet from '../../Hooks/useGet'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import '../../Styles/EditProfile.css'
import usePatch from '../../Hooks/usePatch';

const AdminUserProfile = () => {

    const { userId } = useParams()
    const URL = process.env.REACT_APP_SERVER_URL
    const Navigate = useNavigate()
    const [callOnce, setcallOnce] = useState(true)
    const { data, error, loading } = useGet(`${URL}/admin/userProfile/${userId}`)
    const { updateError, patchdata } = usePatch(`${URL}/admin/user/${userId}/suspend`, setcallOnce)
    if (updateError) alert(updateError)
    if (error) alert(error)
    if (loading) return <h1>Loading...</h1>

    const statusController = () => {
        if(!callOnce) return;
        setcallOnce(false)
        patchdata()
    }

    return (
        <div className='a-user-profile'>
            <div className='tn-a-user-profile'>
                <div className='go-back-sec'>
                    <p style={{ cursor: 'pointer' }} onClick={() => Navigate(-1)}>Dashaboard</p>
                    <span><KeyboardArrowLeftRoundedIcon /></span>
                    <p style={{ color: 'black' }}>User profile</p>
                </div>
                <div className='a-user-profile-data'>

                    <div className='top-profile-data'>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div className='name-letter'>
                                <h1>{data?.user?.name.split('')[0].toUpperCase()}</h1>
                            </div>
                            <div className='personal-info'>
                                <h1>{data?.user?.name.charAt(0).toUpperCase() + data?.user?.name.slice(1)}</h1>
                                <p>{data?.user?.email}</p>
                                <p>{data?.user?.phone ? data?.user?.phone : 'Phone not provide'}</p>
                                <span>Joined on: {data?.user?.createdAt.split('T')[0]}</span>
                            </div>
                        </div>
                        <div className='user-active-status'>
                            <button onClick={statusController} style={{cursor:callOnce?'pointer':'not-allowed'}}>{data?.user?.isActive ? 'Suspend' : 'Active'}</button>
                        </div>
                    </div>

                    <div className='user-task-data'>
                        <div style={{ background: '#1A1A1A', color: '#F0A250' }}>
                            <p style={{ color: 'white' }}>All tasks</p>
                            <span style={{ color: 'white' }}>{data?.allTasks}</span>
                        </div>
                        <div >
                            <p>Pending tasks</p>
                            <span>{data?.pendingTasks}</span>
                        </div>
                        <div >
                            <p>Completed tasks</p>
                            <span>{data?.completedTasks}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminUserProfile
