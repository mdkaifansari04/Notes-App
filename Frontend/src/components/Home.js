import React, { useContext, useEffect } from 'react'
import Notes from './Notes'
import AlertComponent from './Alert'
import { useNavigate } from 'react-router-dom'
import notesContext from '../context/Note/notesContext'

function Home(props) {
    const navigate = useNavigate()
    const context = useContext(notesContext)
    const { handleShowAlert } = context
    useEffect(() => {
        if (!navigator.onLine) {
            handleShowAlert("No Internet Connection !", "red")
        }
        if (localStorage.getItem('token') === null) {
            navigate('/login')
        }
    })

    return (
        <div>
            <Notes />
            <AlertComponent />
        </div>
    )
}

export default Home
