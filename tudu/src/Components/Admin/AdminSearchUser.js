import React, { useState, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const AdminSearchUser = () => {

    const URL = process.env.REACT_APP_SERVER_URL
    const Navigate = useNavigate()
    const timerRef = useRef(null);
    const [searchUsers, setsearchUsers] = useState([])

    const searchUser = (e) => {
        const Query = e.target.value
        if (!Query) return;

        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(async () => {
            try {
                const res = await axios.get(`${URL}/admin/searchuser/${Query}`, {
                    withCredentials: true
                })
                setsearchUsers(res?.data?.users)
            } catch (error) {
                const status = error?.response?.status
                if (status === 500 || status === 403) {
                    alert(error?.response?.data?.message)
                }
            }
        }, 1000);
    }

    const viewSearchUser = (user) => {
        const userId = user?._id
        if (!userId) return
        Navigate(`/admin/user/${userId}`)
    }

    return (
        <div className='search-user-page'>
            <div id='search-sec'>
                <form>
                    <input type="serach" name="query" id="" onChange={searchUser} placeholder='Search user' />
                </form>
            </div>
            <div id='show-search-user'>
                {
                    searchUsers.length > 0 ? searchUsers.map((user, index) => {
                        return (
                            <div className='searched-user' onClick={() => viewSearchUser(user)}>
                                <div style={{ alignItems: 'center' }}>
                                    <span>{user?.name.split('')[0].toUpperCase()}</span>
                                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                                        <h1>{user?.name.charAt(0).toUpperCase()}{user?.name.slice(1)}</h1>
                                        <p style={{ color: '#9A9AA3', fontSize: '12px' }}>{user?.email}</p>
                                    </div>
                                </div>

                                <p style={{ fontSize: '14px' }}>{user?.isActive ? 'Active' : 'Suspend'}</p>
                            </div>
                        )
                    }) : <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '100px' }}>Search user</p>
                }
            </div>
        </div>
    )
}

export default AdminSearchUser
