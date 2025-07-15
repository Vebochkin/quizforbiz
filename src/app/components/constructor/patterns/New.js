import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { POSTQUIZ } from '../../../../middleware';
import { setCurrentQuiz, setLk2 } from '../../../../actions';
import add from '../../../img/Constructor/patterns/add.svg'

const New = () => {
  const navigate = useNavigate();   
  const dispatch = useDispatch();
  const currentQuiz = useSelector((state) => state.createQuiz.currentQuizID);  
  const token = useSelector((state) => state.Token); 
  const names = 'newQuiz' + Math.floor(Math.random() * 100);
  const createQuizData = {
    title: 'Заголовок страницы',   
    isvideo1: false,
    isvideo2: false,              
    theme: {
      backgroundColor: '#425766',
      textColor: '#FFFFFF',
      buttonColor: '#105EFE',
      buttonTextColor: '#FFFFFF',
      font: 'Inter',
      buttonStyle: 'style1',
      theme: 'light'
    },
    canvas1: {
      title: 'Введите заголовок формы',
      subtitle: 'Дополнительный текст-описание',
      img: null,
      logo: null,
      name: 'ООО «Название компании»',
      description: 'Название или слоган компании',
      tel: '+7 (900) 000-00-00',
      button: 'Начать',
      video: null,
      mobile: null,
      mobileVideo: null,
      aling: 'canvas',
      isActive: true
    },
    canvas2: [],
    canvas3: {
      title: 'Введите заголовок формы',
      subtitle: 'Дополнительный текст-описание',
      img: null,
      name: 'Иван',
      email: 'Mail@example.com',
      phone: '+7 (900) 000-00-00',
      video: null,
      aling: 'canvas'
    }
  };

  const handleClick = () => {
    dispatch(POSTQUIZ(names, token, createQuizData)).then((data) => {
      if (data && data.id) {
        dispatch(setLk2(1));
        dispatch(setCurrentQuiz(data.id));
        navigate(`/user/quiz/${data.id}`);   
      }
    }).catch(error => {
      console.error("Error creating quiz:", error);
    });
  };

  return (
    <div className="item">
      <div><img src={add} alt="#" /></div>
      <h5>Создать квиз без шаблона</h5>
      <button onClick={() => handleClick()}>Создать с нуля</button>
    </div>
  )
}

export default New;