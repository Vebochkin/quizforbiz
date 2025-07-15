import React from 'react';
import LeftBar from '../../components/lk/leftBar/LeftBar';
import check from '../../img/base/check.svg';
import cursor from '../../img/base/cursor.svg';
import integrations from '../../img/base/integrations.svg';
import folder from '../../img/base/folder.svg';
import services from '../../img/base/services.svg';
import adverts from '../../img/base/at.svg';
import pip from '../../img/base/pip.svg';
import './style.scss';
import { BASE } from '../../../middleware';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Base = () => {
    const navigate = useNavigate();   
    const dispatch = useDispatch();
    const token = useSelector((state) => state.Token);
    const base = useSelector((state) => state.base);
    const handleClick = (route, id) => {
        dispatch(BASE(token, id));
      navigate(route);
    };
  return (
    <div className="container">
        <div className="row">
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-12">
                <LeftBar />
            </div>
            <div className="col-xxl-9 col-xl-9 col-lg-9 col-12">
                <div id="base">
                    <h2>База знаний</h2>
                    <div className="content">
                        <div className="item" onClick={() => handleClick('/user/base/payment', 1)}>
                            <img src={check} alt="#" />
                            <h5>Оплата</h5>
                            <p>{base.payment} статей</p>
                        </div>
                        <div className="item" onClick={() => handleClick('/user/base/content', 7)}>
                            <img src={pip} alt="#" />
                            <h5>Наполнение квиза</h5>
                            <p>{base.content} статей</p>
                        </div>
                        <div className="item" onClick={() => handleClick('/user/base/settings', 2)}>
                            <img src={folder} alt="#" />
                            <h5>Настройка квиза</h5>
                            <p>{base.settings} статей</p>
                        </div>
                        <div className="item" onClick={() => handleClick('/user/base/integrations/sites', 3)}>
                            <img src={integrations} alt="#" />
                            <h5>Интеграция с сайтом</h5>
                            <p>{base.integSite} статей</p>
                        </div>
                        <div className="item" onClick={() => handleClick('/user/base/integrations/servises', 4)}>
                            <img src={services} alt="#" />
                            <h5>Интеграция с сервисами</h5>
                            <p>{base.integServises} статей</p>
                        </div>
                        <div className="item" onClick={() => handleClick('/user/base/analytics', 5)}>
                            <img src={cursor} alt="#" />
                            <h5>Аналитика</h5>
                            <p>{base.analytics} статей</p>
                        </div>
                        <div className="item" onClick={() => handleClick('/user/base/advert', 6)}>
                            <img src={adverts} alt="#" />
                            <h5>Реклама</h5>
                            <p>{base.advert} статей</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Base;