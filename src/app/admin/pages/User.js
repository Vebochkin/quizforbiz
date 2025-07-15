import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { USER } from '../../../middleware';
import LeftBar from './leftBar/LeftBar';
import Deposits from './userPages/deposits';
import Main from './userPages/main';
import History from './userPages/history';
import Rate from './userPages/rate';
import Referal from './userPages/referal';

const User = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.Token);
  const isUser = useSelector((state) => state.admin.isUser);
  const [currentPage, setCurrentPage] = useState(0);
  const { userID } = useParams(); 
  const handleChange = (index) => {
    setCurrentPage(index);
  };
  const renderPage = () => {
    switch (currentPage) {
      case 0: 
        return <Main />

      case 1: 
        return <Deposits />

      case 2: 
        return <History />

      case 3: 
        return <Rate />

      case 4: 
        return <Referal />

      default: return null
    }
  }
  useEffect(() => {
    if (!isUser) {
      dispatch(USER(token, userID));  
    }
  }, [])
  return (
    <div className='container-fluid'>
      <div className="row admin">
        <LeftBar />       
        <div className="col-xxl-10" id='User'>
          <div className="head">
            <div onClick={() => handleChange(0)} className={currentPage === 0 ? 'active' : ''}>Основное</div>
            <div onClick={() => handleChange(1)} className={currentPage === 1 ? 'active' : ''}>Пополнение суммы</div>
            <div onClick={() => handleChange(2)} className={currentPage === 2 ? 'active' : ''}>Транзакции</div>
            <div onClick={() => handleChange(3)} className={currentPage === 3 ? 'active' : ''}>Настройки тарифа пользователя</div>
            <div  className={currentPage === 4 ? 'active' : ''}>Приглашения</div>
          </div>
          {renderPage()}
        </div>
      </div>
    </div>
  )
}

export default User;