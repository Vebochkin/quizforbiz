import React from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setCurrenBase } from '../../../../actions';
import './style.scss';

const ArticleSmall = ({data, current}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    dispatch(setCurrenBase(current));
    navigate(`/user/base/${current}`);
  };
  return (
    <div className="article-item">
        <h5>{data.title}</h5>
        <p>{data.text}</p>
        <button onClick={() => handleClick()}>Читать</button>
    </div>
  )
}
export default ArticleSmall;