import React, { useEffect } from 'react';
import './style.scss';
import { STATUS } from '../../../../middleware';
import { useSelector, useDispatch } from 'react-redux';

const Canvas1 = ({ handleButtonClick }) => {  
    const dispatch = useDispatch();
    const url = 'http://qzpro.ru';
    const ID = useSelector((state) => state.quiz.currentQuizID);
    const quiz = useSelector((state) => state.quiz);
    const theme = quiz.data.theme.theme;

    // Determine colors based on the theme
    const backgroundColor = theme === 'user' ? quiz.data.theme.backgroundColor : ''; 
    const textColor = theme === 'user' ? quiz.data.theme.textColor : ''; 
    const buttonColor = theme === 'user' ? quiz.data.theme.buttonColor : ''; 
    const buttonTextColor = theme === 'user' ? quiz.data.theme.buttonTextColor : ''; 

    const logoStyle = quiz.data.canvas1.logo ? { background: `url(${quiz.data.canvas1.logo})` } : { backgroundColor: 'rgba(66, 87, 102, 0.52)' };
    useEffect(() => {
      dispatch(STATUS(13, ID));
    })
    return (
        <div id='canvas1Mob' style={{ backgroundColor }}>
            {quiz.data.canvas1.mobileVideo ? (
                <video loop autoPlay muted className="img">
                    <source src={quiz.data.canvas1.video} type="video/mp4" />
                    Ваш браузер не поддерживает видео.
                </video>
            ) : (
                <div className="img" style={{ background: `url(${quiz.data.canvas1.mobile})` }}></div>
            )}
            <div className="right">
                <h1 style={{ color: textColor }}>{quiz.data.canvas1.title}</h1>
                <h3 style={{ color: textColor }}>{quiz.data.canvas1.subtitle}</h3>
                <button onClick={() => handleButtonClick('canvas2')} style={{ backgroundColor: buttonColor, color: buttonTextColor, border: `0.85px solid ${buttonColor}` }}>
                    {quiz.data.canvas1.button}
                </button>
                <a href="http://quizforbiz.ru" style={{ color: textColor, textDecorationColor: buttonColor }}>Создано в <span style={{ color: buttonColor }}>Quiz for biz</span></a>
                <p style={{ color: textColor }}>{quiz.data.canvas1.tel}</p>
                <p style={{ color: textColor }}>{quiz.data.canvas1.name}</p>
            </div>
        </div>
    );
}

export default Canvas1;