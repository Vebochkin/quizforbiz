import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incremenCountQuestion, changeQuestion, updateQuestion, removeQuestion } from '../../../../../actions';
import './style.scss';
import trash2 from '../../../../img/Constructor/create/trash2.svg';
import move from '../../../../img/Constructor/create/move.svg';
import answer2 from '../../../../img/Constructor/create/answer2.svg';
import plus from '../../../../img/Constructor/create/plus.svg';
import close from '../../../../img/Constructor/create/close.svg';
import img from '../../../../img/Constructor/create/img.svg';

const AnswersImg = () => {
    const dispatch = useDispatch();
    const index = useSelector((state) => state.createQuiz.currentQuestionIndex);
    const count = useSelector((state) => state.createQuiz.countQuestions);
    const canvas2 = useSelector((state) => state.createQuiz.data.canvas2);
    
    const [data, setData] = useState({
        name: 'AnswersImg',
        question: 'Впишите заголовок вопроса',
        answers: [],
        imgs: []
    });
    
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        if (canvas2[index]) {
            const currentQuestionData = canvas2[index];
            setData(currentQuestionData);
            setAnswers(currentQuestionData.answers.map((text, idx) => ({
                id: idx + 1,
                text,
                image: currentQuestionData.imgs && currentQuestionData.imgs[idx] ? currentQuestionData.imgs[idx] : null // Проверяем наличие изображения
            })));
        } else {
            setData({
                name: 'AnswersImg',
                question: 'Впишите заголовок вопроса',
                answers: [],
                imgs: []
            });
            setAnswers([{
                id: 1,
                text: 'Добавьте ответ',
                image: null
            }]);
        }
    }, [canvas2, index]);

    const addAnswer = () => {
        if (answers.length < 5) {
            setAnswers([...answers, {
                id: Date.now(),
                text: 'Добавьте ответ',
                image: null // Изначально изображение пустое
            }]);
        }
    };

    const deleteAnswer = (id) => {
        setAnswers(answers.filter((answer) => answer.id !== id));
    };

    const handleIncrement = () => {
        const newQuestionData = {
            ...data,
            answers: answers.map(answer => answer.text),
            imgs: answers.map(answer => answer.image) // Сохраняем изображения
        };
    
        dispatch(updateQuestion({ index, newQuestionData }));
        dispatch(incremenCountQuestion());
    };

    const handleInputChange = (field) => (e) => {
        const value = e.target.value;
        if (value === '') {
            e.target.innerText = "Впишите заголовок вопроса";
            setData({ ...data, question: "Впишите заголовок вопроса" });
        } else {
            setData({ ...data, [field]: value });
        }
        const newQuestionData = {
            ...data,
            answers: answers.map(answer => answer.text)
        };
        dispatch(updateQuestion({ index, newQuestionData }));
    };

    const handleAnswerChange = (e, idx) => {
        const newAnswersData = [...answers];
        newAnswersData[idx].text = e.target.textContent;
        setAnswers(newAnswersData);
    
        const newQuestionData = {
            ...data,
            answers: newAnswersData.map(answer => answer.text),
            imgs: newAnswersData.map(answer => answer.image)
        };
        dispatch(updateQuestion({ index, newQuestionData }));
    };

    const handlePreviousQuestion = () => {
        if (index > 0) {
            const newQuestionData = {
                ...data,
                answers: answers.map(answer => answer.text),
                imgs: answers.map(answer => answer.image)
            };
            dispatch(updateQuestion({ index, newQuestionData }));
            dispatch(changeQuestion(-1));
        }
    };

    const handleNextQuestion = () => {
        if (index < canvas2.length - 1) {
            const newQuestionData = {
                ...data,
                answers: answers.map(answer => answer.text),
                imgs: answers.map(answer => answer.image)
            };
            dispatch(updateQuestion({ index, newQuestionData }));
            dispatch(changeQuestion(1));
        }
    };

    const handleDeleteQuestion = () => {
        dispatch(removeQuestion(index)); // Удаляем вопрос
        dispatch(changeQuestion(-1)); // Переходим к предыдущему вопросу
    };

    const handleDragStart = (e, idx) => {
        e.dataTransfer.setData("text/plain", idx);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, idx) => {
        const draggedIdx = e.dataTransfer.getData("text/plain");
        const draggedAnswer = answers[draggedIdx];

        const newAnswers = [...answers];
        newAnswers.splice(draggedIdx, 1);
        newAnswers.splice(idx, 0, draggedAnswer);

        setAnswers(newAnswers);

        const newQuestionData = {
            ...data,
            answers: newAnswers.map(answer => answer.text),
            imgs: newAnswers.map(answer => answer.image)
        };
        dispatch(updateQuestion({ index, newQuestionData }));
    };

    const handleImageChange = (e, idx) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newAnswers = [...answers];
                newAnswers[idx].image = reader.result; // Сохраняем Base64 строку в ответе
                setAnswers(newAnswers);

                const newQuestionData = {
                    ...data,
                    answers: newAnswers.map(answer => answer.text),
                    imgs: newAnswers.map(answer => answer.image)
                };
                dispatch(updateQuestion({ index, newQuestionData }));
            };
            reader.readAsDataURL(file); // Читаем файл как Data URL (Base64)
        }
    };
    return (
        <div className="type">
            <div>
                <div id="answersImg">
                    <div className="head">
                        <img src={answer2} alt="#" />
                        <h4
                            contentEditable="true"
                            spellCheck="false"
                            suppressContentEditableWarning={true}
                            onBlur={(e) => {
                                const value = e.target.innerText.trim();
                                if (value === '') {
                                    e.target.innerText = "Впишите заголовок вопроса";
                                    setData({ ...data, question: "Впишите заголовок вопроса" });
                                } else {
                                    setData({ ...data, question: value });
                                }
                            }}
                            onInput={(e) => {
                                const value = e.target.innerText.trim();
                                if (value === '') {
                                    e.target.innerText = "Впишите заголовок вопроса";
                                }
                            }}
                        >
                            {data.question}
                        </h4>
                        <div className="index">{index + 1}</div>
                    </div>
                    {answers.map((answer, idx) => (
                        <div 
                            key={answer.id} 
                            className="answer" 
                            draggable 
                            onDragStart={(e) => handleDragStart(e, idx)} 
                            onDragOver={handleDragOver} 
                            onDrop={(e) => handleDrop(e, idx)}
                        >
                            <p contentEditable="true" spellcheck="false" suppressContentEditableWarning={true} onBlur={(e) => handleAnswerChange(e, idx)}>{answer.text}</p>
                            <input 
                                type="file" 
                                onChange={(e) => handleImageChange(e, idx)} 
                                style={{ display: 'none' }} 
                                className='logoImg' 
                            />
                            <button 
                                onClick={() => document.querySelectorAll('.logoImg')[idx].click()} 
                                style={{ backgroundImage: `url(${answer.image || img})`}}
                            >
                            </button>
                            <div className="delete" onClick={() => deleteAnswer(answer.id)}>
                                <img src={trash2} alt="#" />
                            </div>
                            <div className="move">    
                                <img src={move} alt="#" />
                            </div>
                        </div>
                    ))}
                    <p onClick={addAnswer} style={{ display: answers.length > 4 ? 'none' : 'block' }}>Добавить ответ</p>
                    <p className="delete" onClick={handleDeleteQuestion}><img src={close} alt="#" />Удалить этот вопрос</p>
                </div>
                <div className="btns">
                    <button className={index === 0 ? 'disactive' : ''} onClick={handlePreviousQuestion}></button>
                    <button className={index === canvas2.length - 1 ? 'disactive' : ''} onClick={handleNextQuestion}></button>
                </div>
                <div onClick={handleIncrement} style={{display: count === 10 ? 'none' : 'flex'}} className='add'><img src={plus} alt="#" /></div>            
            </div>
        </div>
    );
}

export default AnswersImg;