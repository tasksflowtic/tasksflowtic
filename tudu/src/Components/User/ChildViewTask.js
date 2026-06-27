import React, { useState } from 'react'
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { useNavigate } from 'react-router-dom';
import TaskCategoryUi from './TaskCategoryUi';
import { DatePicker } from 'antd';
import usePatch from '../../Hooks/usePatch';
import useDelete from '../../Hooks/useDelete';

const ChildViewTask = ({ tasks, taskId }) => {
    const URL = process.env.REACT_APP_SERVER_URL
    const [task, settask] = useState(tasks ? tasks : {})
    const [callOnce, setcallOnce] = useState(false)
    const [canDlt, setcanDlt] = useState(true)
    const Navigate = useNavigate()
    const { patchdata, updateError} = usePatch(`${URL}/updatetask/${taskId}`, setcallOnce) //update custom hook
    const { deleteData, dlterror } = useDelete(`${URL}/deletetask/${taskId}`, setcanDlt)
    if (updateError) alert(updateError)
    if (dlterror) alert(dlterror)

    const handlePicker = (name, value) => {
        settask(prev => ({ ...prev, [name]: value }))
        setcallOnce(true)
    }
    const handleChanges = (e) => {
        const { name, value } = e.target
        settask(prev => ({ ...prev, [name]: value }))
        setcallOnce(true)
    }
    // update task
    const updateTask = () => {
        if (!callOnce) return;
        if(!task?.repeat) {
            delete task?.repeat
        }
        const isempty = Object.values(task).some(val => val === undefined || val === null || val === '')
        if (isempty) return alert('Filed cannot be empty')
        setcallOnce(false)
        patchdata(task)
    }
    // dlt task
    const deletetask = () => {
        if (!canDlt) return;
        setcanDlt(false)
        deleteData()
    }

    return (
        <div className='child-view-task'>
            <div className='viewtask-header'>
                <button id='back-btn' onClick={() => Navigate(-1)}><KeyboardBackspaceRoundedIcon /></button>
            </div>
            <div className='task-content'>
                <div id='task-t-status'>
                        <input type="text" name="title" id="title" value={task?.title} onChange={handleChanges} />
                        <select id='slt-box' name='status' onChange={handleChanges}>
                            <option value="">Select</option>
                            <option value="Pending">Pending</option>
                            <option value="In progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                    <textarea rows={3} name="description" id="des" value={task?.description} onChange={handleChanges} ></textarea>
                    <TaskCategoryUi task={task} settask={settask} setcanUpdate={callOnce} />
                    <select name='repeat' id='task-status' onChange={handleChanges} style={{ width: '100%', marginTop: '10px' }}>
                        <option value="">{task?.repeat ? task?.repeat : 'None'}</option>
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                    </select>
                    <div className='s-e-time'>
                        <div className='time-pick' style={{ width: '48%' }}>
                            <label>Start time</label>
                            <input type="time" name="starttime" id="" value={task?.starttime} onChange={handleChanges} />
                        </div>
                        <div className='time-pick' style={{ width: '48%' }}>
                            <label>End time</label>
                            <input type="time" name="endtime" id="" value={task?.endtime} onChange={handleChanges} />
                        </div>
                    </div>
                    <div className='time-pick'>
                        <label>Due date:- {task?.dueDate}</label>
                        <DatePicker name='duedate' onChange={(time, timestring) => handlePicker('dueDate', timestring)} style={{ height: '30px', marginTop:'5px' }} />
                    </div>
                    <div className='task-btns'>
                        <button id='dlt-btn' onClick={() => deletetask()} style={{ cursor: canDlt ? 'pointer' : 'not-allowed' }}>Delete</button>
                        <button id='updt-btn' onClick={()=>updateTask()} type='submit' style={{ cursor: callOnce ? 'pointer' : 'not-allowed' }}>Update</button>
                    </div>
            </div>
        </div>
    )
}

export default ChildViewTask
