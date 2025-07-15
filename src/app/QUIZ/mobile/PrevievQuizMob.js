import React, { useState, useEffect } from 'react';
import './style.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Canvas1 from './previev/canvas1';
import Canvas2 from './previev/canvas2';
import Canvas3 from './previev/canvas3';

const PrevievQuizPc = () => {
  const navigate = useNavigate();
  const canvas2 = useSelector((state) => state.quiz.data.canvas2);
  const isCanvas1 = useSelector((state) => state.quiz.data.canvas1.is_active);
  const theme = useSelector(state => state.quiz.data.theme.theme);
  const font = useSelector((state) => state.quiz.data.theme.font);
  const buttonStyle = useSelector(state => state.quiz.data.theme.button_style);
  const quizID = useSelector(state => state.quiz.currentQuizID);
  const [IDquestion, setIDquestion] = useState(0);
  const [currentCanvas, setCurrentCanvas] = useState('canvas1');

  const handleButtonClick = (canvas) => {
    if (canvas === 'canvas2' && canvas2.length === 0) {
      setCurrentCanvas('canvas3');      
    } else if (canvas === 'canvas2Back') {
      setIDquestion(canvas2.length - 1);
      setCurrentCanvas('canvas2'); 
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
    <div className="container" id='previevQuizMob'>
        <div className="row">
            <div className="col-12" style={{fontFamily: `${font}`}}>
                <div className={`previev ${theme}-theme ${buttonStyle}`}>
                  {currentCanvas === 'canvas1' && (
                    <Canvas1 handleButtonClick={handleButtonClick} />
                  )}
                  {currentCanvas === 'canvas2' && (
                    <Canvas2 handleButtonClick={handleButtonClick} IDquestion={IDquestion} />
                  )}
                  {currentCanvas === 'canvas3' && (
                    <Canvas3 handleButtonClick={handleButtonClick} />
                  )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default PrevievQuizPc;