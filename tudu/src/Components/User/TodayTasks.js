import React from 'react'
import useGet from '../../Hooks/useGet'
import ShowTasks from './ShowTasks'
import '../../Styles/ShowTasks.css'
import AlertPopUp from '../Shared/AlertPopUp'

const TodayTasks = () => {
    const callTA = true //use for call reminder
    const URL = process.env.REACT_APP_SERVER_URL
    const { data, error, loading } = useGet(`${URL}/todaytask`)
    if (loading) return <p>Loading...</p>
    if(error) return <AlertPopUp error={error}/>
    
    return (
        <div className='todaytasks'>
            {/* header */}
            <div className='childalltask-header'>
                <h3>Today's Tasks</h3>
            </div>
            <ShowTasks tasks={data} callTA={callTA}/>
        </div>
    )
}

export default TodayTasks
