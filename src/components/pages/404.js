import ErrorMessage from "../error/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";

const Page404 = () => {
    const navigate = useNavigate(); // используем хук навигации
    return (
        <div>
            <ErrorMessage /> 
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '26px'}}>Страницы не существует</p> {/* Текст, что страницы не существует */}
            <Link 
                style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '26px', 'marginTop': '35px', 'textDecoration': 'underline'}} 
                to={navigate(-1)}>Назад</Link> {/* Ссылка, которая нас ведет на главную старницу (чтобы мы могли вернуться назад) */}
        </div>
    )
}

export default Page404;