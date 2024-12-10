import React, {FC} from "react";
import Skeleton from "../components/skeleton/Skeleton.tsx";
import Spinner from "../components/spinner/Spinner.tsx";
import ErrorMessage from "../components/error/ErrorMessage.tsx";

function setContent<T>(process: string, Component: FC<{data: T}>, data: T) {
    switch(process) {
        case 'waiting':
            return <Skeleton />;
        case 'loading':
            return <Spinner/>;
        case 'confirmed': 
            return <Component data={data} />; 
        case 'error':
            return <ErrorMessage />;
        default:
            throw new Error('Unexpected process state')
    }
}

export default setContent;