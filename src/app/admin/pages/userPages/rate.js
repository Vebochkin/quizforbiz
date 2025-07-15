import React, { useState, useEffect } from 'react';
import { USERCHANGERATE } from '../../../../middleware';
import { useSelector, useDispatch } from 'react-redux';

const Rate = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.admin.currentUser );
  const token = useSelector((state) => state.Token);
  const [rateID, setRateID] = useState(user.id);
  const [postText, setPostText] = useState('Подтвердить');

  useEffect(() => {
    setRateID(user.rate_id);
  }, [user.id]);

  const handleChangeRate = () => {
    if (rateID !== null) {
      dispatch(USERCHANGERATE(token, user.id, rateID))
        .then(() => {
          setPostText('Успешно');
          setTimeout(() => setPostText('Подтвердить'), 3000);
        })
        .catch(() => {
          setPostText('Ошибка');
          setTimeout(() => setPostText('Подтвердить'), 3000);
        });
    }
  };
  return (
    <div id='rate'>
      <h1>Настройка типа пользователя</h1>
      <div>Тип пользователя:
        <select value={rateID} onChange={(e) => setRateID(Number(e.target.value))}>
          <option value="1">Base</option>
          <option value="2">Optim</option>
          <option value="3">Premium</option>
        </select>
      </div>
      <div className="btns">
        <button onClick={() => handleChangeRate()}>{postText}</button>
        <button onClick={() => setRateID(user.id)}>Отмена</button>
      </div>
    </div>
  )
}

export default Rate;