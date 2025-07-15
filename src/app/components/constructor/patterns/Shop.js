import React from 'react';
import shop from '../../../img/Constructor/patterns/shop.svg';
import eye from '../../../img/Constructor/patterns/eye.svg';

const Shop = () => {
  return (
    <div className="item">
      <div><img src={shop} alt="#" /></div>
      <h5>Создать квиз без шаблона</h5>
      <div className="btns">
        <button>Выбрать</button>
        <button><img src={eye} alt="#" />Посмотреть</button>
      </div>
    </div>
  )
}

export default Shop;