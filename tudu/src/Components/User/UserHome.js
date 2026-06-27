import React from 'react'
import '../../Styles/UserPanel.css'
import UserHeader from './UserHeader'
import ChildProfilePopUp from './ChildProfilePopUp'
import TodayTasks from './TodayTasks'

const UserHome = () => {
    return (
        <div className='userpanel'>
            <div className='child-panel'>

                <div className='panel-left-side'>
                    <UserHeader />
                </div>
                <div className='panel-right-side'>
                    <ChildProfilePopUp />
                    <TodayTasks />
                </div>

            </div>
        </div>
    )
}

export default UserHome
