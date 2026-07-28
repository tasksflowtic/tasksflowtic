import React, { useState } from 'react'
import '../../Styles/CreateTask.css'
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { DatePicker } from 'antd';
import TaskCategoryUi from './TaskCategoryUi';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const CreateProject = () => {

    const Navigate = useNavigate()
    const [callonce, setcallonce] = useState(true)
    const [project, setproject] = useState({
        projectname: '',
        projectdes: '',
        category: '',
        startdate: '',
        duedate: ''
    })

    const handlechanges = (e) => {
        const { name, value } = e.target
        setproject(prev => ({ ...prev, [name]: value }))
    }
    const handlepicker = (name, value) => {
        setproject(prev => ({ ...prev, [name]: value }))
    }

    const createProject = async (e) => {
        e.preventDefault()
        if (!callonce) return;
        const isempty = Object.values(project).some(val => val === '' || val === null || val === undefined)
        if (isempty) return alert('Fill up all information')
        try {
            setcallonce(false)
            const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/createproject`, { project }, {
                withCredentials: true
            })
            if (res?.status === 200) {
                window.location.reload()
            }
        } catch (err) {
            const status = err?.response?.status
            if (status === 404 || status === 500) {
                alert(err?.response?.data?.message)
            }
            setcallonce(true)
        }
    }

    return (
        <div className='create-project-main'>
            <div className='go-back'>
                <button onClick={()=>Navigate(-1)}><KeyboardBackspaceRoundedIcon /></button>
                <h1>Start a New Project</h1>
            </div>
            <div className='project-form'>
                <form onSubmit={createProject}>
                    <div className='data-inp'>
                        <label for="projectname">Project name</label>
                        <input type="text" name="projectname" id="projectname" onChange={handlechanges} placeholder='Project Name' />
                    </div>
                    <div className='data-inp'>
                        <label for="projectname">Project Description</label>
                        <textarea rows="3" name='projectdes' onChange={handlechanges} placeholder='Project description'></textarea>
                    </div>
                    <div>
                        <TaskCategoryUi task={project} settask={setproject} />
                    </div>
                    <div className='data-inp' style={{ width: '42%' }}>
                        <label for="startdate">Start Date</label>
                        <DatePicker onChange={(time, timestring) => handlepicker('startdate', timestring)} />
                    </div>
                    <div className='data-inp' style={{ width: '42%' }}>
                        <label for="enddate">End Date</label>
                        <DatePicker onChange={(time, timestring) => handlepicker('duedate', timestring)} />
                    </div>
                    <button type='submit' style={{ cursor: callonce ? 'pointer' : 'not-allowed' }}>{callonce ? 'Create new project' : 'Creating new project...'}</button>
                </form>
            </div>
        </div>
    )
}

export default CreateProject
