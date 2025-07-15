import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { inputChange, buttonBlur, imageChange, buttonClick, videoChange, mobileChange } from '../../../../actions.js';
import './style.scss';
import Instrument3 from './instruments/Instrument3.js';
import arrow from '../../../img/Constructor/create/arrow.svg';
import close from '../../../img/Constructor/create/close.svg';
import mobile from '../../../img/Constructor/create/mobile.svg';
import user from '../../../img/Constructor/create/user2.svg';
import letter from '../../../img/Constructor/create/Letter.svg';
import phone from '../../../img/Constructor/create/Phone2.svg';
import pc from '../../../img/Constructor/create/pc.svg';


const Canvas3 = () => {
  const dispatch = useDispatch();
  const video = useSelector((state) => state.createQuiz.data.isvideo2);
  const { createQuiz } = useSelector((state) => state);

  const handleInput = (field, value) => {
    dispatch(inputChange('canvas3', field, value));
  };

  const handleButtonB = (field, value) => {
    dispatch(buttonBlur('canvas3', field, value));
  };

  const handleImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      dispatch(imageChange('canvas3', e.target.result)); 
    };
    reader.readAsDataURL(file);
  };

  const handleButton = (index) => {
    dispatch(buttonClick(index));
  };
  const handleVideo = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      dispatch(videoChange('canvas3', e.target.result));
    };
    reader.readAsDataURL(file);
  };
  const handleMobile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      dispatch(mobileChange('canvas3', e.target.result)); 
    };
    reader.readAsDataURL(file);
  };
  // Извлекаем значение align из состояния
  const alignClass = createQuiz.data.canvas3.aling;

  // Формируем классы для div
  const canvasClass = alignClass === 'canvas-center' ? 'canvas-center' : 'canvas ' + alignClass;

  return (
    <>
      <div id="canvas3">
        <div className={canvasClass}>
              <input type="file" className='mobileImg' accept='image/*' onChange={handleMobile} style={{ display: 'none' }} />
              {video ? <input type="file" accept="video/*" onChange={handleVideo} style={{ display: 'none' }} className='logoImgs'/> : <input type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} className='logoImgs'/>}
              <button onClick={() => document.querySelector('.logoImgs').click()} className='first'><img src={pc} alt="#" /></button>
              <button onClick={() => document.querySelector('.mobileImg').click()} className='second'><img src={mobile} alt="#" /></button>
            {createQuiz.data.canvas3.video ? (
              <video loop autoPlay muted className="img">
                <source src={createQuiz.data.canvas3.video} type="video/mp4" />
                Ваш браузер не поддерживает видео.
              </video>
            ) : (
              <div className="img" style={{ backgroundImage: `url(${createQuiz.data.canvas3.img})` }}></div>
            )}
          <div className="right">
            <h1 contentEditable="true" suppressContentEditableWarning={true} data-name="title" onBlur={(e) => handleInput('title', e.currentTarget.textContent)}>{createQuiz.data.canvas3.title}</h1>
            <h3 contentEditable="true" suppressContentEditableWarning={true} data-name="subtitle" onBlur={(e) => handleInput('subtitle', e.currentTarget.textContent)}>{createQuiz.data.canvas3.subtitle}</h3>
            <div className="inputs">
              {createQuiz.data.canvas3.name && (
                <div className="name">
                  <p>Имя*</p>
                  <div><img src={user} alt="#" />{createQuiz.data.canvas3.name}</div>
                  <button onClick={() => handleButtonB('name', null)}></button>
                </div>
              )}
              {createQuiz.data.canvas3.email && (
                <div className="email">
                  <p>Email*</p>
                  <div><img src={letter} alt="#" />{createQuiz.data.canvas3.email}</div>
                  <button onClick={() => handleButtonB('email', null)}></button>
                </div>
              )}
              {createQuiz.data.canvas3.phone && (
                <div className="phone">
                  <p>Телефон*</p>
                  <div><img src={phone} alt="#" />{createQuiz.data.canvas3.phone}</div>
                  <button onClick={() => handleButtonB('phone', null)}></button>
                </div>
              )}
            </div>
            <button>Отправить</button>
          </div>
        </div>
        <Instrument3 /> 
      </div>  
      <div className="start">
        <p><img src={close} alt="#" />Отключить стартовую страницу</p>
        <p onClick={() => handleButton(1)}>Настроить вопросы<img src={arrow} alt="#" /></p>
      </div>        
    </>
  );
}

export default Canvas3;