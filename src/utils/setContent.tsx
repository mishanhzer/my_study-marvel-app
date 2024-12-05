import React, {FC} from "react";
import Skeleton from "../components/skeleton/Skeleton";
import Spinner from "../components/spinner/Spinner";
import ErrorMessage from "../components/error/ErrorMessage";

interface Comics {
    resourceURI?: string
    name?: string
}

interface CharInfoDataTypes {
    comics: Comics[]
    description?: string
    homepage?: string
    id?: number | string
    name?: string
    thumbnail?: string
    wiki?: string
}

function setContent<T>(process: string, Component: FC<T>, data: T) {
    switch(process) {
        case 'waiting':
            return <Skeleton />;
        case 'loading':
            return <Spinner/>;
        case 'confirmed': 
            return <Component {...data} />; 
        case 'error':
            return <ErrorMessage />;
        default:
            throw new Error('Unexpected process state')
    }
}

export default setContent;


// Старый вариант
// const setContent = (process: string, Component:React.FC<ForCharPage | ForComicPage | ForTransformChar> , data: TransformChar | TestCharPage | TestComicPage | null) => {
//     switch(process) {
//         case 'waiting':
//             return <Skeleton />;
//         case 'loading':
//             return <Spinner/>;
//         case 'confirmed': 
//             return <Component data={data} />; // зачем типизировать пропсы в React.FC если эти пропсы data?
//         case 'error':
//             return <ErrorMessage />;
//         default:
//             throw new Error('Unexpected process state')
//     }
// }

// export default setContent;