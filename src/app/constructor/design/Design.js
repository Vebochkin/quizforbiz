import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme, changeBackgroundColor, changeTextColor, changeButtonColor, changeButtonTextColor, changeFont, changeButtonStyle } from '../../../actions';
import { PUTQUIZ } from '../../../middleware';
import { HexColorPicker } from "react-colorful";
import './style.scss';
import LeftBar from '../../components/constructor/leftbar/LeftBar';
import light from '../../img/Constructor/design/light-theme.svg';
import dark from '../../img/Constructor/design/dark-theme.svg';
import quiz from '../../img/Constructor/design/quiz-theme.svg';
import down from '../../img/Constructor/design/down.svg';

const Design = () => {
  const dispatch = useDispatch();
  const { createQuiz } = useSelector((state) => state);
  const data = useSelector((state) => state.createQuiz.data);
  const currentQuizID = useSelector((state) => state.createQuiz.currentQuizID);
  const token = useSelector((state) => state.Token);
  const theme = useSelector(state => state.createQuiz.data.theme.theme);
  const buttonStyle = useSelector(state => state.createQuiz.data.theme.button_style);

  const backgroundColor = useSelector(state => state.createQuiz.data.theme.background_color);
  const textColor = useSelector(state => state.createQuiz.data.theme.text_color);
  const buttonColor = useSelector(state => state.createQuiz.data.theme.button_color);
  const buttonTextColor = useSelector(state => state.createQuiz.data.theme.button_text_color);

  const [activeItem, setActiveItem] = useState(theme);
  const [activeButtonStyle, setActiveButtonStyle] = useState(buttonStyle);
  const [BackgroundColor, setBackgroundColor] = useState(backgroundColor);
  const [TextColor, setTextColor] = useState(textColor);
  const [ButtonColor, setButtonColor] = useState(buttonColor);
  const [ButtonTextColor, setButtonTextColor] = useState(buttonTextColor);
  
  const [activeColorPicker, setActiveColorPicker] = useState(null);
  const colorPickerRef = useRef(null);

  const font = useSelector((state) => state.createQuiz.data.theme.font);
  const [activeFontModal, setActiveFontModal] = useState(false);
  const dataFonts=["Inter","Roboto","Boldonse","Yusei Magic","Gloock","Young Serif","Bungee Inline","Knewave","Limelight","Boogaloo","Bowlby One","Pattaya","Herr Von Muellerhoff","Cormorant Garamond","Lalezar","Russo One","Berkshire Swash","Zilla Slab","Urbanist","Lobster","Lilita One","Big Shoulders Stencil","Plus Jakarta Sans","PT Sans Narrow","Barriecito","Bitter","Prompt","Archivo","Anton","Rochester","Dancing Script","Bebas Neue","Work Sans","Kanit","Rubik","Raleway","Noto Sans","Roboto Mono","Tektur","Oswald","Roboto Condensed","Montserrat Underline","Lato","Poppins","Montserrat","Gidole","Bytesized","Open Sans","Winky Sans"];

  const handleButtonClick = (theme) => {
    setActiveItem(theme);
    dispatch(changeTheme(theme));
    dispatch(PUTQUIZ(currentQuizID, token, data));
  };

  const handleButtonStyleClick = (style) => {
    setActiveButtonStyle(style);
    dispatch(changeButtonStyle(style));
  };

  const toggleColorPicker = (picker) => {
    setActiveColorPicker(prev => (prev === picker ? null : picker)); 
  };

  const handleBackgroundColorChange = (color) => {
    setBackgroundColor(color);
    dispatch(changeBackgroundColor(color)); 
  };
  const handleTextColorChange = (color) => {
    setTextColor(color);
    dispatch(changeTextColor(color)); 
  };
  const handleButtonColorChange = (color) => {
    setButtonColor(color);
    dispatch(changeButtonColor(color)); 
  };
  const handleButtonTextColorChange = (color) => {
    setButtonTextColor(color);
    dispatch(changeButtonTextColor(color)); 
  };

  const handleFont = (font) => {
    dispatch(changeFont(font));
    setActiveFontModal(false);
  };


  return (
    <div className="container">
      <div className="row">
        <div className="col-xxl-3 col-xl-3 col-lg-3 col-12">
          <LeftBar />
        </div>
        <div className="col-xxl-9 col-xl-9 col-lg-9 col-12">
          <div id="design">
            <h2>Дизайн</h2>
            <div className="design">
              <div className={`item ${activeItem === 'light' ? 'active' : ''}`}>
                <img src={light} alt="#" />
                <button onClick={() => handleButtonClick('light')}></button>
                <p>Светлая тема</p>
              </div>
              <div className={`item ${activeItem === 'dark' ? 'active' : ''}`}>
                <img src={dark} alt="#" />
                <button onClick={() => handleButtonClick('dark')}></button>
                <p>Темная тема</p>
              </div>
              <div className={`item ${activeItem === 'quiz' ? 'active' : ''}`}>
                <img src={quiz} alt="#" />
                <button onClick={() => handleButtonClick('quiz')}></button>
                <p>Фирменная Quiz for biz</p>
              </div>
            </div>
            <div className="settigns-themes">
              <h3>Настройки темы</h3>
              <div className="left">

                <div className="colors">
                  <p>Цвет фона</p>
                  <div className="color" onClick={() => toggleColorPicker('background')}>
                    <button style={{ background: backgroundColor }}></button>
                    <img src={down} alt="#" className={activeColorPicker === 'background' ? 'active' : ''}/>
                  </div>
                  {activeColorPicker === 'background' && (
                    <div ref={colorPickerRef} style={{ position: 'absolute', zIndex: 999, left: 'auto', top: '80px', right: 0}}>
                      <HexColorPicker color={BackgroundColor} onChange={handleBackgroundColorChange} />
                    </div>
                  )}
                </div>

                <div className="colors">
                  <p>Цвет текста</p>
                  <div className="color" onClick={() => toggleColorPicker('text')}>
                    <button style={{ background: TextColor }}></button>
                    <img src={down} alt="#" className={activeColorPicker === 'text' ? 'active' : ''}/>
                  </div>
                  {activeColorPicker === 'text' && (
                    <div ref={colorPickerRef} style={{ position: 'absolute', zIndex: 999, left: 'auto', top: '80px', right: 0}}>
                      <HexColorPicker color={TextColor} onChange={handleTextColorChange} />
                    </div>
                  )}
                </div>

                <div className="fonts">
                  <p>Шрифт</p>
                  <div className="font" onClick={() => setActiveFontModal(!activeFontModal)}>
                    <p>{font}</p>
                    <img src={down} alt="#" className={activeFontModal ? 'active' : ''}/>
                  </div>
                  <div id="fontsUl" style={{display: `${activeFontModal ? 'block' : 'none'}`}}>
                    <div>
                      {dataFonts.map((font, index) => (
                        <button key={index} onClick={() => handleFont(font)}>{font}</button>
                      ))}                      
                    </div>

                  </div>
                </div>
              </div>

              <div className="right">

                <div className="colors">
                  <p>Цвет кнопок</p>
                  <div className="color" onClick={() => toggleColorPicker('button')}>
                    <button style={{ background: ButtonColor }}></button>
                    <img src={down} alt="#" className={activeColorPicker === 'button' ? 'active' : ''}/>
                  </div>
                  {activeColorPicker === 'button' && (
                    <div ref={colorPickerRef} style={{ position: 'absolute', zIndex: 999, left: 'auto', top: '80px', right: 0}}>
                      <HexColorPicker color={ButtonColor} onChange={ handleButtonColorChange} />
                    </div>
                  )}
                </div>

                <div className="colors">
                  <p>Цвет текста кнопок</p>
                  <div className="color" onClick={() => toggleColorPicker('buttonText')}>
                    <button style={{ background: ButtonTextColor }}></button>
                    <img src={down} alt="#" className={activeColorPicker === 'buttonText' ? 'active' : ''}/>
                  </div>
                  {activeColorPicker === 'buttonText' && (
                    <div ref={colorPickerRef} style={{ position: 'absolute', zIndex: 999, left: 'auto', top: '80px', right: 0}}>
                      <HexColorPicker color={ButtonTextColor} onChange={handleButtonTextColorChange} />
                    </div>
                  )}
                </div>

                <div className="styles_button">
                  <p>Cтиль кнопок</p>
                  <div className="style_button">
                    <div 
                        className={`style-option ${activeButtonStyle === 'style1' ? 'active' : ''}`} 
                        onClick={() => handleButtonStyleClick('style1')}
                    ></div>
                    <div 
                        className={`style-option ${activeButtonStyle === 'style2' ? 'active' : ''}`} 
                        onClick={() => handleButtonStyleClick('style2')}
                    ></div>
                    <div 
                        className={`style-option ${activeButtonStyle === 'style3' ? 'active' : ''}`} 
                        onClick={() => handleButtonStyleClick('style3')}
                    ></div>
                    <div 
                        className={`style-option ${activeButtonStyle === 'style4' ? 'active' : ''}`} 
                        onClick={() => handleButtonStyleClick('style4')}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Design;