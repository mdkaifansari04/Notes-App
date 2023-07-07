
import NotesContext from "./notesContext";
import { useState } from "react";
let host = process.env.REACT_APP_HOST


const NoteState = (props) => {
    const [NoteState, setNote] = useState([])
    const [loader, setLoader] = useState(false)

    const [showAlert, setShowAlert] = useState({
        show: false,
        message: "",
        color: "blue",
    })

    const handleShowAlert = (message, color) => {
        setShowAlert({
            show: true,
            message: message,
            color: color
        })
    }

    const getAllNotes = async () => {
        if (localStorage.getItem('token') !== null) {
            try {
                const response = await fetch(`${host}api/note/get`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem("token")
                    }
                });
                const data = await response.json(); // parses JSON response into native JavaScript objects
                console.log(data.note);
                setNote(data.note)
                console.log(NoteState)

                const userData = await fetch(`${host}api/user/getuser`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem("token")
                    },
                })
                let json = await userData.json()
                console.log(json);
                if (json.success) {
                    localStorage.setItem("userName", json.user.userName)
                    localStorage.setItem("email", json.user.email)
                } else {
                    handleShowAlert(json.message, "red")
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    //? Add Note
    const addNotes = async (title, description, tag) => {

        try {
            //? API call
            const response = await fetch(`${host}api/note/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                },
                body: JSON.stringify({ title: title, description: description, tag: tag })
            });

            const data = await response.json()
            if (data.success) {
                setLoader(false)
                handleShowAlert("Note Created Successfully", "green")
                const addedNote = {
                    "_id": data.note._id,
                    "user": data.note.user,
                    "title": data.note.title,
                    "description": data.note.description,
                    "tag": data.note.tag,
                    "createdAt": data.note.createdAt,
                    "updatedAt": data.note.updatedAt
                }
                console.log(typeof(NoteState));
                setNote(NoteState.concat(addedNote))
            } else {
                handleShowAlert("Something went wrong, try again", "red")
            }
        } catch (error) {
            handleShowAlert("Server Error, Contact developer", "red")
            console.log(error);
        }
    }

    //? Edit Note
    const editNote = async (id, title, description, tag) => {

        try {
            //? API call
            const response = await fetch(`${host}api/note/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                },
                body: JSON.stringify({ title, description, tag })
            });

            const json = await response.json()

            if (json.success) {
                setLoader(false)
                handleShowAlert("Note Edited Successfully", "green")
                const newNote = await JSON.parse(JSON.stringify(NoteState))

                for (let index = 0; index < newNote.length; index++) {
                    if (newNote[index]._id === id) {
                        newNote[index].description = description
                        newNote[index].title = title
                        newNote[index].tag = tag
                        break;
                    }
                }
                setNote(newNote)
            } else {
                handleShowAlert("Something went wrong, try again", "red")
            }
        } catch (error) {
            handleShowAlert("Server Error, Contact developer", "red")
            console.log(error);
        }

    }

    //? Delete Note
    const deleteNote = async (id) => {

        try {
            setLoader(true)
            //? API calls
            const response = await fetch(`${host}api/note/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                },
            });

            const json = await response.json()
            setLoader(false)

            if (json.success) {
                handleShowAlert("Note Deleted Successfully", "green")
                const newNote = NoteState.filter((note) => {
                    return note._id !== id
                })
                setNote(newNote)
            } else {
                handleShowAlert("Something went wrong, try again", "red")
            }
        } catch (error) {
            handleShowAlert("Server Error, Contact developer", "red")
            console.log(error);
        }
    }

    return (
        <NotesContext.Provider value={{ NoteState, addNotes, editNote, deleteNote, getAllNotes, loader,setLoader, showAlert, setShowAlert, handleShowAlert }}>
            {props.children}
        </NotesContext.Provider>
    )
}

export default NoteState;
