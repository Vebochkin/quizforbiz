import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CONVERSION } from '../../../middleware';
import { useNavigate } from 'react-router';
import LeftBar from '../../components/lk/leftBar/LeftBar';
import logo from '../../img/conversion/logo.svg';
import vk from '../../img/conversion/vk.svg';
import tg from '../../img/conversion/tg.svg';
import lock from '../../img/lock_rate.svg';
import './style.scss';

const Conversion = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const quizID = useSelector(state => state.createQuiz.currentQuizID);
    const quizName = useSelector(state => state.quizName);
    const token = useSelector((state) => state.Token);  
    const rate = useSelector((state) => state.rate); 
    const converion = useSelector(state => state.conversion);

    const handleClick = () => {
        navigate('/user/rates');
    };
    useEffect(() => {
        if (Object.keys(converion).length === 0) {
            dispatch(CONVERSION(quizID, token));
        }
    }, [dispatch, quizID, token, converion]);
  return (
    <div className="container">
        <div className="row">
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-12">
                <LeftBar />
            </div>
            <div className="col-xxl-9 col-xl-9 col-lg-9 col-12">
                <div id="conversion">
                    <div className="head">
                        <h2>Конверсия</h2>
                        <div className='count'>{quizID}</div>
                        <p className='name'>{quizName}</p>
                    </div>
                    <div className="charts">
                        <div className="chart">
                            <p>Открыли квиз</p>
                            <h5>{converion.open ? converion.open : 0}</h5>
                        </div>
                        <div className="chart">
                            <p>Получено заявок</p>
                            <h5>{converion.applications ? converion.applications : 0}</h5>
                        </div>
                        <div className="chart">
                            <p>Конверсия</p>
                            <h5>{converion.conversion ? converion.conversion.toFixed(1) : 0}%</h5>
                        </div>
                    </div>

                    {rate === 'Бесплатный' ? (
                        <>
                            <div id='blurRate'>
                                <img src={lock} alt="#" />
                                <h3>Что бы увидеть больше статистики<br/>подключите другой тариф</h3>
                                <button onClick={() => handleClick()}>Сменить тариф</button>
                            </div>    
                            <div id="bgBlurRate"></div>   
                            <div className="start">
                                <p>Стартовая страница</p>
                                <div className="progress">
                                    <div style={{ width: `${0}%` }}></div>
                                </div>
                                <h5>0</h5>
                            </div>
                            <div className="questions">
                                {converion.question && Object.entries(converion.question)
                                .slice(0, 5) 
                                .map(([key, value]) => (
                                    <div className="item" key={key}>
                                        <p>Вопрос {key / 10}</p> 
                                        <div className="progress">
                                            <div style={{ width: `${0}%` }}></div>
                                        </div>
                                        <h6>0</h6>
                                    </div>
                                ))}
                            </div>
                            <div className="questions">
                                {converion.question && Object.entries(converion.question)
                                .slice(5, 10) 
                                .map(([key, value]) => (
                                    <div className="item" key={key}>
                                        <p>Вопрос {key / 10}</p> 
                                        <div className="progress">
                                            <div style={{ width: `${0}%` }}></div>
                                        </div>
                                        <h6>0</h6>
                                    </div>
                                ))}
                            </div>
                            <div className="form">
                                <p>Форма</p>
                                <div className="progress">
                                    <div style={{ width: `${0}%` }}></div>
                                </div>
                                <h5>0</h5>
                            </div>  
                        </>

                    ) : (
                        <>
                            <div className="start">
                                <p>Стартовая страница</p>
                                <div className="progress">
                                    <div style={{ width: `${converion.start_page}%` }}></div>
                                </div>
                                <h5>{converion.start_page ? converion.start_page.toFixed(1) : 0}%</h5>
                            </div>
                       
                            <div className="questions">
                                {converion.question && Object.entries(converion.question)
                                .slice(0, 5) 
                                .map(([key, value]) => (
                                    <div className="item" key={key}>
                                        <p>Вопрос {key / 10}</p> 
                                        <div className="progress">
                                            <div style={{ width: `${value}%` }}></div>
                                        </div>
                                        <h6>{value.toFixed(1)}%</h6>
                                    </div>
                                ))}
                            </div>
                            <div className="questions">
                                {converion.question && Object.entries(converion.question)
                                .slice(5, 10) 
                                .map(([key, value]) => (
                                    <div className="item" key={key}>
                                        <p>Вопрос {key / 10}</p> 
                                        <div className="progress">
                                            <div style={{ width: `${value}%` }}></div>
                                        </div>
                                        <h6>{value.toFixed(1)}%</h6>
                                    </div>
                                ))}
                            </div>
                            <div className="form">
                                <p>Форма</p>
                                <div className="progress">
                                    <div style={{ width: `${converion.form ? converion.form : 0}%` }}></div>
                                </div>
                                <h5>{converion.form ? converion.form.toFixed(1) : 0}%</h5>
                            </div>                             
                        </>
                    )}
                    <div className="footer">
                        <img src={logo} alt="#" />
                        <p><span>Хотели бы больше заявок?</span><br/>Задайте вопрос в чате нашему маркетологу</p>
                        <div className="imgs">
                            <img src={vk} alt="#" />
                            <img src={tg} alt="#" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Conversion;