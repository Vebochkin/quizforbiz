import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentQuestion, clearCanvas2, buttonClick, changeTitle, setCurrentIndex } from '../../../../actions';
import './style.scss';
import answer1 from '../../../img/Constructor/create/answer1.svg';
import answer2 from '../../../img/Constructor/create/answer2.svg';
import answer3 from '../../../img/Constructor/create/answer3.svg';
import answer4 from '../../../img/Constructor/create/answer4.svg';
import pen from '../../../img/Constructor/create/pen3.svg';
import arrow from '../../../img/Constructor/create/arrow.svg';
import close from '../../../img/Constructor/create/close.svg';
import Answers from './answers/Answers';
import AnswersImg from './answers_img/AnswersImg';
import Calculator from './calculator/Calculator';
import AnswersAndImg from './answers_and_img/AnswersAndImg';

const Canvas2 = () => {
  const dispatch = useDispatch();
  const index = useSelector((state) => state.createQuiz.currentQuestionIndex);
  const currentQuestion = useSelector((state) => state.createQuiz.currentQuestion);
  const title = useSelector((state) => state.createQuiz.data.title); 
  const canvas2 = useSelector((state) => state.createQuiz.data.canvas2);

  const handleButtonClick = (componentName) => {
    dispatch(setCurrentQuestion(componentName));
  };

  const handleClearCanvas = () => {
    dispatch(clearCanvas2()); // Вызываем action для очистки canvas2
  };

  const handleTitleChange = (e) => {
    const newTitle = e.currentTarget.textContent; // Получаем новое значение заголовка
    dispatch(changeTitle(newTitle)); // Диспатчим новое значение заголовка
  };
  const handleSetAnswer = () => {
    if (canvas2.length > 0) {
      const lastElement = canvas2[canvas2.length - 1]; // Получаем последний элемент
      const currentIndex = canvas2.length - 1; // Индекс последнего элемента
      dispatch(setCurrentQuestion(lastElement.name)); // Диспатчим имя последнего элемента
      dispatch(setCurrentIndex(currentIndex));
    }
  };
  const renderComponent = () => {
    switch (currentQuestion) {
      case 'Answers':
        return <Answers />;
      case 'AnswersImg':
        return <AnswersImg />;
      case 'AnswersAndImg':
        return <AnswersAndImg />;
      case 'Calculator':
        return <Calculator />;
      default:
        return (
          <div className="type">
            <input type="text" placeholder='Впишите заголовок вопроса' />
            <div className="index">{index + 1}</div>
            <div className="btns">
              <button onClick={() => handleButtonClick("Answers")}>
                <img src={answer1} alt="#" />Варианты ответов
              </button>
              <button onClick={() => handleButtonClick("AnswersAndImg")}>
                <img src={answer2} alt="#" />Варианты с картинками
              </button>
              <button onClick={() => handleButtonClick("AnswersImg")}>
                <img src={answer3} alt="#" />Варианты и картинка
              </button>
              <button onClick={() => handleButtonClick("Calculator")}>
                <img src={answer4} alt="#" />Калькулятор
              </button>
            </div>
          </div>
        );
    }
  };

  const handleButton = (index) => {
    dispatch(buttonClick(index));
  };
  useEffect(() => {
    handleSetAnswer();
  }, []);
  return (
    <>
      <div id="canvas2">
        <div className="head">
          <h2 
            contentEditable="true" 
            suppressContentEditableWarning={true} 
            onBlur={handleTitleChange} // Диспатчим новое значение при потере фокуса
          >
            {title}
          </h2>
          <img src={pen} alt="#" />
          <button className={`type_button ${currentQuestion === null && index !== 0 ? 'active' : ''}`} onClick={() => handleSetAnswer()}></button>
        </div>
        <div className="canvas">
          {renderComponent()}
        </div>
      </div>    
      <div className="start">
        <p onClick={handleClearCanvas}><img src={close} alt="#" />Очистить все</p>
        <p onClick={() => handleButton(2)}>Настроить форму<img src={arrow} alt="#" /></p>
      </div>
    </>
  );
}

export default Canvas2;