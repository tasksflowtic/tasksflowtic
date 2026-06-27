import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../Styles/Setting.css'

const UpdatePhone = () => {

    const Navigate = useNavigate()
    const [isActive, setisActive] = useState(false)

    return (
        <div className='email-update-page'>

            <div id='go-back-sec'>
                <p onClick={() => Navigate(-1)}>Setting</p>
                <span>/</span>
                <p>Phone</p>
            </div>

            <div className='email-main-sec'>
                <div className='child-email-main-sec'>
                    <div className='email-content'>
                        <div className='title-email'>
                            <h3>Phone</h3>
                            <p>xxxxxxxx92</p>
                        </div>
                        <button id='editbtn' onClick={() => setisActive(prev => !prev)}>{!isActive ? 'Edit' : 'Cancel'}</button>
                    </div>
                    {
                        isActive && <div className='email-form'>
                            <input type="tel" name="phone" id="" value={'xxxxxxxx92'} />
                            <button>Save</button>
                        </div>
                    }
                </div>
            </div>

        </div>
    )
}

export default UpdatePhone
