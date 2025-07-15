import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { QUIZESALL } from '../../../../middleware';
import { TURNONQUIZ, PUTQUIZ } from '../../../../middleware';
import { setLk2, setLk } from '../../../../actions';
import './style.scss';
import logo from '../../../img/Constructor/leftbar/logo.svg';
import pen from '../../../img/Constructor/leftbar/pen.svg';
import arrow1 from '../../../img/Constructor/leftbar/arrow1.svg';
import arrow2 from '../../../img/Constructor/leftbar/arrow2.svg';
import install from '../../../img/Constructor/leftbar/install.svg';
import at from '../../../img/Constructor/leftbar/at.svg';
import extend from '../../../img/Constructor/leftbar/extend.svg';
import integ from '../../../img/Constructor/leftbar/integ.svg';
import settings from '../../../img/Constructor/leftbar/settings.svg';
import design from '../../../img/Constructor/leftbar/design.svg';
import eye from '../../../img/Constructor/leftbar/eye.svg';
import Balance from '../../../img/leftbar/balance.svg';
import Balance2 from '../../../img/leftbar/balance2.svg';
import PopUp from '../../lk/pop-up/PopUp';

const LeftBar = () => {
  const navigate = useNavigate();   
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.balance);
  const data = useSelector((state) => state.createQuiz.data);
  const currentQuizID = useSelector((state) => state.createQuiz.currentQuizID);
  const token = useSelector((state) => state.Token);
  const [isModalActive, setIsModalActive] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const isActive = useSelector((state) => state.leftbarConstr);
  const handleClick = (route, id) => {
    navigate(route); 
    dispatch(setLk(2)); 
    dispatch(setLk2(id));
    if (Object.keys(data).length > 0) {
      dispatch(PUTQUIZ(currentQuizID, token, data));
    }
  };
  const handleAccountClick = () => {
    setIsPopupVisible(true);
  };
  const handleDocumentClick = (event) => {
    if (!event.target.closest('.account') && !event.target.closest('.pop-up')) {
      setIsPopupVisible(false);
    }
  };
  const handleOpenModal = () => {
    setIsModalActive(true);
  };
  const handleBack = () => {
    dispatch(setLk(2));   
    navigate('/user');  
  }
  const handleCloseModal = () => {
    setIsModalActive(false);  
  };
  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);
  const handleOn = () => {
    dispatch(TURNONQUIZ(token, currentQuizID));
  };
  useEffect(() => {
    dispatch(QUIZESALL(token)); 
  }, [isActive, isModalActive, isPopupVisible]);

  useEffect(() => {
    const dataSizeInMB = new Blob([JSON.stringify(data)]).size / (1024 * 1024);
    if (dataSizeInMB > 16) {
      alert('Объем данных превышает 16 МБ! Вы исчерпали своий лимит данных на квиз, дальше квиз не будет сохранятся. Для дальнейшего сохранения перейдите на другой тариф.');
    } else {
      console.log(dataSizeInMB);
      const interval = setInterval(() => {
        if (Object.keys(data).length > 0) {
          dispatch(PUTQUIZ(currentQuizID, token, data));
        };

      }, 1400); 
      return () => clearInterval(interval);      
    }
  }, [currentQuizID, token, data]);
  return (
    <>
      <div id="LeftBarConstr">
        <div className="head">
         <img src={logo} alt="#" />
          <button onClick={() => handleClick('/user')}></button>
        </div>
        <nav>
          <div className={`edit ${isActive === 1 ? 'active' : ''}`} onClick={() => handleClick(`/user/quiz/${currentQuizID}`, 1)}>
            <img src={pen} alt="#" />
            <p>Редактор</p>
            <img src={isActive === 1 ? arrow1 : arrow2} alt="#"/>
          </div>
          <div className={`install ${isActive === 2 ? 'active' : ''}`} onClick={() => handleClick(`/user/quiz/${currentQuizID}/install`, 2)}>
            <img src={install} alt="#" />
            <p>Установка</p>
            <img src={isActive === 2 ? arrow1 : arrow2} alt="#"/>
          </div>
          <div className={`advert ${isActive === 3 ? 'active' : ''}`} onClick={() => handleClick(`/user/quiz/${currentQuizID}/startadvert`, 3)}>
            <img src={at} alt="#" />
            <p>Запуск рекламы</p>
            <img src={isActive === 3 ? arrow1 : arrow2} alt="#"/>
          </div>        
        </nav>
        <div className={`extensions ${isActive === 4 ? 'active' : ''}`} onClick={() => handleClick(`/user/quiz/${currentQuizID}/plugins`, 4)}>
          <img src={extend} alt="#" />
          <p>Расширения</p>
          <img src={isActive === 4 ? arrow1 : arrow2} alt="#"/>
        </div>
        <div className={`design ${isActive === 5 ? 'active' : ''}`} onClick={() => handleClick(`/user/quiz/${currentQuizID}/design`, 5)}>
          <img src={design} alt="#" />
          <p>Дизайн</p>
          <img src={isActive === 5 ? arrow1 : arrow2} alt="#"/>
        </div>
        <div className={`integrations ${isActive === 6 ? 'active' : ''}`} onClick={() => handleClick(`/user/quiz/${currentQuizID}/integrations`, 6)}>
          <img src={integ} alt="#" />
          <p>Интеграции</p>
          <img src={isActive === 6 ? arrow1 : arrow2} alt="#"/>
        </div>
        <div className={`settings ${isActive === 7 ? 'active' : ''}`} onClick={() => handleClick(`/user/quiz/${currentQuizID}/settings`, 7)}>
          <img src={settings} alt="#" />
          <p>Настройки</p>
          <img src={isActive === 7 ? arrow1 : arrow2} alt="#"/>
        </div>
        <div className="prev">
          <img src={eye} alt="#" />
          <p>Предпросмотр</p>
          <button onClick={() => handleClick(`/user/quiz/${currentQuizID}/previev/pc`)}></button>
          <button onClick={() => handleClick(`/user/quiz/${currentQuizID}/previev/mob`)}></button>
        </div>
        <button className="publish" onClick={() => handleOn()}>Опубликовать</button>
      </div>  
      <div id="LeftBarConstrMobile">
        <div className="head">
          <button className="burger" onClick={handleOpenModal}></button>
          <img src={logo} alt="#" onClick={() => handleBack()}/>
          <div className='balance'>
            <p><img src={Balance} alt="#" />Баланс</p>
            <button onClick={() => handleClick('/user/balance')}><img src={Balance2} alt="#" /><p>{balance} ₽</p></button>
          </div>
          <div className="account" onClick={handleAccountClick}>
            <button className="base">D</button>
            <div className="new">1</div>
          </div>         
          {isPopupVisible && <PopUp />} 
        </div>
      </div> 
      <div id="modalConstr" className={isModalActive ? 'active' : ''}>
        <div className="close" onClick={() => handleCloseModal()}></div>
        <nav>
          <div className={`edit ${isActive === 1 ? 'active' : ''}`} onClick={() => handleClick(`/user/quiz/${currentQuizID}`, 1)}>
            <img src={pen} alt="#" />
            <p>Редактор</p>
            <img src={isActive === 1 ? arrow1 : arrow2} alt="#"/>
          </div>
          <div className={`install ${isActive === 2 ? 'active' : ''}`} onClick={() => handleClick(`/user/quiz/${currentQuizID}/install`, 2)}>
            <img src={install} alt="#" />
            <p>Установка</p>
            <img src={isActive === 2 ? arrow1 : arrow2} alt="#"/>
          </div>
          <div className={`advert ${isActive === 3 ? 'active' : ''}`} onClick={() => handleClick(`/user/quiz/${currentQuizID}/startadvert`, 3)}>
            <img src={at} alt="#" />
            <p>Запуск рекламы</p>
            <img src={isActive === 3 ? arrow1 : arrow2} alt="#"/>
          </div>         
        </nav>
        <div className={`extensions ${isActive === 4 ? 'active' : ''}`} onClick={() => handleClick(`/user/quiz/${currentQuizID}/plugins`, 4)}>
          <img src={extend} alt="#" />
          <p>Расширения</p>
          <img src={arrow2} alt="#" />
        </div>
        <div className={`design ${isActive === 5 ? 'active' : ''}`} onClick={() => handleClick(`/user/quiz/${currentQuizID}/design`, 5)}>
          <img src={design} alt="#" />
          <p>Дизайн</p>
          <img src={arrow2} alt="#" />
        </div>
        <div className={`integrations ${isActive === 6 ? 'active' : ''}`} onClick={() => handleClick(`/user/quiz/${currentQuizID}/integrations`, 6)}>
          <img src={integ} alt="#" />
          <p>Интеграции</p>
          <img src={arrow2} alt="#" />
        </div>
        <div className={`settings ${isActive === 7 ? 'active' : ''}`} onClick={() => handleClick(`/user/quiz/${currentQuizID}/settings`, 7)}>
          <img src={settings} alt="#" />
          <p>Настройки</p>
          <img src={arrow2} alt="#" />
        </div>
        <div className="prev">
          <img src={eye} alt="#" />
          <p>Предпросмотр</p>
          <button onClick={() => handleClick(`/user/quiz/${currentQuizID}/previev/pc`)}></button>
          <button onClick={() => handleClick(`/user/quiz/${currentQuizID}/previev/mob`)}></button>
        </div>
        <button className="publish" onClick={() => handleOn()}>Опубликовать</button>
      </div>
      <div id="modal_bg" className={isModalActive ? 'active' : ''}></div>
    </>

  )
}
export default LeftBar;