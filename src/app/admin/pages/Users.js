import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { noUser, noDataUser } from '../../../actions';
import { USERS } from '../../../middleware';
import LeftBar from './leftBar/LeftBar';
import Logout from './logout/Logout';
import './style.scss';
import eye from '../img/Eye.svg';

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();  
  const token = useSelector((state) => state.Token);
  const users = useSelector((state) => state.admin.users);
  const isUsers = useSelector((state) => state.admin.isUsers);
  
  const [searchBalanceInput, setSearchBalanceInput] = useState('');
  const [searchEmailInput, setSearchEmailInput] = useState('');
  const [searchDateInput, setSearchDateInput] = useState('');

  const [searchBalance, setSearchBalance] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchDate, setSearchDate] = useState('');

  useEffect(() => {
    if (!isUsers) {
      dispatch(USERS(token));      
    }
    dispatch(noUser());
    dispatch(noDataUser());
  }, [dispatch, isUsers, token]);

  const filteredUsers = users.filter(user => {
    const matchesBalance = searchBalance ? user.balance >= Number(searchBalance) : true;
    const matchesEmail = searchEmail ? user.email.toLowerCase().includes(searchEmail.toLowerCase()) : true;
    const matchesDate = searchDate ? user.created_at.startsWith(searchDate) : true;
    return matchesBalance && matchesEmail && matchesDate;
  });

  const handleSearchClick = () => {
    setSearchBalance(searchBalanceInput);
    setSearchEmail(searchEmailInput);
    setSearchDate(searchDateInput);
  };

  return (
    <div className='container-fluid'>
      <div className="row admin">
        <LeftBar />       
        <div className="col-xxl-10" id='Users'>
          <h1>Аккаунты пользователей</h1>
          <Logout />
          <div>
            <form onSubmit={(e) => e.preventDefault()}>
              <input 
                type="number" 
                placeholder='Поиск по сумме'
                value={searchBalanceInput}
                onChange={(e) => setSearchBalanceInput(e.target.value)}
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
              <p>Почта</p>              
              <p>Баланс</p>
              <p>Тариф</p>
              <p>Аккаунт</p>
            </div>
            {filteredUsers.map(user => (
              <div className="answer" key={user.id}>
                <p>{user.id}</p>
                <p>{user.created_at}</p>                
                <p>{user.email}</p>
                <p>{user.balance}</p>                                      
                <p>{user.rate_name}</p>
                <button onClick={() => navigate(`/admin/user/${user.id}`)}><img src={eye} alt="#" /></button>
              </div>
            ))}
          </div>
        </div>  
      </div>
    </div>
  );
}

export default Users;
