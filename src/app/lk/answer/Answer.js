import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { APPLICATION } from '../../../middleware';
import { DELETEAPPLICATION } from '../../../middleware';
import { useNavigate } from 'react-router';
import './style.scss';
import LeftBar from '../../components/lk/leftBar/LeftBar';
import trash from '../../img/answer/trash.svg';
import again from '../../img/answer/again.svg';

const Answer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.Token);  
    const applicaion = useSelector((state) => state.application);
    const handleDelete = () => {
        navigate('/user/applications');
        dispatch(DELETEAPPLICATION(applicaion.id, token));
    };
    useEffect(() => {
        if (Object.keys(applicaion.data).length === 0) {
            dispatch(APPLICATION(token, applicaion.id));
        }
    }, [dispatch, applicaion.id, token, applicaion]);
  return (
    <div className="container">
        <div className="row">
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-12">
                <LeftBar />
            </div>
            <div className="col-xxl-9 col-xl-9 col-lg-9 col-12">
                <div id="answer">
                    <div className="answers">
                        <h2>Ответы клиента</h2>
                        {/* <button></button> */}
                        <div className="info">
                            <p>Время заявки: <span>{applicaion.data.date ? applicaion.data.date : 'none'}</span><br/>Местоположение: <span>{applicaion.data.position ? applicaion.data.position : 'none'}</span></p>
                            <p>Имя: <span>{applicaion.data.name ? applicaion.data.name : 'none'}</span><br/>Email: <span>{applicaion.data.email ? applicaion.data.email : 'none'}</span><br/>Телефон: <span>{applicaion.data.phone ? applicaion.data.phone : 'none'}</span></p>
                        </div>
                        <div className="answer">
                            <h2>Ответы</h2>
                            <div>
                                {applicaion.data.details && applicaion.data.details.answers ? (
                                    applicaion.data.details.answers.map((item, index) => (
                                        <p key={item.question + index}> {/* Используем уникальное значение для ключа */}
                                            {item.question}
                                            {item.answer.map((answ, answIndex) => (
                                                <span key={answIndex}> {/* Уникальный ключ для каждого ответа */}
                                                    <br />
                                                    {answ}
                                                </span>
                                            ))}
                                        </p>
                                    ))
                                ) : (
                                    <p>Нет ответов</p>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* <div className="results">
                        <h2>Результаты:</h2>
                        <div>Результатов нет</div>
                    </div> */}
                    <div className="someInfo">
                        <h2>Дополнительная информация:</h2>
                        <div>Источник<div>{applicaion.data.details && applicaion.data.details.url ? applicaion.data.details.url : 'none'}</div></div>
                        <div>IP-адрес<div>{applicaion.data.details && applicaion.data.details.ip ? applicaion.data.details.ip : 'none'}</div></div>
                        {/* <p>Cookies</p>
                        <div>_ga<div>GA1.2.1183204216.1733047398</div></div>
                        <div>fingerprint<div>3ccb40b1bdf329e9944c335cf9831bf9</div></div> */}
                    </div>                    
                    <div className="footer">
                        <div className="id_answer">ID заявки:<div>{applicaion.id}</div></div>
                        {/* <div className="actions">
                            <p><img src={trash} alt="#" />Удалить</p>
                            <p><img src={again} alt="#" />Отправить повторно в интеграции</p>                                  
                        </div> */}
                        <button onClick={() => handleDelete()}>Удалить</button>
                    </div>                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default Answer;