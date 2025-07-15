import React from 'react';
import Logo from '../../../img/leftbar/logo.svg';
import './style.scss';

const Notification = ({notification}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); 
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };
  return (
    <div className="notification">
      <h4><img src={Logo} alt="#" />{notification.title}</h4>
      <p>{notification.message}</p>
      <p className="date">{formatDate(notification.created_at)}</p>
    </div>
  )
}
export default Notification;