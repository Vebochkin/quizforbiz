import React from 'react';
import './style.scss';
import LeftBar from '../../components/lk/leftBar/LeftBar';
import copy from '../../img/referal/copy.svg';
import item1 from '../../img/referal/item1.svg';
import item2 from '../../img/referal/item2.svg';
import item3 from '../../img/referal/item3.svg';

const Referal = () => {
  return (
    <div className="container">
        <div className="row">
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-12">
                <LeftBar />
            </div>
            <div className="col-xxl-9 col-xl-9 col-lg-9 col-12">
                <div id="referal">
                    <h2>Партнёрская бонусная программа</h2>
                    <div className="body">
                        <div className="recommend">
                            <p><span>Рекомендуйте «Quiz for biz» друзьям, коллегам<br/>или партнёрам.</span><br/><br/>И получайте бонусы на свой счёт, а также реальные<br/>деньги на карту!</p>
                        </div>
                        <div className="first">
                            <div className="number">1</div>
                            <p>Пригласите новых пользователей<br/>с помощью вашей уникальной ссылки:</p>
                            <div>q.pro/referal/#id324235<button>Копировать<img src={copy} alt="#" /></button></div>
                        </div>
                        <div className="second">
                            <div className="number">2</div>
                            <p>Когда приглашённые пользователи оплатят заявки, <span>вы получите <b>10%</b></span> от их первого платежа в виде бонусов на счёт</p>
                        </div>
                        <div className="third">
                            <div className="number">3</div>
                            <p>Пригласите 5 активных клиентов (оплативших от 300 заявок или 3 000 ₽) и <span>начните получать 15%</span> кэшбека на карту.</p>
                        </div>
                        <div className="items">
                            <div className="item">
                                <img src={item1} alt="#" />
                                <p>Бонусы можно использовать<br/>для оплаты заявок</p>
                            </div>
                            <div className="item">
                                <img src={item2} alt="#" />
                                <p>Реальные деньги<br/>за активных клиентов</p>
                            </div>
                            <div className="item">
                                <img src={item3} alt="#" />
                                <p>Простая и прозрачная<br/>система</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Referal;