import { Chip } from "@material-tailwind/react";

export default function ChipComponent(props) {
    return <Chip className="my-3 dark:text-white" variant="ghost" value={props.title} />;
}