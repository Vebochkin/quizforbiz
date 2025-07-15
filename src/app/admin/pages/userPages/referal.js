import React, { use } from 'react';
import { useSelector } from 'react-redux';

const Referal = () => {
    const user = useSelector((state) => state.admin.currentUser);
  return (
    <div id='referal'>
        <div>
            <h1>Приглашения</h1>
            <div>
                <p>Детали приглашения</p>
                <p>Добавить:</p>
                <select>
                    <option value="option1">Base</option>
                    <option value="option2">Optim</option>
                    <option value="option3">Premium</option>
                </select>
                <p>Общая сумма пополнения:</p>
                <input type="text" />
            </div>
            <div className="names">
                <p>ID</p>
                <p>Фамилия</p>
                <p>Имя</p>
                <p>Сумма пополнения</p>
                <p>Время создания</p>
            </div>
            {user.referal.map(item => (
                <div className="item" key={item.id}>
                    <p>{item.id}</p>
                    <p>{item.surname}</p>
                    <p>{item.name}</p>
                    <p>{item.amount}</p>
                    <p>{item.date}</p>
                </div>
            ))}
            
        </div>
    </div>
  )
}

export default Referal;