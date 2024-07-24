// Добавляем компонент - картинка ошибки
import img from './error.gif';

const ErrorMessage = () => {
    return (
        // <img src={process.env.PUBLIC_URL + '/error.gif'} alt="" /> // пример как достучаться до файла в папке public (это делается очень редко, лучше картинку с ошибкой иметь в одной папке с компонентом ошибки)
        <img style={{display: 'block', width: '250px', height: '250px', objectFit: 'contain', margin: '0 auto'}} src={img} alt={Error} />
    )
}

export default ErrorMessage;