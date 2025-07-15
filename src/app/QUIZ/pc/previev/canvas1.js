import React, { useEffect } from 'react';
import './canvas1.scss';
import { STATUS } from '../../../../middleware';
import { useSelector, useDispatch } from 'react-redux';

const Canvas1 = ({ handleButtonClick }) => {  
    const dispatch = useDispatch();
    const url = 'http://qzpro.ru';
    const ID = useSelector((state) => state.quiz.currentQuizID);
    const quiz = useSelector((state) => state.quiz);
    const theme = quiz.data.theme.theme;
    const alignClass = quiz.data.canvas1.aling;
    const canvasClass = alignClass === 'canvas-center' ? 'canvas-center' : 'canvas1 ' + alignClass;

    // Determine colors based on the theme
    const backgroundColor = theme === 'user' ? quiz.data.theme.background_color : ''; 
    const textColor = theme === 'user' ? quiz.data.theme.text_color : ''; 
    const buttonColor = theme === 'user' ? quiz.data.theme.button_color : ''; 
    const buttonTextColor = theme === 'user' ? quiz.data.theme.button_text_color : ''; 

    const logoStyle = quiz.data.canvas1.logo ? { background: `url(${quiz.data.canvas1.logo})` } : { backgroundColor: 'rgba(66, 87, 102, 0.52)' };
    useEffect(() => {
      dispatch(STATUS(13, ID));
    })
    return (
        <div className={canvasClass} style={{ backgroundColor }}>
            {quiz.data.canvas1.video ? (
                <video loop autoPlay muted className="img">
                    <source src={quiz.data.canvas1.video} type="video/mp4" />
                    Ваш браузер не поддерживает видео.
                </video>
            ) : (
                <div className="img" style={{ background: `url(${quiz.data.canvas1.img})` }}></div>
            )}
            <div className="right">
                <div className="logo">
                    <button style={logoStyle}></button>
                    <p style={{ color: textColor }}>{quiz.data.canvas1.description}</p>                        
                </div>
                <h1 style={{ color: textColor }}>{quiz.data.canvas1.title}</h1>
                <h3 style={{ color: textColor }}>{quiz.data.canvas1.subtitle}</h3>
                <button onClick={() => {handleButtonClick('canvas2')}} style={{ backgroundColor: buttonColor, color: buttonTextColor, border: `0.85px solid ${buttonColor}` }}>
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