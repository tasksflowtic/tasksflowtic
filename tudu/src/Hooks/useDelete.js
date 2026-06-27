import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const useDelete = (URL, setcanDlt) => {
    const [dlterror, setdlterr] = useState()
    const Navigate = useNavigate()

    const deleteData = async () => {
        try {

            const res = await axios.delete(URL, {
                withCredentials: true
            })
            if (res?.status === 200) {
                Navigate('/Flowtic')
            }
        } catch (error) {
            const status = error?.response?.status
            if (status === 400 || status === 500 || status === 404) {
                setdlterr(error?.response?.data?.message || 'Something went wrong')
            }
            setcanDlt(true)
        }
    }
    return { deleteData, dlterror }

}

export default useDelete
