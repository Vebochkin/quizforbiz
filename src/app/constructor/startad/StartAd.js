import React from 'react';
import LeftBar from '../../components/constructor/leftbar/LeftBar';
import './style.scss';
import direct from '../../img/Constructor/startad/yandex_direct.svg';
import business from '../../img/Constructor/startad/ya_business.svg';
import arrow from '../../img/Constructor/startad/arrow.svg';
import lock from '../../img/lock_rate.svg';

const StartAd = () => {
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-xxl-3 col-xl-3 col-lg-3 col-12'>
                <LeftBar />                
            </div> 
            <div className="col-xxl-9 col-xl-9 col-lg-9 col-12">
                <div id="startad">
                    <div>
                        <div className="direct">
                            <div className="head">
                                <img src={direct} alt="#" />
                                <h2>Для тех, кто хочет сам настраивать и контролировать рекламу</h2>                                
                            </div>
                            <div>
                                <ul>
                                    <li>Самостоятельный запуск рекламы с подсказками: редактируете объявления, определяете аудиторию</li>
                                    <li>Объявления в Поиске и на сайтах партнёров</li>
                                    <li>Вы сами планируете бюджет и решаете, как его расходовать</li>
                                </ul>
                            </div>
                            <p>Если всё-таки хочется, чтобы реклама запустилась сама, рекомендуем воспользоваться Рекламной подпиской от Яндекс Бизнеса</p>
                            <button>Проверить</button>                            
                        </div>
                        <div className="business">
                            <div className="head">
                                <img src={business} alt="#" />
                                <h2>Для тех, кто хочет, чтобы реклама работала сама</h2>                                
                            </div>
                            <div>
                                <ul>
                                    <li>Автоматический запуск рекламы</li>
                                    <li>Объявления в Картах, Поиске и на сайтах партнёров</li>
                                    <li>Алгоритмы рассчитают и предложат оптимальный бюджет и распределят его на весь период</li>
                                </ul>
                            </div>
                            <p>Подробно расскажите, чем занимается ваш бизнес, а всё остальное сделают алгоритмы.</p>
                            <button>Проверить</button>  
                        </div>
                        <div className="link pc">
                            <p>Улучшить конверсию квиза с помощью расширений<img src={arrow} alt="#" /></p>
                        </div>
                        <div className="link mobile">
                            <p>Настроить вопросы<img src={arrow} alt="#" /></p>
                        </div>
                        <div id="blurSoon">
                            <img src={lock} alt="#" />
                            <h3>Скоро здесь будет больше информации</h3>
                        </div>
                        <div id="bgBlurSoon"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>            
  )
}

export default StartAd;
