import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { USERBANNED } from '../../../../middleware';
import close from '../../img/close.svg';

const Main = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.Token);
    const user = useSelector((state) => state.admin.currentUser);
  return (
    <div id='main'>
        <div className="icon">
            <div>UF</div>
            <p>{user.name}</p>
        </div>
        <div className="info">
            <div className="left">
                <p>Имя:</p>
                <p>Почта:</p>
                <p>ID пользователя:</p>
                <p>Тип аккаунта:</p>
                <p>Баланс:</p>
                <p>Замороженная сумма:</p>
                <p>Общая сумма баллов:</p>
                <p>Время создание:</p>
            </div>
            <div className="right">
                <p>{user.name}</p>
                <p>{user.email}</p>
                <div>{user.id}</div>
                <p>{user.rate_name}</p>
                <p>{user.balance}</p>
                <p>{user.frozenBalance}</p>
                <p>{user.score}</p>                
                <p>{user.created_at}</p>

            </div>
        </div>
        <div className="actions">
            <button><img src={close} alt="#" />Заморозить счёт</button>
            <button onClick={() => dispatch(USERBANNED(token, {"user_id": user.id, "is_banned": 0}))}>Разблокировать</button>
            <button onClick={() => dispatch(USERBANNED(token, {"user_id": user.id, "is_banned": 1}))}>Заблокировать</button>
        </div>
    </div>
  )
}

export default Main;