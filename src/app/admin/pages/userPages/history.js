import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { USER } from '../../../../middleware';
import reload from '../../img/reload.svg';

const History = () => {
    const dispatch = useDispatch();    
    const user = useSelector((state) => state.admin.currentUser );
    const token = useSelector((state) => state.Token);
    
    const [selectedStatus, setSelectedStatus] = useState('');
    useEffect(() => {
        dispatch(USER(token, user.id));
    }, [dispatch, token, user.id]); 

    const filteredHistory = user.balance_history.filter(story => {
        return selectedStatus ? story.status === selectedStatus : true;
    });
  return (
    <div id='history'>
        <div>
            <h1>Пользовательские данные транзакции</h1>
            <div className="filters">
                {/* <select>
                    <option value="" selected disabled>Тип заказа</option>
                    <option value="option1">Стартовая страница</option>
                    <option value="option2">Вопросы</option>
                    <option value="option3">Форма контактов</option>
                </select> */}
                <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                >
                    <option value="" disabled>Статус заказа</option>
                    <option value="ok">ok</option>
                    <option value="error">error</option>
                    <option value="process">process</option>
                </select>
                <button onClick={() => dispatch(USER(token, user.id))}>
                    Обновить<img src={reload} alt="#" />
                </button>
            </div>
            <div className="names">
                <p>Номер заказа</p>
                <p>Сумма сделки</p>
                <p>Баланс после сделки</p>
                <p>Название типа</p>
                <p>Статус сделки</p>
                <p>Примечание</p>
                <p>Время создания</p>
            </div>
            {filteredHistory.map(story => (
                <div className='story' key={story.id}>
                    <p>{story.id}</p>
                    <p>{story.amount}</p>
                    <p>{story.balanceAfter}</p>
                    <p>{story.status}</p>
                    <p>{story.date}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default History;