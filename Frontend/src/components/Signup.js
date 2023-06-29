import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import {
    Card,
    Input,
    Button,
    Typography,
    Spinner
} from "@material-tailwind/react";
import AlertComponent from './Alert';
import notesContext from '../context/Note/notesContext';


function Signup(props) {
    const host = process.env.REACT_APP_HOST;

    const [credentials, setCredentials] = useState({ userName: "", email: "", password: "" })
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const [loader, setLoader]= useState(false)
    const context = useContext(notesContext)
    const {handleShowAlert} = context
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate('/')
        }
        if (!navigator.onLine) {
            handleShowAlert("No Internet Connection !", "red")
        }
    }, [])

    const handleSubmit = async (e) => {
        setLoader(true)
        e.preventDefault()
        const response = await fetch(`${host}api/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, userName: credentials.userName, password: credentials.password })
        })

        const json = await response.json()
        setLoader(false)

        if (json.success) {
            navigate('/')
            localStorage.setItem("token", json.token)
            handleShowAlert("Successfully Account Registered", "green")
        } else {
            navigate('/signup')
            handleShowAlert(json.errors[0].msg, "red")
        }
    }
    return (
        <div className='m-0 p-0'>
            <div className='container my-10 mx-auto flex justify-around'>
                <div className="animation hidden lg:block">
                    <lottie-player src="https://assets4.lottiefiles.com/packages/lf20_UW8DlCRljO.json" background="transparent" speed="1" style={{ width: "500px", height: "500px" }} loop autoplay></lottie-player>
                </div>
                <div className="card">
                    <Card className='' color="transparent" shadow={false}>
                        <Typography className="dark:text-white" variant="h4" color="blue-gray">
                            Sign Up
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal dark:text-white">
                            Enter your details to register.
                        </Typography>
                        <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                            <div className="mb-4 flex flex-col gap-6 dark:text-white">
                                <Input className="dark:text-white" onChange={handleChange} type='text' id='userName' name='userName' value={credentials.userName} size="lg" label="Username" required />
                                <Input className="dark:text-white" onChange={handleChange} type='email' id='email' name='email' value={credentials.email} size="lg" label="Email" required />
                                <Input className="dark:text-white" onChange={handleChange} id='password' name='password' value={credentials.password} type="password" size="lg" min={8} label="Password" required />
                            </div>
                            <Button type='submit' className="mt-6" fullWidth>
                                {loader? <div className="flex justify-center"><Spinner className="h-4 w-4" /></div> : "Sign Up"}
                            </Button>
                            <Typography color="gray" className="mt-4 text-center font-normal dark:text-white">
                                Already have an account?{" "}
                                <Link
                                    to='/login'
                                    className="font-medium text-blue-500 transition-colors hover:text-blue-700 "
                                >
                                    Login
                                </Link>
                            </Typography>
                        </form>
                    </Card>
                </div>
                <AlertComponent showAlert={props.showAlert} handleShowAlert={props.handleShowAlert} setShowAlert={props.setShowAlert} />
            </div>
        </div>
    )
}

export default Signup
