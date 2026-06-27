import React, { useContext, useState } from 'react'
import { ThemeContext } from '../../App'
import useGet from '../../Hooks/useGet'
import ShowTasks from './ShowTasks'
import AlertPopUp from '../Shared/AlertPopUp'

const ChildDWM = () => {

    const dwm = ['Daily', 'Weekly', 'Monthly']
    const [repeatType, setrepeatType] = useState('Daily')
    const URL = process.env.REACT_APP_SERVER_URL
    const { token } = useContext(ThemeContext)
    const { data, loading, error } = useGet(`${URL}/getdwmtask/${repeatType}`, token)
    if (loading) return <h1>Loading...</h1>
    if(error) return <AlertPopUp error={error} />

    const handleType = (data) => {
        if (repeatType === data) return;
        setrepeatType(data)
    }

    return (
        <div className='dwm-page'>
            <div className='bwm-btns'>
                {
                    dwm.map((data, index) => {
                        return (
                            <button className={`${data}`} onClick={() => handleType(data)}>{data}</button>
                        )
                    })
                }
            </div>
            <ShowTasks tasks={data} />

        </div>
    )
}

export default ChildDWM
