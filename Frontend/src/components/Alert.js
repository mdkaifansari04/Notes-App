import { Fragment } from "react";
import { Alert } from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import PropTypes from 'prop-types';

export default function AlertComponent(props) {

    return (
        <Fragment>
            <div className="alert max-w-prose fixed bottom-9 right-4  md:fixed bottom-16 right-24 ">
                {props.showAlert && <Alert icon={
                    <InformationCircleIcon
                        strokeWidth={2}
                        className="h-6 w-6"
                    />
                } className="w-auto" color={props.showAlert.color} open={props.showAlert.show} onClose={() => props.setShowAlert({ show: false })}>
                    {props.showAlert.message}
                </Alert>}
            </div>
        </Fragment>
    );
}
