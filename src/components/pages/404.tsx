// !!! 4. Вопрос - как убрать баг с типизацией to
import React, { useCallback } from "react";
import ErrorMessage from "../error/ErrorMessage";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";

// Чтобы избежать бага с to и navigate, заменили Link на button
const Page404 = () => {
    const navigate = useNavigate(); 
    
    const navigateCall = useCallback(() => {
        navigate(-1)
    }, [])
    
    return (
        <div>
            <ErrorMessage /> 
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '26px'}}>Страницы не существует</p>  
            {/* <Link 
                style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '26px', 'marginTop': '35px', 'textDecoration': 'underline'}} 
                to={navigate(-1)}>Назад</Link>  */}

            <button
                style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '26px', 'marginTop': '35px', 'textDecoration': 'underline'}} 
                onClick={navigateCall}>Назад</button> 
        </div>
    )
}

export default Page404;