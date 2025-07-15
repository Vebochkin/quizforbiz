import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { DEPOSITS } from '../../../middleware';
import LeftBar from './leftBar/LeftBar';
import Logout from './logout/Logout';
import './style.scss';
import eye from '../img/Eye.svg';

const Deposit = () => {
  const dispatch = useDispatch();
  const deposits = useSelector((state) => state.admin.deposits);
  const token = useSelector((state) => state.Token);
  const navigate = useNavigate();

  const [searchAmountInput, setSearchAmountInput] = useState('');
  const [searchEmailInput, setSearchEmailInput] = useState('');
  const [searchDateInput, setSearchDateInput] = useState('');

  const [searchAmount, setSearchAmount] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchDate, setSearchDate] = useState('');

  useEffect(() => {
    dispatch(DEPOSITS(token));
  }, [dispatch, token]);

  const filteredDeposits = deposits.filter(deposit => {
    const matchesAmount = searchAmount ? deposit.amount >= Number(searchAmount) : true;
    const matchesEmail = searchEmail ? deposit.email.toLowerCase().includes(searchEmail.toLowerCase()) : true;
    const matchesDate = searchDate ? deposit.created_at.startsWith(searchDate) : true;
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
        <div className="col-xxl-10" id='Deposits'>
          <h1>Пополнения</h1>
          <Logout />
          <div>
            <form onSubmit={e => e.preventDefault()}>
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
              <p>Номер</p>
              <p>Время и дата</p>
              <p>ФИО (почта)</p>
              <p>Сумма</p>
              <p>Способ оплаты</p>
              <p>Транзакция</p>
              <p>Причина</p>
              <p>Аккаунт</p>
            </div>
            {filteredDeposits.map((deposit, index) => (
              <div className="answer" key={index}>
                <p>{deposit.user_id}</p>
                <p>{deposit.created_at}</p>                
                <p>{deposit.name}<br/>{deposit.email}</p>
                <p>{deposit.amount}</p>                
                <p>Ю money</p>
                <div className={`${deposit.status}`}>
                  {deposit.status === 'ok' ? 'подтверждена' : ''}
                  {deposit.status === 'error' ? 'отклонено' : ''}
                  {deposit.status === 'pending' ? 'в процессе' : ''}
                </div>                
                <p>{deposit.reason}</p>
                <button onClick={() => navigate('/admin/user/123456')}><img src={eye} alt="#" /></button>
              </div>
            ))}
          </div>
        </div>  
      </div>
    </div>
  );
}

export default Deposit;
