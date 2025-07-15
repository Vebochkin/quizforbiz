import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentQuiz2 } from '../actions';
import { QUIZ2, STATUS } from '../middleware';
import PrevievQuizPc from './QUIZ/pc/PrevievQuizPc';
import PrevievQuizMob from './QUIZ/mobile/PrevievQuizMob';
import { BrowserRouter as Router, Route, Switch, useParams } from 'react-router-dom';

const QUIZ = () => {
    const dispatch = useDispatch();
    const currentQuizID = useSelector((state) => state.quiz.currentQuizID);
    const currentData = useSelector((state) => state.quiz.data);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const { quizId } = useParams(); 
    const stylesP = {
        color: '#fff',
    }
    useEffect(() => {
        if (quizId !== currentQuizID) {
            dispatch(QUIZ2(quizId));
            dispatch(setCurrentQuiz2(quizId));
        } else {
            dispatch(STATUS(12, currentQuizID));
        }
    })
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);  
    const RenderQuiz = () => {
        if (!currentData || Object.keys(currentData).length === 0) {
            return (
                <div className="col-4 mx-auto text-center">
                    <p style={stylesP}>Нет данных для отображения.</p>
                </div>
            ) 
        } else if (screenWidth > 991) {
            return <PrevievQuizPc />            
        } else {
            return <PrevievQuizMob /> 
        } 
    };


  return ( <>{RenderQuiz()}</> )
}

export default QUIZ;