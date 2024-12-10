import React, { useCallback } from "react";
import ErrorMessage from "../error/ErrorMessage.tsx";
import { useNavigate } from "react-router-dom";

const Page404 = () => {
    const navigate = useNavigate(); 
    
    const navigateCall = useCallback(() => { 
        navigate(-1)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    
    return (
        <div>
            <ErrorMessage /> 
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '26px'}}>Страницы не существует</p>  
            <button
                style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '26px', 'marginTop': '35px', 'textDecoration': 'underline'}} 
                onClick={navigateCall}>Назад</button> 
        </div>
    )
}

export default Page404;