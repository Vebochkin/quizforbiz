import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCurrentQuiz, setLk2, setNameQuiz, deleteConversion, setName, setCity, setDateFrom, setDateTo, setTime, setType } from '../../../../actions';
import { DELETEQUIZ, PUTQUIZNAME, QUIZ } from '../../../../middleware';
import './style.scss';
import change from '../../../img/quizes/change.svg';
import widget from '../../../img/quizes/widget.svg';
import eye from '../../../img/quizes/eye.svg';
import convers from '../../../img/quizes/convers.svg';
import notes from '../../../img/quizes/notes.svg';
import trash from '../../../img/quizes/trash.svg';
import close from '../../../img/quizes/close.svg';
import search from '../../../img/search.svg';
import route from '../../../img/Route.svg';
import save from '../../../img/quizes/save.svg';
import copy from '../../../img/quizes/copy.svg';

const Quizes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quizes = useSelector((state) => state.quizes);
  const token = useSelector((state) => state.Token);
  const [selectedQuizzes, setSelectedQuizzes] = useState({});
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [deletedQuizzes, setDeletedQuizzes] = useState({});
  const [inputValues, setInputValues] = useState({});
  const [updatedQuizzes, setUpdatedQuizzes] = useState({}); 
  const [searchs, setSearch] = useState('Поиск по названию...');
  const [filteredQuizzes, setFilteredQuizzes] = useState(quizes); 
  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState(null);

  const handleModal = () => {
    setModal(!modal);
  }
  const handleClick = (route, quiz) => {
    navigate(route);
    dispatch(deleteConversion());
    dispatch(setNameQuiz(quiz.name))
    dispatch(setCurrentQuiz(quiz.id));
    dispatch(setLk2(1));
  };
  const handlePrevievQuiz = (route, quiz) => {
    dispatch(deleteConversion());
    dispatch(setNameQuiz(quiz.name))
    dispatch(setCurrentQuiz(quiz.id));
    dispatch(setLk2(1));
    dispatch(QUIZ(quiz.id, token)).then(() => {
      navigate(route)
    });
  };

  const handleCheckboxChange = (id) => {
      setSelectedQuizzes(prevState => {
          const newState = { ...prevState, [id]: !prevState[id] };
          return newState;
      });
  };

  const handleClose = (id) => {
      setSelectedQuiz(prevState => ({ ...prevState, [id]: !prevState[id] }));
  };

  const handleInputChange = (id, value) => {
      setInputValues(prevState => ({ ...prevState, [id]: value }));
  };

  const handleChangeButtonClick = (id) => {
      setSelectedQuiz(prevState => ({ ...prevState, [id]: !prevState[id] }));
  };

  const handleDelete = (id) => {
      setDeletedQuizzes(prevState => ({ ...prevState, [id]: !prevState[id] }));
      dispatch(DELETEQUIZ(id, token));
  };

  const handlePut = (id) => {
      setSelectedQuizzes(prevState => ({ ...prevState, [id]: false }));
      const newQuizName = inputValues[id] || ''; // Получаем название из input
      dispatch(PUTQUIZNAME(id, newQuizName, token)); // Передаем название
      setUpdatedQuizzes(prevState => ({ ...prevState, [id]: newQuizName })); 
      handleClose(id);
  };
  const handleSearchBlur = (e) => {
    setSearch(e.target.innerText); 
  };

  const handleSearchFocus = (e) => {
      if (e.target.innerText === 'Поиск по названию...') {
        setSearch('');
      }
  };
  const handleSearch = () => {
    if (searchs === 'Поиск по названию...') {
      setFilteredQuizzes(quizes); // Показываем все квизы
    } else {
      const normalizedSearch = searchs.replace(/\s+/g, '').toLowerCase(); // Удаляем пробелы
      const filtered = quizes.filter(quiz => 
          quiz.name.replace(/\s+/g, '').toLowerCase().includes(normalizedSearch)
      );
      setFilteredQuizzes(filtered);
    }
  };
  const handleDeleteClick = (id) => {
    setQuizToDelete(id); 
    setModalDelete(true); 
  };

  const confirmDelete = () => {
      if (quizToDelete) {
          dispatch(DELETEQUIZ(quizToDelete, token)); 
          setDeletedQuizzes(prevState => ({ ...prevState, [quizToDelete]: true })); 
          setQuizToDelete(null); 
      }
      setModalDelete(false); 
  };

  const cancelDelete = () => {
      setQuizToDelete(null);
      setModalDelete(false); 
  };

  const handleApplication = (route, city) => {
    dispatch(setTime(null));
    dispatch(setCity(null));
    dispatch(setDateFrom(null));
    dispatch(setDateTo(null));
    dispatch(setType(null));
    dispatch(setName(city));    
    navigate(route);
  };

  useEffect(() => {
    handleSearch();
  }, [quizes]);

  const countSelectedQuizzes = () => {
    return Object.values(selectedQuizzes).filter(value => value).length;
  };
  return (
    <div id="Quizes">
      <div className="head">
          <h2>Созданные квизы</h2>
          <div><p contentEditable="true" onBlur={handleSearchBlur} onFocus={handleSearchFocus} suppressContentEditableWarning={true}>{searchs}</p><img src={search} alt="#" onClick={handleSearch} /></div>
          <button onClick={() => handleModal()}><img src={route} alt="#" />Выдать доступ другому пользователю</button>  
          <div id='give_accsess' className={modal ? 'active' : ''}>
            <h3>Выдать доступ</h3>
            <div><p>Выбрано элементов ({countSelectedQuizzes()})</p></div>
            <p>Доступ по ссылке<br/><span>https://qz.pro.me/6741ca6e3719050026164765</span></p>            
            <button>Копировать<img src={copy} alt="#" /></button>
            <p>Доступ по почте</p>
            <input type="text" placeholder='email@gmail.com'/>
            <button>Отправить</button>
          </div>           

      </div>
      <div className="scrollbar">
        <div className="content">
          {filteredQuizzes.length > 0 ? filteredQuizzes.map(quiz => (
            <div className={`quiz_small ${selectedQuizzes[quiz.id] ? 'active' : ''} ${deletedQuizzes[quiz.id] ? 'delete' : ''}`} key={quiz.id}>
              <div className={`quiz_small_head ${selectedQuiz[quiz.id] ? 'active' : ''}`}>
                <p>{quiz.id}</p>
                <h5>{deletedQuizzes[quiz.id] ? quiz.name : (updatedQuizzes[quiz.id] || quiz.name)}</h5> 
                <input 
                  type="text" 
                  placeholder='Написание нового названия...'
                  value={inputValues[quiz.id] || ''} 
                  onChange={deletedQuizzes[quiz.id] ? null : (e) => handleInputChange(quiz.id, e.target.value)} 
                />
                <button>
                  <img src={change} alt="#" onClick={deletedQuizzes[quiz.id] ? null : () => handleChangeButtonClick(quiz.id)}/>
                  <img src={save} alt="#" onClick={() => handlePut(quiz.id)}/>
                </button>
                <button>
                  <img src={close} alt="#" onClick={() => handleClose(quiz.id)}/>
                </button>
              </div>
              <div className="quiz_small_btns">
                <button onClick={() => handleApplication('/user/applications', quiz.name)}><img src={notes} alt="#" />Заявки<div className="count">{quiz.apps}</div></button>
                <button onClick={deletedQuizzes[quiz.id] ? null : () => handleClick(`/user/quiz/${quiz.id}/conversion`, quiz)}><img src={convers} alt="#"/>Конверсия</button>
                <button onClick={deletedQuizzes[quiz.id] ? null : () => handleClick(`/user/quiz/${quiz.id}`, quiz)}><img src={widget} alt="#" />Редактировать</button>
                <button 
                  onClick={deletedQuizzes[quiz.id] ? null : () => {
                    const isMobile = window.innerWidth <= 576; // Проверка ширины экрана
                    const previewUrl = isMobile ? `/user/quiz/${quiz.id}/previev/mob` : `/user/quiz/${quiz.id}/previev/pc`;
                    handlePrevievQuiz(previewUrl, quiz);
                  }}
                >
                  <img src={eye} alt="#" />Предпросмотр
                </button>

              </div>
              <input 
                type="checkbox" 
                className='check' 
                checked={selectedQuizzes[quiz.id]}
                onChange={deletedQuizzes[quiz.id] ? null : () => handleCheckboxChange(quiz.id)} 
              />        
              <button className="delete" onClick={deletedQuizzes[quiz.id] ? null : () => handleDeleteClick(quiz.id)}><img src={trash} alt="#" /></button>
            </div>          
          )) : null}    
          <div id='bgPop' className={modalDelete ? 'active' : ''}></div>    
          <div id='Pop' className={modalDelete ? 'active' : ''}>
            <h1>Вы действительно хотите удалить квиз?</h1>
            <button onClick={() => cancelDelete()}></button>
            <div className="btns">
              <button onClick={() => confirmDelete()}>Да</button>
              <button onClick={() => cancelDelete()}>Нет</button>
            </div>
          </div>                    
        </div>  
      </div>
    </div>
  )
}

export default Quizes;
