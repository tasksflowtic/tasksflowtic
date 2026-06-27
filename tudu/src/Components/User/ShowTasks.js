import React from 'react'
import '../../Styles/ShowTasks.css'
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { reminderTask } from '../User/Reminder'

const ShowTasks = ({ tasks, callTA }) => {

  const Navigate = useNavigate()
  const viewtask = (task) => {
    const taskId = task?._id
    Navigate(`/viewtask/${task?.title}/${taskId}`)
  }

  return (
    <div className='showtasks-page'>
      <div className='childtasks-page'>
        {tasks?.tasks.length !== 0 ? tasks?.tasks.map((task, index) => {
          const reminder = callTA && reminderTask(task)
          return (
            <div className='task-popup' onClick={() => viewtask(task)}>
              <div className='title-status'>
                <h2>{task?.title}</h2>
                <p className={`${task?.status}`}>{task?.status}</p>
              </div>
              <p id='task-des'>{task?.description}</p>
              <div className='time-periority'>
                <div>
                  <div className='task-time'>
                    <p><span><WatchLaterRoundedIcon fontSize='extrasmall' /></span>{task?.starttime}</p>
                    <span id='hyphen'>-</span>
                    <p>{task?.endtime}</p>
                  </div>
                  {reminder > 0 && <p id='reminder-popup'>Only {reminder} minute left</p>}
                </div>
                <p className={`task-priority ${task?.category}`}>{task?.category}</p>
              </div>
            </div>
          )
        }) : <div className='no-task-sec'>
          <p>You don’t have any tasks yet</p>
          <Link to={'/createtask'} id='links'><button><AddRoundedIcon fontSize='small' />Create</button></Link>
        </div>
        }
      </div>
    </div>
  )
}

export default ShowTasks
