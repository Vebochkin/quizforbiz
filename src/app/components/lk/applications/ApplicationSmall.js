import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DELETEAPPLICATION } from '../../../../middleware';
import { setIdApplication, deleteApplication } from '../../../../actions';
import './style.scss';
import trash from '../../../img/application/trash.svg';
import eye from '../../../img/application/eye.svg';
import person from '../../../img/application/person.svg';
import phone from '../../../img/application/phone.svg';
import email from '../../../img/application/email.svg';
import subtract from '../../../img/application/Subtract.svg';
import { useNavigate } from 'react-router';

const ApplicationSmall = ({ application }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.Token);
  const [modalDelete, setModalDelete] = useState(false); 
  const [deleted, setDeleted] = useState(false);

  const handleClick = (route) => {
    navigate(route);
    dispatch(deleteApplication());
    dispatch(setIdApplication(application.id));
  };

  const handleDelete = () => {
    dispatch(DELETEAPPLICATION(application.id, token));
    setModalDelete(false); 
    setDeleted(true);
  };

  const handleDeleteClick = () => {
    setModalDelete(true); 
  };

  const confirmDelete = () => {
    handleDelete();
  };

  const cancelDelete = () => {
    setModalDelete(false); 
  };
  return (
    <>
      <div className={`item pc ${deleted ? 'deleted' : ''}`}>
        <div className="number">{application.id}</div>
        <p className="date">{application.date}<br/>{application.position}</p>
        <p className="name"><img src={subtract} alt="#" />{application.quizName}</p>
        <ul>
          {application.name ? <li><img src={person} alt="#" />{application.name}</li> : null}
          {application.phone ? <li><img src={phone} alt="#" />{application.phone}</li> : null}
          {application.email ? <li><img src={email} alt="#" />{application.email}</li> : null}
        </ul>
        <button className='look' onClick={deleted ? null : () => handleClick(`/user/applications/answer/${application.id}`)}><img src={eye} alt="#" /></button>
        <button className="delete" onClick={deleted ? null : () => handleDeleteClick()}><img src={trash} alt="#" /></button> 
      </div>    
      <div className={`item mobile ${deleted ? 'deleted' : ''}`}>
        <div className="left">
          <p>№ заявки</p>
          <p>Дата</p>
          <p>Квиз</p>
          <p>Контакты</p>
        </div>
        <div className="right">
          <div className="number">{application.id}</div>
          <p className="date">1 дек. 2024 г., 13:04<br/>Россия, Тюмень</p>
          <p className="name"><img src={subtract} alt="#" />{application.quizName}</p>
          <ul>
            {application.name ? <li><img src={person} alt="#" />{application.name}</li> : null}
            {application.phone ? <li><img src={phone} alt="#" />{application.phone}</li> : null}
            {application.email ? <li><img src={email} alt="#" />{application.email}</li> : null}
          </ul>
        </div>
          <button className='look' onClick={deleted ? null : () => handleClick('/user/applications/answer')}><img src={eye} alt="#" /></button>
          <button className="delete" onClick={deleted ? null : () => handleDeleteClick()}><img src={trash} alt="#" /></button>   
      </div>
      <div id='bgPop' className={modalDelete ? 'active' : ''}></div>    
      <div id='Pop' className={modalDelete ? 'active' : ''}>
        <h1>Вы действительно хотите удалить заявку?</h1>
        <div className="btns">
          <button onClick={confirmDelete}>Да</button>
          <button onClick={cancelDelete}>Нет</button>
        </div>
      </div>
    </>

  )
}
export default ApplicationSmall;