import React from "react";
import Skeleton from "../components/skeleton/Skeleton";
import Spinner from "../components/spinner/Spinner";
import ErrorMessage from "../components/error/ErrorMessage";

import { Comics } from "../components/interfaces/interface";
import { IResponse } from "../components/interfaces/interface";

interface PropsData {
    data?: Comics | null | IResponse
}

interface PropsDataChar {
    data?: IResponse | null
}

const setContent = (process: string, Component:React.FC<PropsData> , data?: Comics | IResponse | null) => {
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