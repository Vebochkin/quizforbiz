import React from 'react';
import eye from '../../../img/Constructor/patterns/eye.svg';

const Soon = () => {
  return (
    <div className="item soon">
      <div></div>
      <h5>Скоро будет...</h5>
      <div className="btns">
        <button>Выбрать</button>
        <button><img src={eye} alt="#" />Посмотреть</button>
      </div>
    </div>
  )
}

export default Soon;