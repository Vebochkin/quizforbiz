import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { inputChange, buttonBlur, imageChange, image2Change, buttonClick, videoChange, turnOff, turnOn, mobileChange } from '../../../../actions.js';
import './style.scss';
import Instrument from './instruments/Instrument.js';
import pen from '../../../img/Constructor/create/pen.svg';
import arrow from '../../../img/Constructor/create/arrow.svg';
import close from '../../../img/Constructor/create/close.svg';
import buttonLogo from '../../../img/Constructor/create/buttonLogo.svg';
import arrow2 from '../../../img/Constructor/create/arrow_turnOffCanvas1.svg';
import bg1 from '../../../img/Constructor/create/bg_turnOff.svg';
import bg2 from '../../../img/Constructor/create/bg2_turnOff.svg';
import mobile from '../../../img/Constructor/create/mobile.svg';
import pc from '../../../img/Constructor/create/pc.svg';

const Canvas1 = () => {
  const dispatch = useDispatch();
  const video = useSelector((state) => state.createQuiz.data.isvideo1);
  const { createQuiz } = useSelector((state) => state);

  const handleInput = (field, value) => {
    dispatch(inputChange('canvas1', field, value));
  };

  const handleButtonB = (field, value) => {
    dispatch(buttonBlur('canvas1', field, value));
  };

  const handleImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      dispatch(imageChange('canvas1', e.target.result)); 
    };
    reader.readAsDataURL(file);
  };
  const handleVideo = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      dispatch(videoChange('canvas1', e.target.result));
    };
    reader.readAsDataURL(file);
  };

  const handleImage2 = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      dispatch(image2Change('canvas1', e.target.result)); 
    };
    reader.readAsDataURL(file);
  };
  const handleMobile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      dispatch(mobileChange('canvas1', e.target.result)); 
    };
    reader.readAsDataURL(file);
  };

  // Извлекаем значение align из состояния
  const alignClass = createQuiz.data.canvas1.aling;

  // Формируем классы для div
  const canvasClass = alignClass === 'canvas-center' ? 'canvas-center' : 'canvas ' + alignClass;
  const handleButton = (index) => {
    dispatch(buttonClick(index));
  };
  const handleTurnOff = () => {
    dispatch(turnOff());
  }
  const handleTurnOn = () => {
    dispatch(turnOn());
  }

  return (
    <>
      <div id="canvas1">
        {createQuiz.data.canvas1.is_active ? (
          <>
            <div className={canvasClass}>
              <input type="file" className='mobileImg' accept='image/*' onChange={handleMobile} style={{ display: 'none' }} />
              {video ? <input type="file" accept="video/*" onChange={handleVideo} style={{ display: 'none' }} className='logoImgs'/> : <input type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} className='logoImgs'/>}
              <button onClick={() => document.querySelector('.logoImgs').click()} className='first'><img src={pc} alt="#" /></button>
              <button onClick={() => document.querySelector('.mobileImg').click()} className='second'><img src={mobile} alt="#" /></button>
              {createQuiz.data.canvas1.video ? (
                <video loop autoPlay muted className="img">
                  <source src={createQuiz.data.canvas1.video} type="video/mp4" />
                  Ваш браузер не поддерживает видео.
                </video>
              ) : (
                <div className="img" style={{ backgroundImage: `url(${createQuiz.data.canvas1.img})` }}></div>
              )}
              <div className="right">
                <div className="logo">
                  <input type="file" accept="image/*" onChange={handleImage2} style={{ display: 'none' }} className='logoImg'/>
                  <button onClick={() => document.querySelector('.logoImg').click()} style={createQuiz.data.canvas1.logo !== null ? { backgroundImage: `url(${createQuiz.data.canvas1.logo})` } : { backgroundImage: `url(${buttonLogo})` }}></button>
                  <p contentEditable="true" spellcheck="false" suppressContentEditableWarning={true} data-name="description" onBlur={(e) => handleInput('description', e.target.innerText)}>{createQuiz.data.canvas1.description}<img src={pen} alt="#" /></p>                        
                </div>
                <h1 contentEditable="true" spellcheck="false" suppressContentEditableWarning={true} data-name="title" onBlur={(e) => handleInput('title', e.currentTarget.textContent)}>{createQuiz.data.canvas1.title}</h1>
                <h3 contentEditable="true" spellcheck="false" suppressContentEditableWarning={true} data-name="subtitle" onBlur={(e) => handleInput('subtitle', e.currentTarget.textContent)}>{createQuiz.data.canvas1.subtitle}</h3>

                <button><p contentEditable="true" spellcheck="false" suppressContentEditableWarning={true} onBlur={(e) => handleButtonB('button', e.currentTarget.textContent)}>{createQuiz.data.canvas1.button}</p> </button>
                
                <p contentEditable="true" spellcheck="false" suppressContentEditableWarning={true} data-name="tel" onBlur={(e) => handleInput('tel', e.currentTarget.textContent)}>{createQuiz.data.canvas1.tel}</p>
                <p contentEditable="true" spellcheck="false" suppressContentEditableWarning={true} data-name="name" onBlur={(e) => handleInput('name', e.currentTarget.textContent)}>{createQuiz.data.canvas1.name}</p>
              </div>
            </div>
            <Instrument />              
          </>
        ) : (
          <div id="startOff">
            <div className="item">
              <h3>Стартовая страница</h3>
              <p>Если нужно быстро заинтересовать посетителя, то стартовой страницы будет достаточно: большая иллюстрация, заголовок-оффер, абзац мотивационного текста и кнопка.</p>
              <button onClick={() => handleTurnOn()}>Создать <img src={arrow2} alt="#" /></button>
              <img src={bg1} alt="#" />
            </div>
            <div className="item">
              <h3>Pages</h3>
              <p>Скоро будет</p>
              <img src={bg2} alt="#" />
            </div>
          </div>
        )}
      </div>
      <div className="start">
        <p onClick={() => handleTurnOff()}><img src={close} alt="#" />Отключить стартовую страницу</p>
        <p onClick={() => handleButton(1)}>Настроить вопросы<img src={arrow} alt="#" /></p>
      </div>  
    </>
  )
}

export default Canvas1;