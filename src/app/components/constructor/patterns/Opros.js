import React from 'react';
import opros from '../../../img/Constructor/patterns/opros.svg';
import eye from '../../../img/Constructor/patterns/eye.svg';

const Opros = () => {
  return (
    <div className="item">
      <div><img src={opros} alt="#" /></div>
      <h5>Быстрый опросник</h5>
      <div className="btns">
        <button>Выбрать</button>
        <button><img src={eye} alt="#" />Посмотреть</button>
      </div>
    </div>
  )
}

export default Opros;