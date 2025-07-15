import React from 'react';
import './App.scss';
import logo from './img/logo.svg';

const NOTFOUND = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center" id='NotFound'>
          <img src={logo} alt="#" />
          <h3>Страница не найдена...</h3>
          <h1>404</h1>
        </div>
      </div>
    </div>
  )
}

export default NOTFOUND;