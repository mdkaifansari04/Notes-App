import React, { useEffect } from 'react'
import Notes from './Notes'
import AlertComponent from './Alert'
import { useNavigate } from 'react-router-dom'

function Home(props) {
    const navigate = useNavigate()
    useEffect(()=>{
        if (localStorage.getItem('token') === null){
            navigate('/login')
        }
    })

    return (
        <div>
            <Notes handleShowAlert = {props.handleShowAlert}/>
            <AlertComponent showAlert={props.showAlert} setShowAlert={props.setShowAlert} />
        </div>
    )
}

export default Home
