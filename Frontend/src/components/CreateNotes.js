import React, { useContext, useState,useRef } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    IconButton,
    Typography,
    Input,
    Textarea
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import notesContext from "../context/Note/notesContext";

export default function CreateNote(props) {

    const { open, handleOpen } = props
    const context = useContext(notesContext)
    const { addNotes } = context
    const closeRef = useRef(null)

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        closeRef.current.click()
        console.log(note);
        props.handleShowAlert("Note Created Successfully", "green")
        addNotes(note.title, note.description, note.tag)
    }

    return (
        <React.Fragment>
            <Dialog size="xl" open={open} handler={handleOpen} className="h-auto dark:bg-[#1d3455c1] dark:navStyle">
                <DialogHeader className="justify-between py-3">
                    <Typography variant="h4" color="blue-gray" className="py-3 dark:text-white">
                        {props.title}
                    </Typography>
                    <IconButton
                        className="dark:text-white"
                        color="blue-gray"
                        size="sm"
                        variant="text"
                        onClick={handleOpen}
                    >
                        <XMarkIcon strokeWidth={2} className="h-5 w-5" />
                    </IconButton>
                </DialogHeader>
                <DialogBody className="overflow-y-scroll">
                    <div className="flex flex-col">
                        <Input required className="text-3xl font-bold capitalize dark:text-white" onChange={handleChange} type="text" name="title" id="title" variant="standard" label="Title " min={5} />
                        <div className="my-5">
                            <Textarea required rows={6} type="text" className="dark:text-white" name="description" id="description" onChange={handleChange}  variant="static" label="Description" min={5} />
                        </div>
                        <Input required className="text-2xl dark:text-white" onChange={handleChange} type="text" name="tag" id="tag" variant="standard" label="Tags " />
                    </div>
                </DialogBody>
                <DialogFooter className="space-x-2 py-5">
                    <Button ref={closeRef} variant="text" color="blue-gray" onClick={handleOpen}>
                        cancel
                    </Button>
                    <Button disabled={note.title.length < 5 || note.description.length < 5 } type="submit" color="green" variant="gradient" onClick={handleSubmit}>
                        Save
                    </Button>
                </DialogFooter>
            </Dialog>
        </React.Fragment>
    );
}
