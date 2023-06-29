import React, { useContext, useEffect, useState, useRef } from 'react'
import Note from './Note'
import ChipComponent from './Chip'
import AddNotesBtn from './AddNotesBtn'

import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    IconButton,
    Typography,
    Input,
    Textarea,
    Spinner
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import notesContext from '../context/Note/notesContext';

function Notes(props) {

    const context = useContext(notesContext);
    const { NoteState, getAllNotes, editNote, loader,setLoader } = context


    useEffect(() => {
        getAllNotes()
    }, [])

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);


    const refCLose = useRef(null)
    const [editedNote, setEditedNote] = useState({
        id :"", title: "", description: "", tag: ""
    })

    const handleChange = (e) => {
        setEditedNote({ ...editedNote, [e.target.name]: e.target.value })
    }

    const updateNote = (title, tag, description, id) => {
        setEditedNote({
            id,title,description,tag
        })
        handleOpen()
    }

    const handleSubmit = async (e) => {
        setLoader(true)
        await editNote(editedNote.id, editedNote.title, editedNote.description, editedNote.tag)
        refCLose.current.click()
    }


    return (
        <div className='container mx-auto my-16'>
            <div className="indicator flex justify-center">
                <ChipComponent title="All" />
            </div>
            <div className="flex flex-wrap gap-3 justify-center">

                <div className="create-note-modal">
                    <Dialog size="xl" open={open} handler={handleOpen} className="h-auto dark:bg-[#1d3455c1] dark:navStyle">
                        <DialogHeader className="justify-between py-3">
                            <Typography variant="h4" color="blue-gray" className="py-3 dark:text-white">
                                Edit Note
                            </Typography>
                            <IconButton
                                color="blue-gray"
                                size="sm"
                                variant="text"
                                onClick={handleOpen}
                            >
                                <XMarkIcon strokeWidth={2} className="h-5 w-5  dark:text-white" />
                            </IconButton>
                        </DialogHeader>
                        <DialogBody className="overflow-y-scroll">
                            <div className="flex flex-col">
                                <Input required value={editedNote.title} className="text-3xl mb-6 dark:text-white" onChange={handleChange} type="text" name="title" id="title" variant="standard" label="Title " />
                                <div className="my-5">
                                    <Textarea required value={editedNote.description} className='dark:text-white' rows={6} onChange={handleChange} name='description' id='description' variant="static" label="Description" />
                                </div>
                                <Input required value={editedNote.tag} className="text-3xl dark:text-white" onChange={handleChange} type="text" name="tag" id="tag" variant="standard" label="Tags" />
                            </div>
                        </DialogBody>
                        <DialogFooter className="space-x-2 py-5">
                            <Button ref={refCLose} variant="text" color="blue-gray" onClick={handleOpen}>
                                cancel
                            </Button>
                            <Button disabled={editedNote.title.length < 5 || editedNote.description.length < 5 } type="submit" color="green" variant="gradient" onClick={handleSubmit}>
                            {loader ? <Spinner className="w-4 h-4" /> : "Update"}
                            </Button>
                        </DialogFooter>
                    </Dialog>
                </div>
                {NoteState.length <= 0 &&  <lottie-player src="https://assets10.lottiefiles.com/private_files/lf30_cgfdhxgx.json"  background="transparent"  speed="1"  style={{maxWidth: "400px", maxHeight: "300px"}} loop autoplay></lottie-player>}
                { NoteState.length > 0 && NoteState.map((note) =>
                    <Note key={note._id} title={note.title} description={note.description} tag={note.tag} id={note._id} updateNote={updateNote} />
                )}
            </div>
            <div className="add-note">
                <AddNotesBtn  />
            </div>
        </div>
    )
}

export default Notes
