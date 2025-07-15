import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { noPopUp2 } from '../../../../actions';
import './style.scss';

const Popup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isActive = useSelector((state) => state.isPopUp2);
  const balance = useSelector((state) => state.balance);
  const handleDeposit = () => {
    dispatch(noPopUp2());
    navigate('/user/balance')
  };
  return (
    <div id='Popup' style={{display: `${isActive ? 'block' : 'none'}`}}>
        <h1>Ваш баланс почти исчерпан</h1>
        <p>На вашем счёте осталось всего <span>{balance}</span> ₽. Чтобы продолжить работу с квизом и не потерять заявки, пополните баланс прямо сейчас.</p>
        <button id="close" onClick={() => dispatch(noPopUp2())}></button>
        <button id="deposit" onClick={() => handleDeposit()}>Пополнить баланс</button>
    </div>
  )
}

export default Popup;