import React from 'react'
import useGet from '../../Hooks/useGet'
import AlertPopUp from './AlertPopUp'

const AllAnnouncements = () => {

    const URL = process.env.REACT_APP_SERVER_URL
    const { data, error, loading} = useGet(`${URL}/announcements`)
    if(loading) return <h1>Loading...</h1>
    if(error) return <AlertPopUp error={error}/>

    return (
        <div className='allannouncements'>
            {
                data?.announcements.length > 0 ? data?.announcements.map((announcement, index) => {
                    return (
                        <div className='announcement-sec' style={{marginBottom:'10px'}}>
                            <h3>{announcement?.title}</h3>
                            <p>{announcement?.message}</p>
                        </div>
                    )
                }) : <p>No Official Announcements Yet</p>
}
        </div>
    )
}

export default AllAnnouncements
