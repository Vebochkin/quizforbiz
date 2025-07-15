import React, { useEffect,useState } from 'react';
import './style.scss';
import { useSelector, useDispatch } from 'react-redux';
import { STATUS, SENDDATA } from '../../../../middleware';
import user from '../../../img/Constructor/create/user2.svg';
import letter from '../../../img/Constructor/create/Letter.svg';
import phones from '../../../img/Constructor/create/Phone2.svg';

const Canvas3 = ({ handleButtonClick }) => {
    const dispatch = useDispatch();
    const ID = useSelector((state) => state.quiz.currentQuizID);
    const quiz = useSelector((state) => state.quiz);

    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);

    const theme = quiz.data.theme.theme; 
    const alignClass = quiz.data.canvas3.aling;
    const canvasClass = 'canvas3 ' + alignClass;
    const backgroundColor = theme === 'user' ? quiz.data.theme.background_color : ''; 
    const textColor = theme === 'user' ? quiz.data.theme.text_color : ''; 
    const buttonColor = theme === 'user' ? quiz.data.theme.button_color : ''; 
    const buttonTextColor = theme === 'user' ? quiz.data.theme.button_text_color : ''; 

    const Answers = useSelector((state) => state.userAnswer);
    const formatDate = (date) => {
        const pad = (num) => (num < 10 ? '0' + num : num);
        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1); 
        const day = pad(date.getDate());
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        const seconds = pad(date.getSeconds());
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const dataUser = {
        'quiz_id': ID,
        'name': name,
        'email': email,
        'phone': phone,
        position: '',
        date: formatDate(new Date()),
        'details': {
            'answers': Answers,
            ip: '',
            url: ''
        }
    };

    const handleSendForm = () => {
        const isNameFilled = quiz.data.canvas3.name ? name !== null : true;
        const isEmailFilled = quiz.data.canvas3.email ? email !== null : true;
        const isPhoneFilled = quiz.data.canvas3.phone ? phone !== null : true;
        if (isNameFilled && isEmailFilled && isPhoneFilled) {
            City();
        }
    };
    const handleformatDate = (date) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
        const formattedDate = date.toLocaleString('ru-RU', options);
        dataUser.position = formattedDate;
    };
    const handleInputChange = (setter) => (event) => {
        setter(event.target.value);
    };
    const City = async () => {
        try {
            const response = await fetch('http://ip-api.com/json/');
            const data = await response.json();
            dataUser.details.ip = data.query;
            dataUser.details.url = window.location.href;
            handleformatDate(data.city);
            dispatch(SENDDATA(dataUser));
            handleButtonClick('finish')
        } catch (error) {
            console.error('Ошибка при получении города:', error);
        }
    };
    useEffect(() => {
        dispatch(STATUS(11, ID));
    }, []);
    return (
        <div id='canvas3Mob' style={{ backgroundColor }}>
            {quiz.data.canvas3.video ? (
                <video loop autoPlay muted className="img">
                    <source src={quiz.data.canvas3.mobileVideo} type="video/mp4" />
                    Ваш браузер не поддерживает видео.
                </video>
            ) : (
                <div className="img" style={{ backgroundImage: `url(${quiz.data.canvas3.mobile})` }}></div>
            )}
            <div className="right">
                <h1 style={{ color: textColor }}>{quiz.data.canvas3.title}</h1>
                <h3 style={{ color: textColor }}>{quiz.data.canvas3.subtitle}</h3>
                <div className="inputs">
                    {quiz.data.canvas3.name && (
                        <div className="name">
                            <p>Имя*</p>
                            <input type="text" placeholder='Иван' onChange={handleInputChange(setName)} style={{ border: `0.85px solid ${buttonColor}`, color: textColor }} />
                            <img src={user} alt="#" />
                        </div>
                    )}
                    {quiz.data.canvas3.email && (
                        <div className="email">
                            <p>Email*</p>
                            <input type="text" placeholder='Mail@example.com' onChange={handleInputChange(setEmail)} style={{ border: `0.85px solid ${buttonColor}`, color: textColor }} />
                            <img src={letter} alt="#" />
                        </div>
                    )}
                    {quiz.data.canvas3.phone && (
                        <div className="phone">
                            <p>Телефон*</p>
                            <input type="text" placeholder='+7 (900) 000-00-00' onChange={handleInputChange(setPhone)} style={{ border: `0.85px solid ${buttonColor}`, color: textColor }} />
                            <img src={phones} alt="#" />
                        </div>
                    )}
                </div>
                <button style={{ backgroundColor: buttonColor, color: buttonTextColor, border: `0.85px solid ${buttonColor}` }} onClick={() => handleSendForm()}>Отправить</button>
                <button style={{ backgroundColor: buttonColor, color: buttonTextColor }} onClick={() => handleButtonClick('canvas2Back')}>Назад</button>
            </div>
        </div>
    );
}

export default Canvas3;