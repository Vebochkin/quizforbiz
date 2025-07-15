import React, { useState } from 'react';
import './style.scss';
import LeftBar from '../../components/constructor/leftbar/LeftBar';
import bitrix from '../../img/Constructor/integ/bitrix.svg';
import amo from '../../img/Constructor/integ/amo.svg';
import email from '../../img/Constructor/integ/email.svg';
import tg from '../../img/Constructor/integ/tg.svg';
import info from '../../img/Constructor/integ/info.svg';

const Integrations = () => {
    const [indexButton, changeIndex] = useState(0);
  return (
    <div className="container">
        <div className="row">
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-12">
                <LeftBar />
            </div>
            <div className="col-xxl-9 col-xl-9 col-lg-9 col-12">
                <div id="integ">
                    <h2>Интеграции</h2>
                    <div className={`email ${indexButton === 1 ? 'active' : ''}`}>
                        <button onClick={() => changeIndex(1)}></button>
                        <p>Интеграция с Email<img src={email} alt="#" /></p>
                        <div className="info">
                            <p>Отправлять уведомления о новых заявках на</p>
                            <input type="text" placeholder='rukava55@gmail.com'/>
                            <button>Готово</button>
                            <div>Тема письма<input type="text" placeholder='Заявки из Quiz for biz'/></div>
                        </div>
                    </div>                 
                    <div className={`amo ${indexButton === 2 ? 'active' : ''}`}>
                        <button></button>
                        <p>Интеграция с AmoCRM<img src={amo} alt="#" /></p>
                        <div className="info">
                            <button className='top'><img src={info} alt="#" />Инструкция</button>
                            <div className="btns">
                                <p><button className='active'></button>AmoCRM</p>
                                <p><button></button>Kommo</p>                                
                            </div>
                            <button>Установить интеграцию</button>
                            <div>
                                <img src={info} alt="#" />
                                <p>Нажмите «Опубликовать» после редактирования настроек</p>
                            </div>
                        </div>
                    </div>                       
                    <div className={`bitrix ${indexButton === 3 ? 'active' : ''}`}>
                        <button></button>
                        <p>Интеграция с Bitrix<img src={bitrix} alt="#" /></p>
                        <div className="info">
                            <div>Домен<input type="text" placeholder='on'/></div>
                            <div>Код авторизации<input type="text" /></div>
                            <div>ID пользователя<input type="text" /></div>
                            <div>Заголовок лида<input type="text" placeholder='Заявки из Quiz for biz'/></div>
                        </div>
                    </div>
                    <div className={`tg ${indexButton === 4 ? 'active' : ''}`}>
                        <button onClick={() => changeIndex(4)}></button>
                        <p>Интеграция с Telegram<img src={tg} alt="#" /></p>
                        <div className="info">
                            <button className="top"><img src={info} alt="#" />Инструкция</button>
                            <p>1. Нажмите кнопку «Авторизовать». Телеграм должен быть открыт на устройстве.</p>
                            <p>2. Нажмите в чате Телеграма «Запустить». </p>
                            <p>3. После привязки придёт сообщение от бота, что квиз подключен.</p>
                            <p>4. Перейдите в панель Марквиз и обновите страницу браузера, затем нажмите «Опубликовать».</p>
                            <p>5. После подключения здесь появится название чата.</p>
                            <div className="btns">
                                <p><button className='active'></button>Telegram Desktop</p>
                                <p><button></button>Telegram Web</p>                                
                            </div>
                            <div className="btns2">
                                <button>Авторизоваться в чате</button>
                                <button>Авторизоваться в группе</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Integrations;