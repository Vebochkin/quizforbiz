import React from 'react';
import eye from '../../../img/Constructor/patterns/eye.svg';

const Pattern = () => {
  return (
    <div className="item">
      <div></div>
      <h5>Подбор недвижимости</h5>
      <div className="btns">
        <button>Выбрать</button>
        <button><img src={eye} alt="#" />Посмотреть</button>
      </div>
    </div>
  )
}

export default Pattern;