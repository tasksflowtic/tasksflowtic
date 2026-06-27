import React, { useState } from 'react'
import useGet from '../../Hooks/useGet'
import ShowTasks from './ShowTasks'
import Calendar from './Calendar'
import AlertPopUp from '../Shared/AlertPopUp'

const ChildShowTasks = () => {

    const [date, setsltDate] = useState('alltask')
    const URL = process.env.REACT_APP_SERVER_URL
    const { data, loading, error } = useGet(`${URL}/alltasks/${date}`)
    if (loading) return <p>Loading...</p>
    if (error) return <AlertPopUp error={error} />

    return (
        <div className='all-task-page'>
            <div className='childall-task-page'>
                {/* header */}
                <div className='childalltask-header'>
                    <h3>All Tasks</h3>
                    {/* <button id='clear-btn'>Clear</button> */}
                    <Calendar setsltDate={setsltDate} />
                </div>

                <div className='show-all-tasks-sec'>
                    <ShowTasks tasks={data} />
                </div>

            </div>
        </div>
    )
}

export default ChildShowTasks
