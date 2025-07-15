import React, { useState } from 'react';
import { DELETEHISTORY } from '../../../../middleware';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import trash from '../../../img/history/trash.svg';

const Dprocess = ({data}) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.Token);
    const [isDeleted, setDeleted] = useState(false);
    const handleDelete = (id) => {
      dispatch(DELETEHISTORY(token, id));
      setDeleted(true)
    };
  return (
    <div className={`refund item ${isDeleted ? 'deleted' : ''}`}>
        <div className='id'>#{data.id}</div>
        <p className='date'>{data.date}</p>
        <p className='money'>{data.amount}</p>
        <div>Возврат</div>
        <button className="trash" onClick={isDeleted ?  null : () => handleDelete(data.id)}><img src={trash} alt="#" /></button>
    </div>
  )
}
export default Dprocess;