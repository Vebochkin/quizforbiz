import React, { useState, useEffect, useRef } from 'react';
import './canvas2.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setAnswer, changeAnswer } from '../../../../actions';
import { STATUS } from '../../../../middleware';
import arrow_back from '../../../img/Constructor/previev/arrow_back.svg';
import arrow_next from '../../../img/Constructor/previev/arrow_next.svg';

const Canvas2 = ({ handleButtonClick, IDquestion }) => {
  const dispatch = useDispatch();
  const url = 'http://qzpro.ru';
  const ID = useSelector((state) => state.quiz.currentQuizID);
  const rangeInputRef = useRef(null);
  const rangeDivRef = useRef(null);
  const quiz = useSelector((state) => state.quiz);
  const theme = quiz.data.theme.theme;
  const button = quiz.data.theme.button_style;
  const [currentIndex, setCurrentIndex] = useState(IDquestion);
  const [totalQuestions, setTotalQuestions] = useState(quiz.data.canvas2.length);
  const [answers, setAnswers] = useState({ question: '', answer: [] });
  const [activeButtons, setActiveButtons] = useState(new Set());
  const lastAnswers = useSelector((state) => state.userAnswer);

  const getActiveButtonIndices = (answerTexts) => {
    const currentAnswers = quiz.data.canvas2[currentIndex]?.answers || [];
    const indices = new Set();
    answerTexts.forEach(answerText => {
      const idx = currentAnswers.findIndex(a => a === answerText);
      if (idx !== -1) indices.add(idx);
    });
    return indices;
  };
  const handleButtonChange = (answerText, index) => {
    const newActiveButtons = new Set(activeButtons);
    if (newActiveButtons.has(index)) {
      newActiveButtons.delete(index);
      setAnswers((prev) => ({
        ...prev,
        answer: prev.answer.filter((item) => item !== answerText),
      }));
    } else {
      newActiveButtons.add(index);
      setAnswers((prev) => ({
        ...prev,
        answer: [...prev.answer, answerText],
      }));
    }
    setActiveButtons(newActiveButtons);
  };


  const updateAnswerWithValue = (value) => {
    setAnswers((prev) => ({
      ...prev,
      answer: [value],
    }));
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (value === '' || isNaN(value)) {
      updateAnswerWithValue('');
      return;
    }
    updateAnswerWithValue(value);
    if (rangeInputRef.current) {
      rangeInputRef.current.value = value;
      updateRangeDivWidth(value);
    }
  };

  const updateRangeDivWidth = (value) => {
    const rangeInput = rangeInputRef.current;
    const rangeDiv = rangeDivRef.current;
    if (rangeInput && rangeDiv) {
      const max = rangeInput.max;
      const val = Number(value);
      if (val >= Number(rangeInput.min) && val <= Number(max)) {
        const width = (val / (max / 100));
        rangeDiv.style.width = `${width}%`;
        rangeDiv.style.left = '0';
      } else {
        rangeDiv.style.width = '0%';
      }
    }
  };
  const handleRangeChange = (event) => {
    const value = event.target.value;
    updateAnswerWithValue(value);
    const countInput = document.getElementById('count');
    if (countInput) {
      countInput.value = value;
    }
    updateRangeDivWidth(value);
  };

  const backgroundColor = theme === 'user' ? quiz.data.theme.background_color : ''; 
  const textColor = theme === 'user' ? quiz.data.theme.text_color : ''; 
  const buttonColor = theme === 'user' ? quiz.data.theme.button_color : ''; 
  const buttonTextColor = theme === 'user' ? quiz.data.theme.button_text_color : ''; 
  const buttonStyle = button === 'style1' || button === 'style2' ? quiz.data.theme.button_color : ''; 

  const handleNextClick = () => {
    if (answers.answer.length === 0 || (typeof answers.answer[0] === 'string' && answers.answer[0].trim() === '')) {
      return;
    }
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleButtonClick('canvas3');
    };
    if (lastAnswers[currentIndex]) {
      dispatch(changeAnswer(currentIndex, answers));
    } else {
      dispatch(setAnswer(answers));
    };
    if (lastAnswers[currentIndex + 1]) {
      const previousAnswers = lastAnswers[currentIndex + 1];
      setAnswers({
        question: previousAnswers.question || quiz.data.canvas2[currentIndex + 1].question,
        answer: previousAnswers.answer || [],
      });
      const newActiveButtons = getActiveButtonIndices(previousAnswers.answer || []);
      setActiveButtons(newActiveButtons);
      if (quiz.data.canvas2[currentIndex + 1].name === 'Calculator' && previousAnswers.answer && previousAnswers.answer.length) {
        const val = previousAnswers.answer[0];
        if (rangeInputRef.current) {
          rangeInputRef.current.value = val;
          updateRangeDivWidth(val);
        }
        const countInput = document.getElementById('count');
        if (countInput) {
          countInput.value = val;
        }
      }
    
    } else {
      setAnswers({ question: quiz.data.canvas2[currentIndex + 1]?.question || '', answer: [] });
      setActiveButtons(new Set());
      let index = currentIndex + 1;
      dispatch(STATUS(index, ID));
    }
  };

  const handleBackClick = () => {
    if (currentIndex > 0) {
      const previousAnswers = lastAnswers[currentIndex - 1];
      if (previousAnswers) {
        setAnswers({
          question: previousAnswers.question || quiz.data.canvas2[currentIndex - 1].question,
          answer: previousAnswers.answer || [],
        });
        const newActiveButtons = getActiveButtonIndices(previousAnswers.answer || []);
        setActiveButtons(newActiveButtons);
        if(quiz.data.canvas2[currentIndex -1].name === 'Calculator' && previousAnswers.answer && previousAnswers.answer.length){
          const val = previousAnswers.answer[0];
          if(rangeInputRef.current){
            rangeInputRef.current.value = val; 
            updateRangeDivWidth(val);
          }
          const countInput = document.getElementById('count');
          if(countInput){
            countInput.value = val;
          }
        }
  
      } else {
        setAnswers({ question: quiz.data.canvas2[currentIndex - 1]?.question || '', answer: [] });
        setActiveButtons(new Set());
      }
      setCurrentIndex(currentIndex -1);
    }
  };

  const calculateProgress = () => {
    if (totalQuestions === 0) {
      return 0;
    }
    return Math.round((currentIndex / totalQuestions) * 100);
  };

  useEffect(() => {
    const rangeInput = rangeInputRef.current;
    const rangeDiv = rangeDivRef.current;
    const countInput = document.getElementById('count');
    if (rangeInput && rangeDiv && countInput) {
      const updateDivWidth = () => {
        const value = rangeInput.value;
        const max = rangeInput.max;
        const width = (value / (max / 100)); 
        rangeDiv.style.width = `${width}%`;
        rangeDiv.style.left = '0';
      };
  
      rangeInput.addEventListener('input', updateDivWidth);
      updateDivWidth();
  
      countInput.addEventListener('input', () => {
        const value = countInput.value;
        const min = rangeInput.min;
        const max = rangeInput.max;
        
        if (!isNaN(value) && value >= min && value <= max) {
          rangeInput.value = value;
          updateDivWidth();
        } else {
          countInput.value = '';
        }
      });
  
      return () => {
        rangeInput.removeEventListener('input', updateDivWidth);
        countInput.removeEventListener('input', () => {});
      };
    }
  }, [quiz.data.canvas2[currentIndex].name]);
  useEffect(() => {
    if (lastAnswers[currentIndex]) {
      const previousAnswers = lastAnswers[currentIndex];
      setAnswers({
        question: previousAnswers.question || quiz.data.canvas2[currentIndex].question,
        answer: previousAnswers.answer || [],
      });
      const newActiveButtons = getActiveButtonIndices(previousAnswers.answer || []);
      setActiveButtons(newActiveButtons);
  
      if(quiz.data.canvas2[currentIndex].name === 'Calculator' && previousAnswers.answer && previousAnswers.answer.length){
        const val = previousAnswers.answer[0];
        if(rangeInputRef.current){
          rangeInputRef.current.value = val;
          updateRangeDivWidth(val);
        }
        const countInput = document.getElementById('count');
        if(countInput){
          countInput.value = val;
        }
      }
  
    } else {
      setAnswers({ question: quiz.data.canvas2[currentIndex]?.question || '', answer: [] });
      setActiveButtons(new Set());
  
      if(quiz.data.canvas2[currentIndex]?.name === 'Calculator'){
        if(rangeInputRef.current){
          rangeInputRef.current.value = quiz.data.canvas2[currentIndex]?.min || 0;
          updateRangeDivWidth(rangeInputRef.current.value);
        }
        const countInput = document.getElementById('count');
        if(countInput){
          countInput.value = quiz.data.canvas2[currentIndex]?.min || '';
        }
      }
    }
  }, [currentIndex, lastAnswers]);

  const renderQuiz = () => {
    switch (quiz.data.canvas2[currentIndex].name) {
      case 'Answers':
        return (
          <div className="answers">
            {quiz.data.canvas2[currentIndex].answers.map((answer, answerIndex) => (
              <div className="item" key={answerIndex}>
                <button style={{ backgroundColor: buttonColor, color: buttonTextColor }} className={activeButtons.has(answerIndex) ? 'active' : ''} onClick={() => handleButtonChange(answer, answerIndex)}></button>
                <p style={{ color: textColor }}>{answer}</p>
              </div>
            ))}
          </div>
        );
      case 'Calculator':
        return (
          <div className="calc">
            <input 
              type="text" 
              id='count' 
              style={{ borderColor: buttonColor }} 
              onChange={handleInputChange} 
              defaultValue={answers.answer[0] || quiz.data.canvas2[currentIndex]?.min || ''}
            />
            <div className="range">
              <div ref={rangeDivRef}><div></div></div>
              <input
                type="range"
                id="range"
                min={quiz.data.canvas2[currentIndex].min}
                max={quiz.data.canvas2[currentIndex].max}
                step={quiz.data.canvas2[currentIndex].step}
                ref={rangeInputRef}
                defaultValue={answers.answer[0] || quiz.data.canvas2[currentIndex]?.min || ''}
                onChange={handleRangeChange}
              />
            </div>
            <div className="text">
              <p style={{ color: textColor }}>{quiz.data.canvas2[currentIndex].min}</p>
              <p style={{ color: textColor }}>{quiz.data.canvas2[currentIndex].max}</p>
            </div>
          </div>
        );
      case 'AnswersImg':
        return (
          <div className='answersImg'>
            <div className="left">
              {quiz.data.canvas2[currentIndex].answers.map((answer, answerIndex) => (
                <div className="item" key={answerIndex}>
                <button style={{ backgroundColor: buttonColor, color: buttonTextColor }} className={activeButtons.has(answerIndex) ? 'active' : ''} onClick={() => handleButtonChange(answer, answerIndex)}></button>
                  <p style={{ color: textColor }}>{answer}</p>
                </div>
              ))}
            </div>
            <div className="right" style={{background: `url(${quiz.data.canvas2[currentIndex].imgs[0]})`}}></div>
          </div>
        );
      case 'AnswersAndImg': 
        return (
          <div className='answersAndImg'>
            <div className="items">
              {quiz.data.canvas2[currentIndex].answers.map((answer, answerIndex) => (
                <div className="item" key={answerIndex}>
                  <div className="img" style={{background: `url(${quiz.data.canvas2[currentIndex].imgs[answerIndex]})`}}></div>
                  <div className="btns">
                  <button style={{ backgroundColor: buttonColor, color: buttonTextColor }} className={activeButtons.has(answerIndex) ? 'active' : ''} onClick={() => handleButtonChange(answer, answerIndex)}></button>
                    <p style={{ color: textColor }}>{answer}</p>                  
                  </div>
                </div>
              ))}              
            </div>
          </div>
        );
      default: return null
    }
  }
  return (
    <div className='canvas2' style={{ backgroundColor }}>
      <h1 style={{ color: textColor }}>{quiz.data.title}</h1>
      <h3>{quiz.data.canvas2[currentIndex].question}</h3>
      {quiz.data.canvas2.length > 0 ? renderQuiz() : null}
      <div className="progress">
        <p style={{ color: textColor }}>Готово: <span style={{ color: buttonColor }}>{calculateProgress()}%</span></p>
        <div className='prog'><div style={{ width: `${calculateProgress()}%`, background: buttonColor }}></div></div>
        <a  href="http://quizforbiz.ru" style={{ color: textColor, textDecorationColor: buttonColor }}>Создано в <span style={{ color: buttonColor }}>Quiz for biz</span></a>
        <button onClick={handleBackClick} style={{ color: buttonTextColor, border: `0.85px solid ${buttonColor}`, display: `${currentIndex === 0 ? 'none' : 'block'}` }}>
          <img src={arrow_back} alt="#" />
        </button>
        <button onClick={() => handleNextClick()} style={{ backgroundColor: buttonStyle, color: buttonTextColor, border: `0.85px solid ${buttonColor}` }}>
          Далее <img src={arrow_next} alt="#" />
        </button>
      </div>
    </div>
  );
}

export default Canvas2;