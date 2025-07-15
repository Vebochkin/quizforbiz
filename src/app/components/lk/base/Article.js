import React from 'react';
import LeftBar from '../leftBar/LeftBar';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import './style.scss';

const Article = () => {
  const navigate = useNavigate();
  const dataIndex = useSelector((state) => state.current_base_index);
  const data = useSelector((state) => state.current_base[dataIndex]);
  const handleClick = () => {
    navigate(`/user/base/${data.category_name}`)
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-xxl-3 col-xl-3 col-lg-3 col-12">
          <LeftBar />
        </div>
        <div className="col-xxl-9 col-xl-9 col-lg-9 col-12">
          <div id="article">
              <h2>{data.title}</h2>
              <button onClick={() => handleClick()}></button>
              <div className="scroll">
                <div className="content">
                  <p>{data.text}</p>
                  <div className="text">{data.description}</div>
                </div>                
              </div>

          </div>          
        </div>
      </div>
    </div>
  )
}
export default Article;