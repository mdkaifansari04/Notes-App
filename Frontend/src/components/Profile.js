import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Chip
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function Profile(props) {

    return (
        <div className="flex justify-center overflow-hidden">
            <div className="flex items-center gap-4 fixed top-28 left-9  lg:fixed lg:top-40 lg:left-20">
                <Link to="/">
                    <Chip className="w-10 h-9 dark:text-white" variant="ghost" value={<i className="fas fa-home utils" />}/>
                </Link>
            </div>
            <Card className="w-80 h-72 text-center my-28 dark:bg-[#1d3455c1]">
                <CardHeader color="blue-gray" className="rounded-full w-44 h-44 flex justify-center mx-auto">
                    <div className="image">
                        <img className="border-none" src={`https://api.multiavatar.com/${localStorage.getItem("email")}.png`} alt="img-blur-shadow" layout="fill" />
                    </div>
                </CardHeader>
                <CardBody className="mt-7">
                    <Typography variant="h5" color="blue-gray" className="mb-2 dark:text-white">
                        {localStorage.getItem('userName')}
                    </Typography>
                    <Typography className=" text-blue-500">
                        {localStorage.getItem('email')}
                    </Typography>
                </CardBody>
            </Card>
        </div>
    );
}