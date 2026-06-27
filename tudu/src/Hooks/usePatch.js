import { useState } from 'react'
import axios from 'axios'

const usePatch = (URL, setcallOnce) => {

    const [updateError, seterror] = useState()

    const patchdata = async (updateData) => {
        try {
            setcallOnce(false)
            const res = await axios.patch(URL, { updateData }, {
                withCredentials: true
            })
            if(res?.status === 200){
                window.location.reload()
            }
        } catch (err) {
            const status = err?.response?.status
            if (status === 500 || status === 401 || status === 404 || status === 403) {
                seterror(err?.response?.data?.message || 'something went wrong')
            }
            setcallOnce(true)
        }
    }
    setTimeout(() => {
        seterror('')
    }, 3000);
    return { patchdata, updateError }
}

export default usePatch
