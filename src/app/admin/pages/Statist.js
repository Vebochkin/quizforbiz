import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { STATIS } from '../../../middleware';
import Logout from './logout/Logout';
import LeftBar from './leftBar/LeftBar';
import './style.scss';

const Statist = () => {
  const dispatch = useDispatch();
  const statistic = useSelector((state) => state.admin.statistic);
  const token = useSelector((state) => state.Token);
  useEffect(() => {
    dispatch(STATIS(token));
  }, [])
  return (
    <div className='container-fluid'>
      <div className="row admin">
        <LeftBar />       
        <div className="col-xxl-10" id='Statist'>
          <h1>Статистика</h1>
          <div className="inputs">
            <label htmlFor="from">От</label>
            <input type="date" name='from'/>
            <label htmlFor="to">До</label>  
            <input type="date" name='to'/>   
            <button>Поиск</button>         
          </div>          
          <div className="btns">
            <button>Подробнее</button>
            <Logout />
          </div>
          <div className="items">
            <div className="item">
              <h3>Всего пользователей</h3>
              <p>13/9</p>
              <h2>{statistic.countUsers}</h2>
            </div>
            <div className="item">
              <h3>Пополнений</h3>
              <p>13/9</p>
              <h2>{statistic.deposits}</h2>
            </div>
            <div className="item">
              <h3>Списаний</h3>
              <p>13/9</p>
              <h2>{statistic.writeOff}</h2>
            </div>
            <div className="item">
              <h3>Оплата с помощью Ю касса</h3>
              <p>13/9</p>
              <h2>{statistic.yuMoney}</h2>
            </div>
            <div className="item">
              <h3>Создано квизов всего</h3>
              <p>13/9</p>
              <h2>{statistic.quizAll}</h2>
            </div>
            <div className="item">
              <h3>Транзакций всего</h3>
              <p>13/9</p>
              <h2>{statistic.transactions}</h2>
            </div>
            <div className="item">
              <h3>Отклоненные транзакции</h3>
              <p>13/9</p>
              <h2>{statistic.transactionsError}</h2>
            </div>
            <div className="item">
              <h3>Количество снятий средств</h3>
              <p>13/9</p>
              <h2>{statistic.output}</h2>
            </div>
            <div className="item">
              <h3>Бесплатных тарифов</h3>
              <p>13/9</p>
              <h2>{statistic.base}</h2>
            </div>
            <div className="item">
              <h3>Оптимальных тарифов</h3>
              <p>13/9</p>
              <h2>{statistic.optim}</h2>
            </div>
            <div className="item">
              <h3>Премиумных тарифов</h3>
              <p>13/9</p>
              <h2>{statistic.premium}</h2>
            </div>
          </div>
        </div>  
      </div>
    </div>
  )
}

export default Statist;