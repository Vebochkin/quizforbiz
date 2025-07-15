import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { buttonClick } from '../../../actions.js';
import { PUTQUIZ } from '../../../middleware.js';
import './style.scss';
import Canvas1 from './canvas/canvas1';
import Canvas2 from './canvas/canvas2';
import Canvas3 from './canvas/canvas3';

const Constructor = () => {
  const dispatch = useDispatch();
  const [bodyHeight, setBodyHeight] = useState('auto'); // Начальная высота  
  const [constHeight, setConstHeight] = useState('837px'); // Начальная высота
  const { createQuiz } = useSelector((state) => state);
  const data = useSelector((state) => state.createQuiz.data);
  const currentQuizID = useSelector((state) => state.createQuiz.currentQuizID);
  const token = useSelector((state) => state.Token);
  const handleButton = (index) => {
    dispatch(buttonClick(index));
  };


  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;

    switch (selectedValue) {
      case 'option1':
          handleButton(0);
          setBodyHeight('auto'); // Сброс высоты
          setConstHeight('1200px');
          break;
      case 'option2':
          handleButton(1);
          setBodyHeight('auto'); // Сброс высоты
          setConstHeight('926px');
          break;
      case 'option3':
          handleButton(2);
          setBodyHeight('1200px'); // Установка высоты
          break;
      default:
          setConstHeight('1200px');
          setBodyHeight('auto'); // Сброс высоты по умолчанию
          break;
    }
  };

  return (
    <div id="constructor">
      <button className={createQuiz.currentSection === 0 ? 'activ' : ''} onClick={() => handleButton(0)}>Стартовая страница</button>
      <button className={createQuiz.currentSection === 1 ? 'activ' : ''} onClick={() => handleButton(1)}>Вопросы</button>
      <button className={createQuiz.currentSection === 2 ? 'activ' : ''} onClick={() => handleButton(2)}>Форма контактов</button>
      <select id="options" onChange={handleSelectChange}>
          <option value="option1">Стартовая страница</option>
          <option value="option2">Вопросы</option>
          <option value="option3">Форма контактов</option>
      </select>
      <div className="body">
        {createQuiz.currentSection === 0 && <Canvas1 />}
        {createQuiz.currentSection === 1 && <Canvas2 />}
        {createQuiz.currentSection === 2 && <Canvas3 />}
      </div>
    </div>
  )
}

export default Constructor;