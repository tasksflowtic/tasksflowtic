import React, { useEffect, useState } from 'react'
import '../../Styles/AdminDashboard.css'
import DashboardHeader from './DashboardHeader'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import AdminSearchUser from './AdminSearchUser';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {

  const URL = process.env.REACT_APP_SERVER_URL
  const [Dashboard, setDashboard] = useState()
  const Navigate = useNavigate()

  useEffect(() => {
    const adminDashboard = async () => {
      try {

        const res = await axios.get(`${URL}/adminDashboard`, {
          withCredentials: true
        })
        setDashboard(res?.data)
      } catch (error) {
        const status = error?.response?.status
        if (status === 403 || status === 404 || status === 500) {
          return alert(error?.response?.data?.message)
        }
      }
    }
    adminDashboard()
  })

  const toUserProfile = (user) => {
    const userId = user?._id
    if (!userId) return
    Navigate(`/admin/user/${userId}`)
  }

  return (
    <div className="dashboard">
      <div className='tn-dashboard'>
        <DashboardHeader />
        <div className='dashboard-layout-page'>
          {/* dashboard cards */}
          <div className='dashboard-card-details-wrapper'>
            <div className='dashboard-details-card'>
              <div className='dashboard-card' style={{ background: 'black' }}>
                <p style={{ color: 'white' }}>All users</p>
                <div>
                  <span style={{ color: 'white' }}>{Dashboard?.allUsers}</span>
                  <button style={{ color: 'white' }}>View all <KeyboardArrowRightRoundedIcon fontSize='small' /></button>
                </div>
              </div>
              <div className='dashboard-card'>
                <p>All Suspend user</p>
                <div>
                  <span>{Dashboard?.suspendUsers}</span>
                </div>
              </div>
              <div className='dashboard-card'>
                <p>Total tasks</p>
                <div>
                  <span>{Dashboard?.allTasks}</span>
                </div>
              </div>
              <div className='dashboard-card'>
                <p>Pending tasks</p>
                <div>
                  <span>{Dashboard?.pendingTask}</span>
                </div>
              </div>
              <div className='dashboard-card'>
                <p>Completed tasks</p>
                <div>
                  <span>{Dashboard?.completedTasks}</span>
                </div>
              </div>
            </div>
          </div>
          {/* dashboard-cards end */}
          <div className='last-records-serach-page'>
            <div id='chart-today-user'>

              <div className='last-user-task-records'>
                <h1>Last 7 day,s activity</h1>
                <div id='chart-sec'>
                  <div id='chart-range' style={{
                    height: `${((Dashboard?.sevenDaysAgoUsers || 0) /
                      (Dashboard?.allUsers || 1)) * 150}px`,
                  }}></div>
                  <span>All users</span>
                </div>
                <div id='chart-sec'>
                  <div id='chart-range' style={{
                    height: `${((Dashboard?.sevenDaysAgoTasks || 0) /
                      (Dashboard?.allTasks || 1)) * 150}px`,
                      background: '#f1f1f1'
                  }}></div>
                  <span >All tasks</span>
                </div>
                <div id='chart-sec'>
                  <div id='chart-range' style={{
                    height: `${((Dashboard?.sevenDaysAgoPendingTasks || 0) /
                      (Dashboard?.pendingTask || 1)) * 150}px`,
                      background: 'orange'
                  }}></div>
                  <span >Pending</span>
                </div>
                <div id='chart-sec'>
                  <div id='chart-range' style={{
                    height: `${((Dashboard?.sevenDaysAgoCompletedTasks || 0) /
                      (Dashboard?.completedTasks || 1)) * 150}px`,
                      background: 'red'
                  }}></div>
                  <span>Complete</span>
                </div>
              </div>

              {/* today user */}
              <div className='child-today-user'>
                <h1 className='signupuser-title'>Today signup user</h1>
                {
                  Dashboard?.todayUsers.length > 0 ? Dashboard?.todayUsers.map((user, index) => {
                    return (
                      <div id='signupuser' style={{ marginTop: '5px' }} onClick={() => toUserProfile(user)}>
                        <h1>{user?.name.charAt(0).toUpperCase()}{user?.name.slice(1)}</h1>
                        <p>{user?.email}</p>
                        <span>{user?.isActive ? 'Active' : 'Suspend'}</span>
                      </div>
                    )
                  }) : <p style={{ color: 'white', fontSize: '14px' }}>No Users Have Signed Up Yet</p>
                }
              </div>

            </div>
            <div className='search-user'>
              <AdminSearchUser />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
