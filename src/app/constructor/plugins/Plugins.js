import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { buttonClick, setLk2 } from '../../../actions.js';
import LeftBar from '../../components/constructor/leftbar/LeftBar';
import './style.scss';

const Plugins = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { createQuiz } = useSelector((state) => state);
  const currentQuizID = useSelector((state) => state.createQuiz.currentQuizID);
  const handleButton = (index) => {
    dispatch(buttonClick(index));
    dispatch(setLk2(1));
    navigate(`/user/quiz/${currentQuizID}`);
  };
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-xxl-3 col-xl-3 col-lg-3 col-12'>
              <LeftBar />                
            </div> 
            <div className="col-xxl-9 col-xl-9 col-lg-9 col-12">
              <div id="plugins">
                <div className="btns">
                  <button className={createQuiz.currentSection === 0 ? 'activ' : ''} onClick={() => handleButton(0)}>Стартовая страница</button>
                  <button className={createQuiz.currentSection === 1 ? 'activ' : ''} onClick={() => handleButton(1)}>Вопросы</button>
                  <button className={createQuiz.currentSection === 2 ? 'activ' : ''} onClick={() => handleButton(2)}>Форма контактов</button>
                </div>
                <div className="items">
                  <div className="item">
                    <h5>Приём оплат</h5>
                    <p>Настройте один или несколько<br/>способов оплаты, чтобы посетитель<br/>выбрал наиболее удобный для себя.</p>
                    <button>Настроить</button>
                  </div>
                  <div className="soon">Скоро</div>
                  <div className="soon">Скоро</div>
                  <div className="soon">Скоро</div>
                  <div className="soon">Скоро</div>
                </div>
              </div>
            </div>
        </div>

    </div>            
  )
}

export default Plugins;
