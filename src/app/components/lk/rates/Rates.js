import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import './style.scss';
import left from '../../../img/rates/left.svg';
import right from '../../../img/rates/right.svg';

const Rate = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + 3) % 3);
    };

    const handlers = useSwipeable({
        onSwipedLeft: nextSlide,
        onSwipedRight: prevSlide,
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });
    return (
      <>
        <div id="Rate">
          <h2>Тарифы</h2>
          <div className="items">
            <div className="item">
              <div className="name">Бесплатный</div>
              <h4>Тестирование сервиса<br/>для новых пользователей</h4>
              <div className="bg_limit"></div>
              <div className="limit">
                <p>Лимит заявок</p>
                <p>10</p>
              </div>                
              <h3>Базовые расширения</h3>
              <h3>Базовая аналитика</h3>
              <div className="description">
                <p>Ограничения:</p>
                <p>Логотип «Quiz for biz» на квизах</p>
                <p>Использование домена «Quiz for biz»</p>
                <p>Нет доступа к расширенной аналитике</p>
                <p>Нет экспорта заявок в CSV</p>
                <p>Нет возможности использовать White Label</p>
                <p>Нет кастомного домена</p>
                <p>Нет загрузки видео</p>
                <p>Нет вставки кода в квиз</p>
                <p>Нет защиты от дублей и чёрного списка</p>
                <p>Нет приглашений в проект</p>
              </div>
              <div className="description_price">
                  <h5>Стоимость:</h5>
                  <p><span>0 ₽.</span></p>
              </div>
              <button>Подключить</button>
            </div>
            <div className="item">
              <div className="name">Оптимальный<span>HOT</span></div>
              <h4>Подходит для малого бизнеса<br/>с небольшими объёмами заявок</h4>
              <div className="bg_limit"></div>
              <div className="limit">
                  <p>Лимит заявок</p>
                  <p>до 150</p>
              </div>                
              <h3>Все функции бесплатного тарифа</h3>
              <h3>Расширенная аналитика</h3>
              <h3>Экспорт заявок в CSV</h3>
              <div className="description">
                <p>Ограничения:</p>
                <p>Логотип «Quiz for biz» на квизах</p>
                <p>Использование домена «Quiz for biz»</p>
                <p>Нет возможности использовать White Label</p>
                <p>Нет кастомного домена</p>
                <p>Нет загрузки видео</p>
                <p>Нет вставки кода в квиз</p>
                <p>Нет защиты от дублей и чёрного списка</p>
                <p>Нет приглашений в проект</p>
              </div>
              <div className="description_price">
                  <h5>Стоимость:</h5>
                  <p><span>15 ₽/лид до 150 заявок</span><br/>20 ₽/лид при превышении лимита</p>
              </div>
              <button>Подключить</button>
            </div>
            <div className="item">
              <div className="name">Премиум</div>
              <h4>Для профессионального использования<br/>и больших объёмов заявок</h4>
              <div className="bg_limit"></div>
              <div className="limit">
                  <p>Лимит заявок</p>
                  <p>от 150</p>
              </div>                
              <h3>Все функции тарифа «Оптимальный»</h3>
              <div className="description">
                <p>Дополнительно:</p>
                <p>White Label (убрать логотип)</p>
                <p>Кастомный домен</p>
                <p>Загрузка видео</p>
                <p>Вставка кода в квиз</p>
                <p>Безлимитные квизы</p>
                <p>Приглашения в проект</p>
                <p>Защита от дублей, чёрный список</p>
              </div>
              <div className="description_price">
                  <h5>Стоимость:</h5>
                  <p><span>150–300 заявок: 10 ₽/лид</span><br/>301–500 заявок: 8,5 ₽/лид<br/>501–1 000 заявок: 7 ₽/лид<br/>1 001+ заявок: 5 ₽/лид</p>
              </div>
              <button>Подключить</button>       
            </div>
          </div>
        </div>      
        <div id="RateMobile" {...handlers}>
            <h2>Тарифы</h2>
            <div className="items">
                {currentIndex === 0 && (
                  <div className="item item-1 active">
                    <div className="name">Бесплатный</div>
                    <h4>Тестирование сервиса<br/>для новых пользователей</h4>
                    <div className="bg_limit"></div>
                    <div className="limit">
                      <p>Лимит заявок</p>
                      <p>10</p>
                    </div>                
                    <h3>Базовые расширения</h3>
                    <h3>Базовая аналитика</h3>
                    <div className="description">
                      <p>Ограничения:</p>
                      <p>Логотип «Quiz for biz» на квизах</p>
                      <p>Использование домена «Quiz for biz»</p>
                      <p>Нет доступа к расширенной аналитике</p>
                      <p>Нет экспорта заявок в CSV</p>
                      <p>Нет возможности использовать White Label</p>
                      <p>Нет кастомного домена</p>
                      <p>Нет загрузки видео</p>
                      <p>Нет вставки кода в квиз</p>
                      <p>Нет защиты от дублей и чёрного списка</p>
                      <p>Нет приглашений в проект</p>
                    </div>
                    <div className="description_price">
                        <h5>Стоимость:</h5>
                        <p><span>0 ₽.</span></p>
                    </div>
                    <button>Подключить</button>
                  </div>
                )}
                {currentIndex === 1 && (
                  <div className="item item-2 active">
                    <div className="name">Оптимальный<span>HOT</span></div>
                    <h4>Подходит для малого бизнеса<br/>с небольшими объёмами заявок</h4>
                    <div className="bg_limit"></div>
                    <div className="limit">
                        <p>Лимит заявок</p>
                        <p>до 150</p>
                    </div>                
                    <h3>Все функции бесплатного тарифа</h3>
                    <h3>Расширенная аналитика</h3>
                    <h3>Экспорт заявок в CSV</h3>
                    <div className="description">
                      <p>Ограничения:</p>
                      <p>Логотип «Quiz for biz» на квизах</p>
                      <p>Использование домена «Quiz for biz»</p>
                      <p>Нет возможности использовать White Label</p>
                      <p>Нет кастомного домена</p>
                      <p>Нет загрузки видео</p>
                      <p>Нет вставки кода в квиз</p>
                      <p>Нет защиты от дублей и чёрного списка</p>
                      <p>Нет приглашений в проект</p>
                    </div>
                    <div className="description_price">
                        <h5>Стоимость:</h5>
                        <p><span>15 ₽/лид до 150 заявок</span><br/>20 ₽/лид при превышении лимита</p>
                    </div>
                    <button>Подключить</button>
                  </div>
                )}
                {currentIndex === 2 && (
                  <div className="item item-3 active">
                    <div className="name">Премиум</div>
                    <h4>Для профессионального использования<br/>и больших объёмов заявок</h4>
                    <div className="bg_limit"></div>
                    <div className="limit">
                        <p>Лимит заявок</p>
                        <p>от 150</p>
                    </div>                
                    <h3>Все функции тарифа «Оптимальный»</h3>
                    <div className="description">
                      <p>Дополнительно:</p>
                      <p>White Label (убрать логотип)</p>
                      <p>Кастомный домен</p>
                      <p>Загрузка видео</p>
                      <p>Вставка кода в квиз</p>
                      <p>Безлимитные квизы</p>
                      <p>Приглашения в проект</p>
                      <p>Защита от дублей, чёрный список</p>
                    </div>
                    <div className="description_price">
                        <h5>Стоимость:</h5>
                        <p><span>150–300 заявок: 10 ₽/лид</span><br/>301–500 заявок: 8,5 ₽/лид<br/>501–1 000 заявок: 7 ₽/лид<br/>1 001+ заявок: 5 ₽/лид</p>
                    </div>
                    <button>Подключить</button>       
                  </div>
                )}
                <button className="next" onClick={nextSlide}><img src={right} alt="Next" /></button>
                <button className="back" onClick={prevSlide}><img src={left} alt="Back" /></button>
                <div className="progress">
                    <div className={currentIndex === 0 ? 'active' : ''}></div>
                    <div className={currentIndex === 1 ? 'active' : ''}></div>
                    <div className={currentIndex === 2 ? 'active' : ''}></div>
                </div>
            </div>
        </div>
      </>

      )
}
export default Rate;