import React from 'react';
import { useSelector } from 'react-redux';
import Notification from '../../components/lk/notification/Notification';
import LeftBar from '../../components/lk/leftBar/LeftBar';
import './style.scss';
const Notifications = () => {
  const notifications = useSelector((state) => state.notifications);

  return (
    <div className="container">
      <div className="row">
        <div className="col-xxl-3 col-xl-3 col-lg-3 col-12">
          <LeftBar />
        </div>
        <div className="col-xxl-9 col-xl-9 col-lg-9 col-12">
          <div id="notification">
              <h2>Уведомления</h2>
              <div className="count">{notifications.length}</div>
              <div className="notification_content">
                {notifications.length > 0 ? notifications.map(data => (
                  <Notification notification={data} key={data.id}/>
                )) : null}
              </div>
          </div>        
        </div>        
      </div>
    </div>
  )
}
export default Notifications;