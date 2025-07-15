import React from 'react';
import { useSelector } from 'react-redux';
import Logout from './logout/Logout';
import LeftBar from './leftBar/LeftBar';

const WriteOff = () => {
  return (
    <div className='container-fluid'>
      <div className="row admin">
        <LeftBar />       
        <div className="col-xxl-10" id='WriteOff'>
          <h1>Подтвержденый вывод</h1>
          <Logout />
          <div>
            <form>
              <input type="number" placeholder='Поиск по сумме'/>
              <input type="email" placeholder='Поиск по почте'/>
              <input type="date" />
              <button>Найти</button>
            </form>
            <div className="filters">
              <p>Номер</p>
              <p>Время и дата</p>
              <p>ФИО (почта)</p>
              <p>Сумма</p>
            </div>
            
          </div>
        </div>
      </div>
  </div>
  )
}

export default WriteOff;