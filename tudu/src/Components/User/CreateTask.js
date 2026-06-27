import React from 'react'
import UserHeader from './UserHeader'
import ChildCreateTasks from './ChildCreateTasks'
import '../../Styles/CreateTask.css'

const CreateTask = () => {
  return (
    <div className='userpanel'>
            <div className='child-panel'>
                <div className='panel-left-side'>
                    <UserHeader />
                </div>
                <div className='panel-right-side'>
                 <ChildCreateTasks/>
                </div>

            </div>
        </div>
  )
}

export default CreateTask
