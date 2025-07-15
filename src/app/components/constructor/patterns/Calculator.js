import React from 'react';
import calculator from '../../../img/Constructor/patterns/calculator.svg';
import eye from '../../../img/Constructor/patterns/eye.svg';

const Calculator = () => {
  return (
    <div className="item">
      <div><img src={calculator} alt="#" /></div>
      <h5>Калькулятор</h5>
      <div className="btns">
        <button>Выбрать</button>
        <button><img src={eye} alt="#" />Посмотреть</button>
      </div>
    </div>
  )
}

export default Calculator;