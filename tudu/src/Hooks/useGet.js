import { useEffect, useState } from 'react'
import axios from 'axios'

const useGet = (URL) => {
    const [data, setdata] = useState()
    const [error, seterror] = useState()
    const [loading, setloading] = useState(true)

    useEffect(() => {

        const fetchdata = async () => {
            try {
                const res = await axios.get(URL, {
                    withCredentials: true
                })
                setdata(res?.data)
                setloading(false)
            } catch (error) {
                const status = error?.response?.status
                if (status === 404 || status === 500 || status === 403) {
                    seterror(error?.response?.data?.message)
                }
                setloading(false)
            }
        }
        if (URL) {
            fetchdata()
        }

    }, [URL])
    return { data, setdata, error, loading }
}

export default useGet
