import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Tooltip

} from "@material-tailwind/react";
import notesContext from '../context/Note/notesContext';

function Note(props) {
    const { title, description, tag, id, updateNote } = props
    const context = useContext(notesContext)
    const { deleteNote } = context
    return (
        <div>
            <Card className="mt-6 w-72 h-72 m-3 md:w-96 h-64 dark:bg-[#1d3455c1]">
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2 dark:text-white">
                        {title ? title.length > 25? title.slice(0, 25) + "..." : title : ""}
                    </Typography>
                    <Typography className="dark:text-white">
                        {description ? description.length > 150? description.slice(0, 150) + "..." : description : ""}
                    </Typography>
                </CardBody>
                <CardFooter className="absolute bottom-1">
                    <div className="container flex gap-3">
                    <Tooltip className="bg-black text-white dark:bg-white dark:text-black" content="Delete Note" placement="bottom">
                        <Button color="red" size="sm" onClick={(() => { deleteNote(id);  props.handleShowAlert("Deleted Note Successfully", "green") })}><i className="fa-solid fa-trash utils"></i></Button>
                    </Tooltip>
                        <Button onClick={() => { updateNote(title, tag, description, id) }}>Read More</Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

Note.prototype = {
    title: PropTypes.string,
    describe: PropTypes.string
}

Note.defaultProps = {
    title: "No Title",
    describe: "No Description"
}

export default Note
