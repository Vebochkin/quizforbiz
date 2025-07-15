import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BANNEDUSERS } from '../../../middleware';
import LeftBar from './leftBar/LeftBar';
import Logout from './logout/Logout';
import './style.scss';
import eye from '../img/eye_close.svg';
import edit from '../img/edit.svg';
import trash from '../img/trash.svg';
import { useNavigate } from 'react-router';

const BlockedUsers = () => {  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.Token);
  const blockedUsers = useSelector((state) => state.admin.blockedUsers);  
  const isBlocked = useSelector((state) => state.admin.isBlocked);  
  
  const [searchAmountInput, setSearchAmountInput] = useState('');
  const [searchEmailInput, setSearchEmailInput] = useState('');
  const [searchDateInput, setSearchDateInput] = useState('');
  
  const [searchAmount, setSearchAmount] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchDate, setSearchDate] = useState('');
  useEffect(() => {
    if (!isBlocked) {
      dispatch(BANNEDUSERS(token));      
    }
  }, [dispatch, isBlocked, token]);
  
  const filteredBlockedUsers = blockedUsers.filter(user => {
    const matchesAmount = searchAmount ? user.amount >= Number(searchAmount) : true;
    const matchesEmail = searchEmail ? (user.email || user.name).toLowerCase().includes(searchEmail.toLowerCase()) : true;
    const matchesDate = searchDate ? user.createAt.startsWith(searchDate) : true; 
    return matchesAmount && matchesEmail && matchesDate;
  });
  
  const handleSearchClick = () => {
    setSearchAmount(searchAmountInput);
    setSearchEmail(searchEmailInput);
    setSearchDate(searchDateInput);
  };

  return (
    <div className='container-fluid'>
      <div className="row admin">
        <LeftBar />       
        <div className="col-xxl-10" id='BlockedUsers'>
          <h1>Заблокированные пользователи</h1>
          <Logout />
          <div>
            <form onSubmit={(e) => e.preventDefault()}>
              <input 
                type="number" 
                placeholder='Поиск по сумме'
                value={searchAmountInput}
                onChange={(e) => setSearchAmountInput(e.target.value)}
              />
              <input 
                type="email" 
                placeholder='Поиск по почте'
                value={searchEmailInput}
                onChange={(e) => setSearchEmailInput(e.target.value)}
              />
              <input 
                type="date" 
                value={searchDateInput}
                onChange={(e) => setSearchDateInput(e.target.value)}
              />
              <button type="button" onClick={handleSearchClick}>Найти</button>
            </form>
            <div className="filters">
              <p>ID</p>
              <p>Дата создания учётной записи</p>
              <p>Логин (почта)</p>
              <p>Основание</p>
              <p>Редактирование</p>
            </div>
            {filteredBlockedUsers.length > 0 ? filteredBlockedUsers.map(User => (
              <div className="answer" key={User.id}>
                <p>{User.id}</p>
                <p>{User.created_at}</p>                
                <p>{User.name || User.email}</p>
                <p>{User.reason}</p>
                <div>
                  <button><img src={trash} alt="#" /></button>
                  <button><img src={eye} alt="#" /></button>
                  <button onClick={() => navigate(`/admin/user/${User.id}`)}><img src={edit} alt="#" /></button>
                </div>
              </div>
            )) : null}
          </div>
        </div>  
      </div>
    </div>
  )
}

export default BlockedUsers;