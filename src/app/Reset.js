import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RESET } from '../middleware';
import logo from './img/leftbar/logo.svg';
import './style.scss';

const Reset = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);    
    const isAuth = useSelector((state) => state.isAuth);
    
    const url = window.location.href;
    const paramsString = url.split('/reset/')[1]; 
    const params = new URLSearchParams(paramsString);
    const token = params.get('token');
    const email = params.get('email');
    
    const [dataForm, setDataForm] = useState({
      token: token || '',
      email: email || '',
      password: ''
    });
    console.log(dataForm);
  
    const handleClick = (route) => { navigate(route); };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === 'password') {
        setDataForm(prevState => ({
          ...prevState,
          [name]: value
        }));
      } else if (name === 'confirmPassword') {
        setConfirmPassword(value);
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      
      if (dataForm.password !== confirmPassword) {
        setIsPasswordMatch(false);
        return; 
      };
      setIsPasswordMatch(true);
      dispatch(RESET(dataForm));
    };
  
    useEffect(() => {
      if (isAuth) {
        navigate('/user');
      }
    }, [isAuth, navigate]);

    return (
      <div className="container">
        <div className="row">
          <div className="col-xxl-4 mx-auto text-center" id='auth'>
            <div id="blur"></div>
            <img src={logo} alt="#" className='img'/>
            <h2>Восстановить пароль</h2>
            <form onSubmit={handleSubmit}>
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
                name="confirmPassword" 
                placeholder="Повторите пароль" 
                className={`form ${isPasswordMatch ? '' : 'wrong'}`} 
                value={confirmPassword} 
                onChange={handleChange} 
                required 
              />
              <p className={isPasswordMatch ? 'hide' : 'wrong'}>Пароль не подходит</p>
              <button type="submit">Cбросить пароль</button>
            </form>
            <p>Есть аккаунт? <a href="#" onClick={() => handleClick('/')}>Войти</a></p>
            <p className="polit">Нажимая на кнопку, вы соглашаетесь <a href="#">с политикой конфиденциальности и политикой использования <wbr/>персональных данных</a></p>
          </div>
        </div>
      </div>
    )
}

export default Reset;