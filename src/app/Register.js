import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { REGISTER } from '../middleware';
import logo from './img/leftbar/logo.svg';
import './style.scss';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.isAuth);
  const [dataForm, setDataForm] = useState({
    email: '',
    password: '',
    password_confirmation: '',
    name: ''
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
    dispatch(REGISTER(dataForm));
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
          <h2>Зарегистрироваться</h2>
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
              <input 
                type="text" 
                name="name" 
                placeholder="Введите имя" 
                className="form" 
                value={dataForm.name} 
                onChange={handleChange} 
                required 
              />
              <input 
                type="password" 
                name="password" 
                placeholder="Введите пароль" 
                className="form" 
                value={dataForm.password} 
                onChange={handleChange} 
                required 
              />
              <input 
                type="password" 
                name="password_confirmation" 
                placeholder="Повторите пароль" 
                className="form" 
                value={dataForm.password_confirmation} 
                onChange={handleChange} 
                required 
              />
              <button type="submit">Зарегистрироваться</button>
              <a href="#" onClick={() => handleClick('/forgot')}>Я забыл(а) пароль</a>
          </form>
          <p>Есть аккаунт? <a href="#" onClick={() => handleClick('/')}>Войти</a></p>
          <p className="polit">Нажимая на кнопку, вы соглашаетесь <a href="#">с политикой конфиденциальности и политикой использования <wbr/>персональных данных</a></p>
        </div>
      </div>
    </div>
  )
}

export default Register;