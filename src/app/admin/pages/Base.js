import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { COUNTBASE, BASEADMIN } from '../../../middleware';
import { setBaseName, setBaseAdmin } from '../../../actions';
import Logout from './logout/Logout';
import LeftBar from './leftBar/LeftBar';
import check from '../../img/base/check.svg';
import cursor from '../../img/base/cursor.svg';
import integrations from '../../img/base/integrations.svg';
import folder from '../../img/base/folder.svg';
import services from '../../img/base/services.svg';
import adverts from '../../img/base/at.svg';
import pip from '../../img/base/pip.svg';


const BaseAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.Token);
  const base = useSelector((state) => state.base);
  useEffect(() => {
    dispatch(COUNTBASE(token));
    dispatch(setBaseAdmin({}))
  }, []);
  const handleArticles = (route, id, name) => {
    dispatch(BASEADMIN(token, id));
    dispatch(setBaseName(name))
    navigate(route);
  };
  return (
    <div className='container-fluid'>
      <div className="row admin">
        <LeftBar />       
        <div className="col-xxl-10" id='Base'>
            <h1>Добавить статью</h1>
            <Logout />
            <div>
                <div className='items'> 
                    <div>
                        <div className="item" onClick={() => handleArticles("/admin/article/1", 1, 'Оплата')}>
                            <img src={check} alt="#" />
                            <h3>Оплата</h3>
                            <p>{base.payment} статей</p>
                        </div>
                        <div className="item" onClick={() => handleArticles("/admin/article/7", 7, 'Наполнение квиза')}>
                            <img src={pip} alt="#" />
                            <h3>Наполнение квиза</h3>
                            <p>{base.content} статей</p>
                        </div>
                        <div className="item" onClick={() => handleArticles("/admin/article/2", 2, 'Настройка квиза')}>
                            <img src={folder} alt="#" />
                            <h3>Настройка квиза</h3>
                            <p>{base.settings} статей</p>
                        </div>
                        <div className="item" onClick={() => handleArticles("/admin/article/3", 3, 'Интеграция с сайтом')}>
                            <img src={integrations} alt="#" />
                            <h3>Интеграция с сайтом</h3>
                            <p>{base.integSite} статей</p>
                        </div>
                        <div className="item" onClick={() => handleArticles("/admin/article/4", 4, 'Интеграция с сервисами')}>
                            <img src={services} alt="#" />
                            <h3>Интеграция с сервисами</h3>
                            <p>{base.integServises} статей</p>
                        </div>
                        <div className="item" onClick={() => handleArticles("/admin/article/5", 5, 'Аналитика')}>
                            <img src={cursor} alt="#" />
                            <h3>Аналитика</h3>
                            <p>{base.analytics} статей</p>
                        </div>
                        <div className="item" onClick={() => handleArticles("/admin/article/6", 6, 'Реклама')}>
                            <img src={adverts} alt="#" />
                            <h3>Реклама</h3>
                            <p>{base.advert} статей</p>
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default BaseAdmin;