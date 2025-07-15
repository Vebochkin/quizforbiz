// Instrument.js (для canvas1)
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAlign, resetBackground } from '../../../../../actions';
import './style.scss';
import align_background from '../../../../img/Constructor/create/align_background.svg';
import align_center from '../../../../img/Constructor/create/align_center.svg';
import align_standart from '../../../../img/Constructor/create/align_standart.svg';
import align_arrow_open from '../../../../img/Constructor/create/align_arrow_open.svg';
import align_arrow_closed from '../../../../img/Constructor/create/align_arrow_closed.svg';

const Instrument = () => {
    const dispatch = useDispatch();
    const isvideo = useSelector((state) => state.createQuiz.data.isvideo1);
    const canvasAlign = useSelector((state) => state.createQuiz.data.canvas1.aling); 

    const items = [
        { img: align_center, text: 'По центру', align: 'canvas-center' },
        { img: align_background, text: 'Фоновая картинка', align: 'background-left' },
        { img: align_standart, text: 'Стандартная', align: 'canvas' },
    ];

    const [activeIndex, setActiveIndex] = useState(2); 
    const [activeBackgroundIndex, setActiveBackgroundIndex] = useState(0);
    const [modalClass, setModalClass] = useState('close'); 
    const [activeItem, setActiveItem] = useState(items[2]); 
    const [activeButtonIndex, setActiveButtonIndex] = useState(0); 
    const modalRef = useRef(null); 

    const handleVideoChange = (index) => {
        setActiveBackgroundIndex(index);
        dispatch(resetBackground('canvas1'));
    };

    const handleAlignClick = (align, index) => {
        dispatch(setAlign(align)); 
        setActiveIndex(index); 
        setActiveButtonIndex(0); 
    };

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setModalClass('close'); 
        }
    };

    useEffect(() => {
        if (isvideo) {
            setActiveBackgroundIndex(1);
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isvideo]);

    useEffect(() => {
        switch (canvasAlign) {
            case 'canvas-center':
                setActiveIndex(0);
                setActiveItem(items[0]);
                break;
            case 'background-left':
                setActiveIndex(1);
                setActiveItem(items[1]);
                setActiveButtonIndex(0);
                break;
            case 'background-center':
                setActiveIndex(1);
                setActiveItem(items[1]);
                setActiveButtonIndex(1);
                break;
            case 'background-right':
                setActiveIndex(1);
                setActiveItem(items[1]);
                setActiveButtonIndex(2);
                break;
            case 'canvas':
                setActiveIndex(2);
                setActiveItem(items[2]);
                setActiveButtonIndex(0);
                break;
            default:
                setActiveIndex(2);
                setActiveItem(items[2]);
                setActiveButtonIndex(0);
        }
    }, [canvasAlign]); 

    useEffect(() => {
        if (activeIndex !== null && activeIndex >= 0 && activeIndex < items.length) {
            setActiveItem(items[activeIndex]);
        }
    }, [activeIndex]); 

    const toggleModal = () => {
        setModalClass(modalClass === 'open' ? 'close' : 'open'); 
    };

    const handleButtonClick = (index, align) => {
        setActiveButtonIndex(index);
        dispatch(setAlign(align)); 
    };

    return (
        <div className="instrumens">
            <div className="background">
                <p>Фон</p>
                <div>
                    <button                            
                        className={`${activeBackgroundIndex === 0 ? 'active' : ''}`} 
                        onClick={() => handleVideoChange(0)}>Изображение</button>
                    <button
                        className={`${activeBackgroundIndex === 1 ? 'active' : ''}`} 
                        onClick={() => handleVideoChange(1)}>Видео</button>
                </div>
            </div>
            <div className="design">
                <p>Дизайн</p>
                <div onClick={toggleModal}>
                    <img src={activeItem.img || "#"} alt={activeItem.text || "#"} />
                    <span>{activeItem.text || "Выберите выравнивание"}</span> 
                    <img 
                        src={modalClass === 'open' ? align_arrow_open : align_arrow_closed} 
                        alt="#" 
                    />
                </div>
                <div className={`modal ${modalClass}`} ref={modalRef}>
                    {items.map((item, index) => (
                        <div 
                            key={index}
                            className={`item ${activeIndex === index ? 'active' : ''}`} 
                            onClick={() => handleAlignClick(item.align, index)}
                        >
                            <img src={item.img} alt={item.text} />
                            {item.text}
                        </div>
                    ))}
                </div>
            </div>
            {activeItem.align === 'background-left' ? ( 
                <div className="align-3">
                    <p>Выравнивание</p>
                    <div>
                        <button 
                            className={activeButtonIndex === 0 ? 'active' : ''} 
                            onClick={() => handleButtonClick(0, 'background-left')}
                        >
                        </button>
                        <button 
                            className={activeButtonIndex === 1 ? 'active' : ''} 
                            onClick={() => handleButtonClick(1, 'background-center')}
                        >
                        </button>
                        <button 
                            className={activeButtonIndex === 2 ? 'active' : ''} 
                            onClick={() => handleButtonClick(2, 'background-right')}
                        >
                        </button>
                    </div>
                </div>
            ) : activeItem.align === 'canvas' ? ( 
                <div className="align">
                    <p>Выравнивание</p>
                    <div>
                        <button 
                            className={activeButtonIndex === 0 ? 'active' : ''} 
                            onClick={() => handleButtonClick(0, 'canvas')}
                        >
                        </button>
                        <button 
                            className={activeButtonIndex === 1 ? 'active' : ''} 
                            onClick={() => handleButtonClick(1, 'standart-right')}
                        >
                        </button>
                    </div>
                </div>
            ) : null}
        </div> 
    );
}

export default Instrument;