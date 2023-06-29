import {
    IconButton,
    SpeedDial,
    SpeedDialHandler,
    SpeedDialContent,
    SpeedDialAction,
    Tooltip
} from "@material-tailwind/react";
import {
    PlusIcon,
} from "@heroicons/react/24/outline";

import React from "react";
import CreateNote from "./CreateNotes";

export default function AddNotesBtn(props) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);

    return (
        <div className="w-full h-full">
            <div style={{ top: "80%" }} className="fixed right-11">
                <SpeedDial>
                    <SpeedDialHandler>
                        <IconButton size="lg" className="rounded-full">
                            <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
                        </IconButton>
                    </SpeedDialHandler>
                    <SpeedDialContent className="snap-y">
                        <SpeedDialAction>
                            <Tooltip className="bg-black text-white dark:bg-white dark:text-black mr-10" content="Add Note" placement="right" >
                                <i onClick={handleOpen} className="fa-solid fa-feather " style={{ fontSize: "1.2rem", color: "#1E3050" }} ></i>
                            </Tooltip>
                        </SpeedDialAction>
                    </SpeedDialContent>
                </SpeedDial>
            </div>
            <CreateNote title="Add New Note" handleOpen={handleOpen} open={open} />
        </div>
    )
}