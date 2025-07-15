import React from 'react';
import LeftBar from '../../../../components/lk/leftBar/LeftBar';
import ArticleSmall from '../../../../components/lk/base/ArticleSmall';
import '../../style.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const IntegSites = () => {
    const navigate = useNavigate();   
    const datas = useSelector((state) => state.current_base);
    const handleClick = (route) => {
      navigate(route);
    };
  return (
    <div className="container">
        <div className="row">
            <div className="col-xxl-3 col-xl-3 col-lg-3 col-12">
                <LeftBar />
            </div>
            <div className="col-xxl-9 col-xl-9 col-lg-9 col-12">
                <div id="page">
                    <h2>Интеграция с сайтом</h2>
                    <button onClick={() => handleClick('/user/base')}></button>
                    <div className="content">
                        <h3>Здесь вы найдёте ответы на свои вопросы</h3>
                        <p>{datas.length} статей</p>
                        <div className="items">
                            {datas.length > 0 ? datas.map((item, index) => (
                                <ArticleSmall key={index} data={item} current={index}/>
                            )) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
export default IntegSites;