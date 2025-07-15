import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { USERDEPOSIT } from '../../../../middleware';

const Deposits = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const [textAreaValue, setTextAreaValue] = useState('');
  const token = useSelector((state) => state.Token);
  const user = useSelector((state) => state.admin.currentUser);
  const [postText, setPostText] = useState('Подтвердить');

  const handlePost = () => {
    const [integerPart, decimalPart] = inputValue.split('.'); 
    const integerValue = integerPart ? parseInt(integerPart, 10) : 0; 
    const decimalValue = decimalPart ? parseFloat(`0.${decimalPart}`) : 0;

    if (!isNaN(integerValue) && !isNaN(decimalValue)) {
      dispatch(USERDEPOSIT(token, {
        "user_id": user.id,
        "total": integerValue,
        "total_less": decimalValue * 100,
        "comment": textAreaValue
      }))
        .then(() => {
          setPostText('Успешно');
          setTimeout(() => setPostText('Подтвердить'), 3000);
        })
        .catch(() => {
          setPostText('Ошибка');
          setTimeout(() => setPostText('Подтвердить'), 3000);
        });
    }
    handleClear();    
       
  };
  const handleClear = () => {
    setTextAreaValue('')
    setInputValue('');
    setPostText('Подтвердить');
  };

  return (
    <div id='deposit'>
      <h1>Пополнение суммы</h1>
      <div>
        Сумма
        <input
          type="number"
          step="0.01"
          required
          placeholder="Пополнение счёта"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <div>
        Примечание
        <textarea 
          required 
          placeholder="Описание"           
          value={textAreaValue}
          onChange={(e) => setTextAreaValue(e.target.value)}
          ></textarea>
        <button type='submit' onClick={handlePost}>{postText}</button>
        <button type='button' onClick={() => handleClear()}>Очистить</button>
      </div>
    </div>
  );
};

export default Deposits;