import React, { useContext } from 'react'
import '../../Styles/ViewTask.css'
import ChildViewTask from './ChildViewTask';
import useGet from '../../Hooks/useGet';
import { ThemeContext } from '../../App';
import { useParams } from 'react-router-dom';

const ViewTask = () => {
  const { taskId } = useParams()
  const { token } = useContext(ThemeContext)
  const URL = process.env.REACT_APP_SERVER_URL
  const { data, error, loading } = useGet(`${URL}/taskdetail/${taskId}`, token)
  if (error) return alert(error)
    if(loading) return <h1>Loading...</h1>

  return (
    <div className='view-task-page'>
      <ChildViewTask tasks={data?.task} taskId={taskId}/>
    </div>
  )
}

export default ViewTask
