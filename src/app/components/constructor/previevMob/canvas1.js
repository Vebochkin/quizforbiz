import React from 'react';
import './style.scss';
import { useSelector } from 'react-redux';

const Canvas1 = ({ handleButtonClick }) => {  
    const { createQuiz } = useSelector((state) => state);
    const theme = createQuiz.data.theme.theme;

    // Determine colors based on the theme
    const backgroundColor = theme === 'user' ? createQuiz.data.theme.backgroundColor : ''; 
    const textColor = theme === 'user' ? createQuiz.data.theme.textColor : ''; 
    const buttonColor = theme === 'user' ? createQuiz.data.theme.buttonColor : ''; 
    const buttonTextColor = theme === 'user' ? createQuiz.data.theme.buttonTextColor : ''; 

    const logoStyle = createQuiz.data.canvas1.logo ? { background: `url(${createQuiz.data.canvas1.logo})` } : { backgroundColor: 'rgba(66, 87, 102, 0.52)' };

    return (
        <div id='canvas1Mob' style={{ backgroundColor }}>
            {createQuiz.data.canvas1.mobile_video ? (
                <video loop autoPlay muted className="img">
                    <source src={createQuiz.data.canvas1.video} type="video/mp4" />
                    Ваш браузер не поддерживает видео.
                </video>
            ) : (
                <div className="img" style={{ background: `url(${createQuiz.data.canvas1.mobile})` }}></div>
            )}
            <div className="right">
                <h1 style={{ color: textColor }}>{createQuiz.data.canvas1.title}</h1>
                <h3 style={{ color: textColor }}>{createQuiz.data.canvas1.subtitle}</h3>
                <button onClick={() => handleButtonClick('canvas2')} style={{ backgroundColor: buttonColor, color: buttonTextColor, border: `0.85px solid ${buttonColor}` }}>
                    {createQuiz.data.canvas1.button}
                </button>
                <a href="http://quizforbiz.ru" style={{ color: textColor, textDecorationColor: buttonColor }}>Создано в <span style={{ color: buttonColor }}>Quiz for biz</span></a>
                <p style={{ color: textColor }}>{createQuiz.data.canvas1.tel}</p>
                <p style={{ color: textColor }}>{createQuiz.data.canvas1.name}</p>
            </div>
        </div>
    );
}

export default Canvas1;