import React, { useEffect } from 'react';
import './style.scss';
import LeftBar from '../components/lk/leftBar/LeftBar';
import New from '../components/constructor/patterns/New';
import Shop from '../components/constructor/patterns/Shop';
import Opros from '../components/constructor/patterns/Opros';
import Calculator from '../components/constructor/patterns/Calculator';
import Soon from '../components/constructor/patterns/Soon';
import Pattern from '../components/constructor/patterns/Pattern';
import logo from '../img/conversion/logo.svg';
import vk from '../img/conversion/vk.svg';
import tg from '../img/conversion/tg.svg';

const CreateQuiz = () => {
  return (
    <div className="container">
        <div className="row">
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-12">
                <LeftBar />
            </div>
            <div className="col-xxl-9 col-xl-9 col-lg-9 col-12">
                <div id="create_quiz">
                    <h2>Создать квиз</h2>
                    <div className="search">Поиск по шаблонам</div>
                    <div className="scrollbar">
                        <div className="patterns">
                            <div className="new_patterns">
                                <New />
                                <Shop />
                                <Opros />
                                <Calculator />
                                <Soon />
                                <Soon />
                            </div>
                            <div className="ready_patterns">
                                <h2>Готовые шаблоны по нишам</h2>
                                <div className="items">
                                    <Pattern />
                                    <Pattern />
                                    <Pattern />
                                    <Pattern />
                                    <Pattern />
                                    <Pattern />
                                    <Pattern />
                                    <Pattern />
                                    <Pattern />
                                    <Pattern />
                                    <Pattern />
                                </div>
                            </div>
                            <div className="footer">
                                <img src={logo} alt="#" />
                                <p><span>Сложности с выбором?</span><br/>Задайте вопрос в чате нашему маркетологу</p>
                                <div className="imgs">
                                    <img src={vk} alt="#" />
                                    <img src={tg} alt="#" />
                                </div>
                            </div>
                        </div>                          
                    </div>
                      
                </div>
            </div>
        </div>
    </div>
  )
}

export default CreateQuiz;