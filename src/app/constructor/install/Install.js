import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import './style.scss';
import LeftBar from '../../components/constructor/leftbar/LeftBar';
import copy from '../../img/Constructor/create/copy.svg';
import tt from '../../img/Constructor/create/tt.svg';
import vk from '../../img/Constructor/create/vk.svg';
import tg from '../../img/Constructor/create/tg.svg';

const Install = () => {
    const currentQuizID = useSelector((state) => state.createQuiz.currentQuizID);
    const status = useSelector((state) => state.createQuiz.is_active);
    const [buttonText, setButtonText] = useState({});
    const [imageVisible, setImageVisible] = useState({}); 
    const copyToClipboard = (text, buttonKey) => {
        navigator.clipboard.writeText(text).then(() => {
            setButtonText((prev) => ({
                ...prev,
                [buttonKey]: 'Текст скопирован',
            }));

            setImageVisible((prev) => ({
                ...prev,
                [buttonKey]: false,
            }));

            setTimeout(() => {
                setButtonText((prev) => ({
                    ...prev,
                    [buttonKey]: 'Копировать',
                }));
                setImageVisible((prev) => ({
                    ...prev,
                    [buttonKey]: true,
                }));
            }, 3500);
        });
    };
    const downloadScriptFile = async (variableValue, buttonKey) => {
      try {

        if (navigator.clipboard) {
          await navigator.clipboard.writeText(variableValue);
        } else {
          console.warn('Clipboard API не доступен');
        }

        const response = await fetch('/script.js');
        let scriptText = await response.text();

        const variableDeclaration = `const Quiz_id = ${currentQuizID};\n`;
        scriptText = variableDeclaration + scriptText;

        const blob = new Blob([scriptText], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'script.js';
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        setButtonText((prev) => ({
          ...prev,
          [buttonKey]: 'Файл скачан',
        }));

        setImageVisible((prev) => ({
          ...prev,
          [buttonKey]: false,
        }));

        setTimeout(() => {
          setButtonText((prev) => ({
            ...prev,
            [buttonKey]: 'Скачать',
          }));
          setImageVisible((prev) => ({
            ...prev,
            [buttonKey]: true,
          }));
        }, 3500);
      } catch (error) {
        console.error('Ошибка при загрузке и скачивании файла:', error);
      }
    };
    const downloadScriptFile2 = async (text, buttonKey) => {
      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(text);
        } else {
          console.warn('Clipboard API не доступен');
        }
        setButtonText((prev) => ({
          ...prev,
          [buttonKey]: 'Файл скачан',
        }));

        setImageVisible((prev) => ({
          ...prev,
          [buttonKey]: false,
        }));
        setTimeout(() => {
          setButtonText((prev) => ({
            ...prev,
            [buttonKey]: 'Скачать',
          }));
          setImageVisible((prev) => ({
            ...prev,
            [buttonKey]: true,
          }));
        }, 3500);
        const link = document.createElement('a');
        link.href = '/style.css';
        link.download = 'style.css';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Ошибка при копировании текста или скачивании файла:', error);
      }
    };

    const codeInit = `<button id="qw-buttonQuiz">Пройти квиз</button><div id="qw-Quiz"></div><script>const Quiz_id = ${currentQuizID};</script><script src="https://lkcdn.quizforbiz.ru/script.js"></script>`;
    const codeInit2 = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo:ital,wght@0,100..900;1,100..900&family=Barriecito&family=Bebas+Neue&family=Berkshire+Swash&family=Big+Shoulders+Stencil:opsz,wght@10..72,100..900&family=Bitter:ital,wght@0,100..900;1,100..900&family=Boldonse&family=Boogaloo&family=Bowlby+One&family=Bungee+Inline&family=Bytesized&family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Dancing+Script:wght@400..700&family=Gidole&family=Gloock&family=Herr+Von+Muellerhoff&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Knewave&family=Lalezar&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Lilita+One&family=Limelight&family=Lobster&family=Montserrat+Underline:ital,wght@0,100..900;1,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Oswald:wght@200..700&family=PT+Sans+Narrow:wght@400;700&family=Pattaya&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100..900;1,100..900&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Roboto:ital,wght@0,100..900;1,100..900&family=Rochester&family=Rubik:ital,wght@0,300..900;1,300..900&family=Russo+One&family=Tektur:wght@400..900&family=Urbanist:ital,wght@0,100..900;1,100..900&family=Winky+Sans:ital,wght@0,300..900;1,300..900&family=Work+Sans:ital,wght@0,100..900;1,100..900&family=Young+Serif&family=Yusei+Magic&family=Zilla+Slab:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">`;
  return (
    <div className="container">
      <div className="row">
        <div className="col-xxl-3 col-xl-3 col-lg-3 col-12">
          <LeftBar />
        </div>
        <div className="col-xxl-9 col-xl-9 col-lg-9 col-12">
          <div id="install">
            <div className="head">
              <h2>Прямая ссылка на квиз</h2>
              <div className="status">{status === 1 ? "Опубликовано" : "Не опубликовано"}</div>
              <div className="link">
                <div>
                  https://lk.quizforbiz.ru/quiz/{currentQuizID}
                  <button onClick={() => copyToClipboard(`https://lk.quizforbiz.ru/quiz/${currentQuizID}`, 'quizLink')}>
                    {buttonText['quizLink'] || 'Копировать'}{imageVisible['quizLink'] !== false && <img src={copy} alt="#" />}
                  </button>
                </div>
              </div>
            </div>
            <div className="social">
              <h2>Социальные сети</h2>
              <div className="items">
                <div className="item">
                  <h6>ВКонтакте</h6>
                  <p>Поставить ссылку-виджет<br />в сообществе</p>
                  <button onClick={() => copyToClipboard('Ссылка для ВКонтакте', 'vkLink')}>
                    {buttonText['vkLink'] || 'Копировать'}
                  </button>
                  <img src={vk} alt="#" />
                </div>
                <div className="item">
                  <h6>Telegram</h6>
                  <p>Открывать по ссылке в<br />телеграм-боте</p>
                  <button onClick={() => copyToClipboard('Ссылка для Telegram', 'tgLink')}>
                    {buttonText['tgLink'] || 'Копировать'}
                  </button>
                  <img src={tg} alt="#" />
                </div>
                <div className="item">
                  <h6>Tik Tok</h6>
                  <p>Поставить ссылку в шапку<br />профиля</p>
                  <button onClick={() => copyToClipboard('Ссылка для Tik Tok', 'ttLink')}>
                    {buttonText['ttLink'] || 'Копировать'}
                  </button>
                  <img src={tt} alt="#" />
                </div>
              </div>
            </div>
            <div className="code">
              <h2>Встраивание на сайт</h2>
              <div className="init">
                <h5>Код инициализации</h5>
                <p>Вставьте код в блок head в начале страницы.</p>
                <div>{codeInit2}</div>
                <button onClick={() => copyToClipboard(codeInit2, 'initCode')}>
                  {buttonText['initCode'] || 'Копировать'}{imageVisible['initCode'] !== false && <img src={copy} alt="#" />}
                </button>
              </div>
              <div className="instal">
                <h5>Код установки квиза</h5>
                <p>Скопируйте этот код и установите в то место, где должен быть квиз.</p>
                <div>{codeInit}</div>
                <button onClick={() => copyToClipboard(codeInit, 'initCode2')}>                  
                    {buttonText['initCode2'] || 'Копировать'}{imageVisible['initCode2'] !== false && <img src={copy} alt="#" />}
                </button>
              </div>
              <p><span>Проверить правильность установки</span><br />Введите полный адрес страницы, где вы установили квиз, и нажмите "проверить".</p>
              <div className="link">Ccылка<div>https://qzpro.me<button>Проверить</button></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Install;