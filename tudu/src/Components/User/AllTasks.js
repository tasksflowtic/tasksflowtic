import React from 'react'
import UserHeader from './UserHeader'
import '../../Styles/AllTasks.css'
import ChildShowTasks from './ChildAllTasks'

const AllTasks = () => {
    return (
        <div className='userpanel'>
            <div className='child-panel'>

                <div className='panel-left-side'>
                    <UserHeader />
                </div>
                <div className='panel-right-side'>
                    <ChildShowTasks />
                </div>
            </div>
        </div>
    )
}

export default AllTasks
