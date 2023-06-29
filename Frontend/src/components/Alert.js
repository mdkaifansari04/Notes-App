import { Fragment, useContext } from "react";
import { Alert } from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import PropTypes from 'prop-types';
import notesContext from "../context/Note/notesContext";

export default function AlertComponent(props) {

    const context = useContext(notesContext)
    const {showAlert, setShowAlert} = context
    return (
        <Fragment>
            <div className="alert max-w-prose fixed bottom-9 right-4  md:fixed md:bottom-16 md:right-24 ">
                {showAlert && <Alert icon={
                    <InformationCircleIcon
                        strokeWidth={2}
                        className="h-6 w-6"
                    />
                } className="w-auto" color={showAlert.color} open={showAlert.show} onClose={() => setShowAlert({ show: false })}>
                    {showAlert.message}
                </Alert>}
            </div>
        </Fragment>
    );
}
