import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FORGOT } from '../middleware';
import logo from './img/leftbar/logo.svg';
import './style.scss';

const Forgot = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.isAuth);
  const [dataForm, setDataForm] = useState({
    email: '',
  });

  const handleClick = (route) => { navigate(route); }; 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm(prevState => {
      const newState = {
        ...prevState,
        [name]: value
      };
      return newState;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(FORGOT(dataForm));
  };
  useEffect(() => {
    if (isAuth) {
      navigate('/user');
    }
  });
  return (
    <div className="container">
      <div className="row">
        <div className="col-xxl-4 mx-auto text-center" id='auth'>
          <div id="blur"></div>
          <img src={logo} alt="#" className='img'/>
          <h2>Восстановить пароль</h2>
          <form onSubmit={handleSubmit}>
              <input 
                type="email" 
                name="email" 
                placeholder="Введите почту" 
                className="form" 
                value={dataForm.email} 
                onChange={handleChange} 
                required 
              />
              <button type="submit" onClick={() => handleClick('/reset/token=39dbef0fb164e591fc3332debb4a40620d029c5f15d264c7372abad5cc52f1af&email=mikha-nikiforov%40yandex.ru')}>Отправить письмо для сброса пароля</button>
          </form>
          <p>Есть аккаунт? <a href="#" onClick={() => handleClick('/')}>Войти</a></p>
          <p className="polit">Нажимая на кнопку, вы соглашаетесь <a href="#">с политикой конфиденциальности и политикой использования <wbr/>персональных данных</a></p>
        </div>
      </div>
    </div>
  )
}

export default Forgot;