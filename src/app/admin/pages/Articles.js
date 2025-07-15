import React, { useEffect } from 'react';
import Logout from './logout/Logout';
import LeftBar from './leftBar/LeftBar';
import { ARTICLEPOST, BASEADMIN } from '../../../middleware';
import { setBaseIndex } from '../../../actions';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

const ArticlesAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const datas = useSelector((state) => state.admin.current_base);
  const token = useSelector((state) => state.Token);
  const baseName = useSelector((state) => state.admin.base_name);
  const index = useSelector((state) => state.admin.base_name_index);
  const names = 'title' + Math.floor(Math.random() * 100);
  const handleClick = (index) => {
    dispatch(setBaseIndex(index));
    navigate(`/admin/base/${index}`);
  };
  const handleBack = () => {
    navigate(-1);
  };
  const handlePost = () => {
    dispatch(ARTICLEPOST(token, {
        "category_id": index,
        "title": names,
        "description": 'shortDescription', 
        "text": 'description',
        'enabled': 1
    })).then(() => {
      dispatch(BASEADMIN(token, index));
    }).catch((error) => {
      console.error(error);
    });
    
  };
  return (
    <div className='container-fluid'>
      <div className="row admin">
        <LeftBar />       
        <div className="col-xxl-10" id='Base_articles'>
            <h1>Добавить статью</h1>
            <button onClick={handleBack}>Назад</button> 
            <Logout />
            <div>
               <h2>{baseName}</h2> 
               <button onClick={handlePost}>Добавить статью</button>
               <div className="arlitcles">
                  {datas.length > 0 ? datas.map((item, index) => (
                    <div className="article-item" key={index}>
                      <h5>{item.title}</h5>
                      <p>{item.text}</p>
                      <button onClick={() => handleClick(index)}>Редактировать</button>
                    </div>
                  )) : null}
               </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ArticlesAdmin;