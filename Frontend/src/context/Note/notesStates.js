import { useNavigate } from "react-router-dom";
import NotesContext from "./notesContext";
import { useState } from "react";
let host = process.env.REACT_APP_HOST


const NoteState = (props) => {
    const [NoteState, setNote] = useState([])

    const getAllNotes = async () => {
        if (localStorage.getItem('token')) {
            try {
                const response = await fetch(`${host}api/note/get`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token":localStorage.getItem("token")
                    }
                });
                const data = await response.json(); // parses JSON response into native JavaScript objects
                console.log(data)
                setNote(data)

                const userData = await fetch(`${host}api/user/getuser`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token":localStorage.getItem("token")
                    },
                })
                let json = await userData.json()
                console.log(json);
                if(json.success){
                    localStorage.setItem("userName", json.user.userName)
                    localStorage.setItem("email", json.user.email)
                }

            } catch (error) {
                console.log(error);
            }
        }
    }

    //? Add Note
    const addNotes = async (title, description, tag) => {

        //? API call
        const response = await fetch(`${host}api/note/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem("token")
            },
            body: JSON.stringify({ title: title, description: description, tag: tag })
        });

        const data = await response.json()

        if (data.success) {
            console.log(typeof NoteState)
            const addedNote = {
                "_id": data.note._id,
                "user": data.note.user,
                "title": data.note.title,
                "description": data.note.description,
                "tag": data.note.tag,
                "createdAt": data.note.createdAt,
                "updatedAt": data.note.updatedAt
            }
            setNote(NoteState.concat(addedNote))
        }else{
            console.log("Not added");
        }
    }

    //? Edit Note
    const editNote = async (id, title, description, tag) => {
        //? API call
        const response = await fetch(`${host}api/note/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag })
        });

        const newNote = await JSON.parse(JSON.stringify(NoteState))
        console.log(newNote);

        for (let index = 0; index < newNote.length; index++) {
            if (newNote[index]._id === id) {
                newNote[index].description = description
                newNote[index].title = title
                newNote[index].tag = tag
                break;
            }
        }
        setNote(newNote)
        const json = await response.json()
        console.log(json)
    }

    //? Delete Note
    const deleteNote = async (id) => {
        //? API call
        const response = await fetch(`${host}api/note/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem("token")
            },
        });

        const json = await response.json()
        console.log(json)
        const newNote = NoteState.filter((note) => {
            return note._id !== id
        })
        setNote(newNote)
    }

    return (
        <NotesContext.Provider value={{ NoteState, addNotes, editNote, deleteNote, getAllNotes }}>
            {props.children}
        </NotesContext.Provider>
    )
}

export default NoteState;
