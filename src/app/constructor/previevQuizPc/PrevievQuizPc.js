import React, { useState, useEffect } from 'react';
import './style.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Canvas1 from '../../components/constructor/previevPc/canvas1';
import Canvas2 from '../../components/constructor/previevPc/canvas2';
import Canvas3 from '../../components/constructor/previevPc/canvas3';
import close from '../../img/Constructor/create/close.svg';
import closeDark from '../../img/Constructor/create/close_dark.svg';

const PrevievQuizPc = () => {
  const navigate = useNavigate();
  const canvas2 = useSelector((state) => state.createQuiz.data.canvas2);
  const isCanvas1 = useSelector((state) => state.createQuiz.data.canvas1.is_active);
  const theme = useSelector(state => state.createQuiz.data.theme.theme);
  const font = useSelector((state) => state.createQuiz.data.theme.font);
  const buttonStyle = useSelector(state => state.createQuiz.data.theme.button_style);
  const quizID = useSelector(state => state.createQuiz.currentQuizID);
  const handleClick = (route) => {
    navigate(route);
  };
  const [currentCanvas, setCurrentCanvas] = useState('canvas1');

  const handleButtonClick = (canvas) => {
    if (canvas === 'canvas2' && canvas2.length === 0) {
      setCurrentCanvas('canvas3');      
    } else {
      setCurrentCanvas(canvas);
    }
  };

  useEffect(() => {
    if (isCanvas1) {
      setCurrentCanvas('canvas1');
    } else {
      handleButtonClick('canvas2');
    }
  }, []);
  return (
    <div className="container" id='previevQuizPc'>
        <div className="row">
            <div className={`col-xxl-12 col-xl-12 col-lg-12 ${theme}`} style={{fontFamily: `${font}`}}>
                <button className='close' onClick={() => handleClick(`/user/quiz/${quizID}`)}>{theme === 'dark'? <img src={closeDark} alt="#" /> : <img src={close} alt="#" />}</button>
                <div className={`previev ${theme}-theme ${buttonStyle}`}>
                  {currentCanvas === 'canvas1' && (
                    <Canvas1 handleButtonClick={handleButtonClick} />
                  )}
                  {currentCanvas === 'canvas2' && (
                    <Canvas2 handleButtonClick={handleButtonClick} />
                  )}
                  {currentCanvas === 'canvas3' && (
                    <Canvas3 />
                  )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default PrevievQuizPc;