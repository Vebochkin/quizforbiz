import React, { useState, useEffect, useRef } from 'react';
import './canvas2.scss';
import { useSelector } from 'react-redux';
import arrow_back from '../../../img/Constructor/previev/arrow_back.svg';
import arrow_next from '../../../img/Constructor/previev/arrow_next.svg';

const Canvas2 = ({ handleButtonClick }) => {
  const rangeInputRef = useRef(null);
  const rangeDivRef = useRef(null);
  const { createQuiz } = useSelector((state) => state);
  const theme = createQuiz.data.theme.theme;
  const buttonStyle = createQuiz.data.theme.button_style;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(createQuiz.data.canvas2.length);

  const backgroundColor = theme === 'user' ? createQuiz.data.theme.background_color : '';
  const textColor = theme === 'user' ? createQuiz.data.theme.text_color : '';
  const buttonColor = theme === 'user' ? createQuiz.data.theme.button_color : '';
  const buttonTextColor = theme === 'user' ? createQuiz.data.theme.button_text_color : '';

  const calculateProgress = () => {
    return totalQuestions ? Math.round((currentIndex / totalQuestions) * 100) : 0;
  };

  const handleNextClick = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleButtonClick('canvas3');
    }
  };

  const handleBackClick = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  useEffect(() => {
    const rangeInput = rangeInputRef.current;
    const rangeDiv = rangeDivRef.current;
    const countInput = document.getElementById('count');

    const updateDivWidth = () => {
      const value = rangeInput.value;
      const max = rangeInput.max;
      const width = (value / max) * 100;
      rangeDiv.style.width = `${width}%`;
    };

    if (rangeInput && rangeDiv && countInput) {
      rangeInput.addEventListener('input', updateDivWidth);
      updateDivWidth();

      countInput.addEventListener('input', () => {
        const value = countInput.value;
        const min = rangeInput.min;
        const max = rangeInput.max;
        if (!isNaN(value) && value >= min && value <= max) {
          rangeInput.value = value;
          updateDivWidth();
        } else {
          countInput.value = '';
        }
      });

      return () => {
        rangeInput.removeEventListener('input', updateDivWidth);
        countInput.removeEventListener('input', () => {});
      };
    }
  }, [createQuiz.data.canvas2[currentIndex].name]);

  const renderQuiz = () => {
    switch (createQuiz.data.canvas2[currentIndex].name) {
      case 'Answers':
        return (
          <div className="answers">
            {createQuiz.data.canvas2[currentIndex].answers.map((answer, answerIndex) => (
              <div className="item" key={answerIndex}>
                <button style={{ backgroundColor: buttonColor, color: buttonTextColor }}></button>
                <p style={{ color: textColor }}>{answer}</p>
              </div>
            ))}
          </div>
        );

      case 'Calculator':
        return (
          <div className="calc">
            <input type="text" id="count" style={{ borderColor: buttonColor }} />
            <div className="range">
              <div ref={rangeDivRef}><div /></div>
              <input
                type="range"
                id="range"
                min={createQuiz.data.canvas2[currentIndex].min}
                max={createQuiz.data.canvas2[currentIndex].max}
                step={createQuiz.data.canvas2[currentIndex].step}
                ref={rangeInputRef}
              />
            </div>
            <div className="text">
              <p style={{ color: textColor }}>{createQuiz.data.canvas2[currentIndex].min}</p>
              <p style={{ color: textColor }}>{createQuiz.data.canvas2[currentIndex].max}</p>
            </div>
          </div>
        );

      case 'AnswersImg':
      case 'AnswersAndImg':
        return (
          <div className="answers-container">
            {createQuiz.data.canvas2[currentIndex].answers.map((answer, index) => {
              const isSelected = false;
              return (
                <div
                  className="image-answer-option"
                  data-index={index}
                  style={{
                    width: '360px',
                    flexShrink: 0,
                    border: `2px solid ${isSelected ? buttonColor : '#eaeaea'}`,
                    borderRadius: '12px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  key={index}
                >
                  <div
                    style={{
                      height: '330px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '8px',
                    }}
                  >
                    <img
                      src={createQuiz.data.canvas2[currentIndex].imgs[index]}
                      alt="Answer"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  </div>

                  <div style={{ padding: '16px', display: 'flex', alignItems: 'center' }}>
                    <div
                      className="answer-checkbox"
                      style={{
                        width: '20px',
                        height: '20px',
                        marginRight: '12px',
                        border: `2px solid ${isSelected ? buttonColor : '#ddd'}`,
                        background: isSelected ? buttonColor : 'transparent',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {isSelected && (
                        <svg width="12" height="12" viewBox="0 0 24 24">
                          <path d="M5 12L10 17L20 7" stroke="white" strokeWidth="2" />
                        </svg>
                      )}
                    </div>
                    <div style={{ fontSize: '15px', color: '#333' }}>{answer}</div>
                  </div>
                </div>
              );
            })}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="canvas2" style={{ backgroundColor }}>
      <h1 style={{ color: textColor }}>{createQuiz.data.title}</h1>
      <h3>{createQuiz.data.canvas2[currentIndex].question}</h3>
      {createQuiz.data.canvas2.length > 0 ? renderQuiz() : null}
      <div className="progress">
        <p style={{ color: textColor }}>
          Готово: <span style={{ color: buttonColor }}>{calculateProgress()}%</span>
        </p>
        <div className="prog">
          <div style={{ width: `${calculateProgress()}%`, background: buttonColor }} />
        </div>
        <a href="http://quizforbiz.ru" style={{ color: textColor, textDecorationColor: buttonColor }}>
          Создано в <span style={{ color: buttonColor }}>Quiz for biz</span>
        </a>
        <button
          onClick={handleBackClick}
          style={{
            color: buttonTextColor,
            border: `0.85px solid ${buttonColor}`,
            display: currentIndex === 0 ? 'none' : 'block',
          }}
        >
          <img src={arrow_back} alt="#" />
        </button>
        <button
          onClick={handleNextClick}
          style={{
            backgroundColor: buttonStyle === 'style1' || buttonStyle === 'style2' ? buttonColor : '',
            color: buttonTextColor,
            border: `0.85px solid ${buttonColor}`,
          }}
        >
          Далее <img src={arrow_next} alt="#" />
        </button>
      </div>

      {/* Scrollbar Styles */}
      <style jsx>{`
        .answers-container {
          display: flex;
          overflow-x: auto;
          overflow-y: auto;
          padding: 12px 0;
          gap: 16px;
          min-height: 370px;
          white-space: nowrap;
        }

        .answers-container::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        .answers-container::-webkit-scrollbar-track {
          background: transparent;
        }

        .answers-container::-webkit-scrollbar-thumb {
          background: ${buttonColor};
          border-radius: 4px;
        }

        @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
          .answers-container {
            -ms-overflow-style: -ms-autohiding-scrollbar;
          }
        }

        @supports (scrollbar-width: thin) or (-ms-overflow-style: none) {
          .answers-container {
            scrollbar-width: thin;
            scrollbar-color: ${buttonColor} transparent;
          }
        }
      `}</style>
    </div>
  );
};

export default Canvas2;