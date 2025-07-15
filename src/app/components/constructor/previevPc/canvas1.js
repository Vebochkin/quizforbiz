import React from 'react';
import './canvas1.scss';
import { useSelector } from 'react-redux';

const Canvas1 = ({ handleButtonClick }) => {  
    const { createQuiz } = useSelector((state) => state);
    const theme = createQuiz.data.theme.theme;
    const alignClass = createQuiz.data.canvas1.aling;
    const canvasClass = alignClass === 'canvas-center' ? 'canvas-center' : 'canvas1 ' + alignClass;

    // Determine colors based on the theme
    const backgroundColor = theme === 'user' ? createQuiz.data.theme.background_color : ''; 
    const textColor = theme === 'user' ? createQuiz.data.theme.text_color : ''; 
    const buttonColor = theme === 'user' ? createQuiz.data.theme.button_color : ''; 
    const buttonTextColor = theme === 'user' ? createQuiz.data.theme.button_text_color : ''; 

    const logoStyle = createQuiz.data.canvas1.logo ? { background: `url(${createQuiz.data.canvas1.logo})` } : { backgroundColor: 'rgba(66, 87, 102, 0.52)' };

    return (
        <div className={canvasClass} style={{ backgroundColor }}>
            {createQuiz.data.canvas1.video ? (
                <video loop autoPlay muted className="img">
                    <source src={createQuiz.data.canvas1.video} type="video/mp4" />
                    Ваш браузер не поддерживает видео.
                </video>
            ) : (
                <div className="img" style={{ background: `url(${createQuiz.data.canvas1.img})` }}></div>
            )}
            <div className="right">
                <div className="logo">
                    <button style={logoStyle}></button>
                    <p style={{ color: textColor }}>{createQuiz.data.canvas1.description}</p>                        
                </div>
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