import React from 'react'
import UserHeader from './UserHeader'
import ChildDWM from './ChildDWM'
import '../../Styles/DWM.css'

const DWMTask = () => {
    return (
        <div className='userpanel'>
            <div className='child-panel'>

                <div className='panel-left-side'>
                    <UserHeader />
                </div>
                <div className='panel-right-side'>
                    <ChildDWM />
                </div>

            </div>
        </div>
    )
}

export default DWMTask
