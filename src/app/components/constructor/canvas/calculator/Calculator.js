import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incremenCountQuestion, changeQuestion, updateQuestion, removeQuestion } from '../../../../../actions';
import './style.scss';
import answer4 from '../../../../img/Constructor/create/answer4.svg';
import close from '../../../../img/Constructor/create/close.svg';
import plus from '../../../../img/Constructor/create/plus.svg';

const Calculator = () => {
    const dispatch = useDispatch();
    const index = useSelector((state) => state.createQuiz.currentQuestionIndex);
    const count = useSelector((state) => state.createQuiz.countQuestions);
    const canvas2 = useSelector((state) => state.createQuiz.data.canvas2);
    
    const [data, setData] = useState({
        name: 'Calculator',
        question: 'Впишите заголовок вопроса',
        min: '',
        max: '',
        step: '',
        first: ''
    });

    useEffect(() => {
        if (canvas2[index]) {
            setData(canvas2[index]);
        } else {
            setData({
                name: 'Calculator',
                question: 'Впишите заголовок вопроса',
                min: '',
                max: '',
                step: '',
                first: ''
            });
        }
    }, [canvas2, index]);

    const handleInputChange = (field) => (e) => {
        const value = e.target.value;
        if (field === 'question') {
            if (value === '') {
                e.target.innerText = "Впишите заголовок вопроса";
                setData({ ...data, question: "Впишите заголовок вопроса" });
            } else {
                setData({ ...data, [field]: value });
            }
        } else {
            setData({ ...data, [field]: value });
        }
    };

    const handleIncrement = () => {
        dispatch(updateQuestion({ index, newQuestionData: data }));
        dispatch(incremenCountQuestion());
    };

    const handleDeleteQuestion = () => {
        dispatch(removeQuestion(index)); 
    };

    const handlePreviousQuestion = () => {
        if (index > 0) {
            dispatch(updateQuestion({ index, newQuestionData: data }));
            dispatch(changeQuestion(-1));
        }
    };

    const handleNextQuestion = () => {
        if (index < canvas2.length - 1) {
            dispatch(updateQuestion({ index, newQuestionData: data }));
            dispatch(changeQuestion(1));
        }
    };
    const styleType = () => {
        const style = {
            height: ''
        };
        if (window.innerWidth >= 1200 && window.innerWidth < 1400) {
            style.height = '533px';
        } else if (window.innerWidth >= 992 && window.innerWidth < 1200) {
            style.height = '443px';
        } else if (window.innerWidth >= 1400) {
            style.height = '643px';
        } else {
            style.height = '573px';
        }
    
        return style;
    };
    const style = styleType();
    return (
        <div className="type" style={style}>
            <div>
                <div id="calculator">
                    <div className="head">
                        <img src={answer4} alt="#" />
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
                    <div className="range">
                        <p>Выбор значения из диапазона</p>
                        <div>
                            <input type="number" placeholder='0' value={data.min} onChange={handleInputChange('min')} />
                            <div></div>
                            <input type="number" placeholder='100' value={data.max} onChange={handleInputChange('max')} />
                        </div>
                    </div>
                    <div className="init_value">
                        <p>Начальное значение</p>
                        <input type="number" placeholder='50' value={data.first} onChange={handleInputChange('first')} />
                    </div>
                    <div className="step">
                        <p>Шаг</p>
                        <input type="number" placeholder='1' value={data.step} onChange={handleInputChange('step')} />
                    </div>
                    <p className="delete" onClick={handleDeleteQuestion}><img src={close} alt="#" />Удалить этот вопрос</p>
                </div>
                <div className="btns">
                    <button className={index === 0 ? 'disactive' : ''} onClick={handlePreviousQuestion}></button>
                    <button className={index === canvas2.length - 1 ? 'disactive' : ''} onClick={handleNextQuestion}></button>
                </div>
                <div onClick={handleIncrement} style={{display: count === 10 ? 'none' : 'flex'}} className='plus'><img src={plus} alt="#" /></div>             
            </div>
        </div>
    );
}

export default Calculator;