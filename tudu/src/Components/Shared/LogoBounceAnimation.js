import React from 'react'
import logo from '../../Images/logo.png'
import '../../Styles/LogoAnimation.css'

const LogoBounceAnimation = () => {

    return (
        <>
            {
                <div className='bounce'>
                    <div className='child-bounce'>
                        <img src={logo} alt="" />
                    </div>
                </div>
            }
        </>
    )
}

export default LogoBounceAnimation
