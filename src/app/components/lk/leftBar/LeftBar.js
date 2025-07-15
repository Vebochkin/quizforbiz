import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, setLk, isQuizes, setNoQuiz } from '../../../../actions';
import {
  LOGOUT,
  APPLICATIONS,
  QUIZESALL,
  BALANCE,
  NOTIFICATIONS,
  HISTORY,
  COUNTBASE,
  PROFILE,
} from '../../../../middleware';
import './style.scss';
import Logo from '../../../img/leftbar/logo.svg';
import Arrow from '../../../img/leftbar/arrow.svg';
import Arrow2 from '../../../img/leftbar/arrow2.svg';
import Support from '../../../img/leftbar/support.svg';
import Logout from '../../../img/leftbar/logout.svg';
import Rate from '../../../img/leftbar/rate.svg';
import applications from '../../../img/leftbar/applic.svg';
import Balance from '../../../img/leftbar/balance.svg';
import Balance2 from '../../../img/leftbar/balance2.svg';
import PopUp from '../pop-up/PopUp';
import Popup from '../notification/Popup';

const LeftBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.balance);
  const rate = useSelector((state) => state.rate);
  const token = useSelector((state) => state.Token);
  const application = useSelector((state) => state.applications);
  const quizes = useSelector((state) => state.quizes);
  const [isModalActive, setIsModalActive] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const isActive = useSelector((state) => state.leftbarLk);
  const isQuiz = useSelector((state) => state.isQuizes);
  const isApplications = useSelector((state) => state.isApplications);
  let count = 0;
  const notifications = useSelector((state) => state.notifications);

  const handleClick = (route, id) => {
    navigate(route);
    dispatch(setLk(id));
  };

  const handleAccountClick = () => {
    setIsPopupVisible(true);
  };

  const handleDocumentClick = (event) => {
    if (!event.target.closest('.account') && !event.target.closest('.pop-up')) {
      setIsPopupVisible(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const handleLogOut = () => {
    dispatch(LOGOUT(token));
  };

  const handleOpenModal = () => {
    setIsModalActive(true);
  };

  const handleCloseModal = () => {
    setIsModalActive(false);
  };

  const handleRate = () => {
    if (rate === 'Бесплатный') {
      return 'base';
    } else if (rate === 'Оптимальный') {
      return 'optim';
    } else if (rate === 'Премиум') {
      return 'prem';
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (!isQuiz) {
        dispatch(HISTORY(token));
        dispatch(BALANCE(token));
        dispatch(QUIZESALL(token));
        dispatch(NOTIFICATIONS(token));
        dispatch(COUNTBASE(token));
        dispatch(PROFILE(token));
      }
      if (!isApplications) {
        dispatch(APPLICATIONS(token));
      }
    }, 1000);
    dispatch(setNoQuiz());
  });

  return (
    <>
      <div id="LeftBarLk" className="pc">
        <div className="head">
          <Popup />
          <img src={Logo} alt="#" />
          <div className="balance">
            <p><img src={Balance} alt="#" />Баланс</p>
            <button onClick={() => handleClick('/user/balance')}><img src={Balance2} alt="#" /><p className={balance < 0 ? 'minus' : ''}>{balance} ₽</p></button>
          </div>
          <div className="account" onClick={handleAccountClick}>
            <button className={handleRate()}>D</button>
            <div className="new">{notifications.length}</div>
            {isPopupVisible && <PopUp />}
          </div>
        </div>
        <div className="applications" onClick={() => handleClick('/user/applications')}>
          <img src={applications} alt="#" />
          <p>Все заявки</p>
          <div className="count">{application.length}</div>
        </div>
        <div className="rate" onClick={() => handleClick('/user/rates')}>
          <img src={Rate} alt="#" />
          <p>Тариф</p>
          <div className={`rates ${rate === 'Бесплатный' ? 'activ' : ''}`}>Бесплатный</div>
          <div className={`rates ${rate === 'Оптимальный' ? 'activ' : ''}`}>Оптимальный</div>
          <div className={`rates ${rate === 'Премиум' ? 'activ' : ''}`}>Премиум</div>
          <div className="plus">+</div>
        </div>
        <nav>
          <div className="btns">
            <button onClick={() => handleClick('/user/createquizes', 1)} className={isActive === 1 ? 'active' : ''}>Создать квиз <img src={isActive === 1 ? Arrow : Arrow2} alt="#" /></button>
            <button onClick={() => handleClick('/user', 2)} className={isActive === 2 ? 'active' : ''}>Недавние <img src={isActive === 2 ? Arrow : Arrow2} alt="#" /></button>
            <button onClick={() => handleClick('/user', 3)} className={isActive === 3 ? 'active' : ''}>Мои квизы<div>{quizes.length}</div></button>
            <a href="#"><img src={Support} alt="#" />Написать в поддержку</a>
          </div>
          <a href="#" onClick={() => handleLogOut()}><img src={Logout} alt="#" />Сменить аккаунт</a>
        </nav>
        <div className="refer">
          <p>Партнёрская программа</p>
          <button onClick={() => handleClick('/user/referal')}>Заработать</button>
        </div>
      </div>

      <div id="LeftBarLkMobile" className="mobile">
        <div className="head">
          <Popup />
          <button className="burger" onClick={handleOpenModal}></button>
          <img src={Logo} alt="#" />
          <div className="balance">
            <p><img src={Balance} alt="#" />Баланс</p>
            <button onClick={() => handleClick('/user/balance')}><img src={Balance2} alt="#" /><p>{balance} ₽</p></button>
          </div>
          <div className="account" onClick={handleAccountClick}>
            <button className="base">D</button>
            <div className="new">{notifications.length}</div>
          </div>
          {isPopupVisible && <PopUp />}
        </div>
      </div>

      <div id="modal" className={isModalActive ? 'active' : ''}>
        <button className="close" onClick={handleCloseModal}></button>
        <div className="applications" onClick={() => handleClick('/user/applications')}>
          <img src={applications} alt="#" />
          <p>Все заявки</p>
          <div className="count">{count}</div>
        </div>
        <div className="rate" onClick={() => handleClick('/user/rates')}>
          <img src={Rate} alt="#" />
          <p>Тариф</p>
          <div className={`rates ${rate === 'Бесплатный' ? 'activ' : ''}`}>Бесплатный</div>
          <div className={`rates ${rate === 'Оптимальный' ? 'activ' : ''}`}>Оптимальный</div>
          <div className={`rates ${rate === 'Премиум' ? 'activ' : ''}`}>Премиум</div>
          <div className="plus">+</div>
        </div>
        <nav>
          <div className="btns">
            <button onClick={() => handleClick('/user/createquizes', 1)} className={isActive === 1 ? 'active' : ''}>Создать квиз <img src={isActive === 1 ? Arrow : Arrow2} alt="#" /></button>
            <button onClick={() => handleClick('/user', 2)} className={isActive === 2 ? 'active' : ''}>Недавние <img src={isActive === 2 ? Arrow : Arrow2} alt="#" /></button>
            <button onClick={() => handleClick('/user', 3)} className={isActive === 3 ? 'active' : ''}>Мои квизы<div>{quizes.length}</div></button>
            <a href="#"><img src={Support} alt="#" />Написать в поддержку</a>
          </div>
          <a href="#" onClick={() => handleLogOut()}><img src={Logout} alt="#" />Сменить аккаунт</a>
        </nav>
        <div className="refer">
          <p>Партнёрская программа</p>
          <button onClick={() => handleClick('/user/referal')}>Заработать</button>
        </div>
      </div>
      <div id="modalBg" className={isModalActive ? 'active' : ''}></div>
    </>
  );
};

export default LeftBar;