import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setName, setCity, setDateFrom, setDateTo, setTime, setType } from '../../../../actions';
import './style.scss';
import filter from '../../../img/application/filter.svg';
import reset from '../../../img/application/reset.svg';
import search from '../../../img/application/search.svg';

const Filters = ({datas}) => {
  const dispatch = useDispatch();
  const applications = useSelector((state) => state.applications);
  const time = useSelector((state) => state.filters.time);
  const citys = useSelector((state) => state.filters.city);
  const names = useSelector((state) => state.filters.name);
  const [activeFilter, setActiveFilter] = useState(0);
  const [nameQuizes, setNameQuizes] = useState([]);
  const [cityQuizes, setCityQuizes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredQuizes, setFilteredQuizes] = useState([]);
  const [citySearchQuery, setCitySearchQuery] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [dateFrom, setDateFromInput] = useState('');
  const [dateTo, setDateToInput] = useState('');

  const handleActiveFilter = (id) => {
    if (activeFilter === id) {
      setActiveFilter(0);
    } else {
      setActiveFilter(id);
    }
  };

  const handleCount = (id) => {
    let count = 0;
    applications.forEach((app) => {
      if (app.quizId === id) {
        count++;
      }
    });
    return count;
  };
  const handleCityCount = (id) => {
    let count = 0;
    applications.forEach((app) => {
      if (app.position === id) {
        count++;
      }
    });
    return count;
  };

  const handleNames = () => {
    const uniqueQuizes = applications.reduce((acc, application) => {
      if (!acc.some(quiz => quiz.id === application.quizId)) {
        acc.push({
          name: application.quizName,
          id: application.quizId,
        });
      }
      return acc;
    }, []);
    setNameQuizes(uniqueQuizes);
  };
  const handleCities = () => {
    const uniqueCities = applications.reduce((acc, application) => {
      if (!acc.includes(application.position)) {
        acc.push(application.position);
      }
      return acc;
    }, []);
    setCityQuizes(uniqueCities);
  };

  const handleTime = (time) => {
    setDateFromInput('');
    setDateToInput('');
    dispatch(setDateFrom(null));
    dispatch(setDateTo(null));
    dispatch(setTime(time));
  };  

  const handleReset = () => {
    dispatch(setTime(null));
    dispatch(setCity(null));
    dispatch(setDateFrom(null));
    dispatch(setDateTo(null));
    dispatch(setType(null));
    dispatch(setName(null));
    setSearchQuery('');
    setCitySearchQuery('');
    setFilteredQuizes([]);
    setFilteredCities([]);
    setDateFromInput('');
    setDateToInput('');
  };
  
  const handleSearch = () => {
    const results = nameQuizes.filter(quiz =>
      quiz.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredQuizes(results);
  };
  const handleCitySearch = () => {
    const results = cityQuizes.filter(city =>
      city.toLowerCase().includes(citySearchQuery.toLowerCase())
    );
    setFilteredCities(results);
  };

  const handleDateFromChange = (e) => {
    const value = e.target.value;
    setDateFromInput(value);
    dispatch(setTime(null));
    dispatch(setDateFrom(value));
  };

  const handleDateToChange = (e) => {
    const value = e.target.value;
    setDateToInput(value);
    dispatch(setTime(null));
    dispatch(setDateTo(value));
  };
  useEffect(() => {
    handleNames();
    handleCities();
  }, [applications]); 
  return (
    <div className="filters">

      {/* Все заявки */}
      <div onClick={() => handleActiveFilter(1)} className={activeFilter === 1 ? 'active' : ''}>
        Все заявки<img src={filter} alt="#" />
      </div>
      <div id="applic" className={activeFilter === 1 ? 'active' : ''}>
        <div className='active'><button></button>Все заявки<p>{applications.length}</p></div>
        <div><button></button>Новые<p>{datas}</p></div>
      </div>


      {/* Квизы */}
      <div onClick={() => handleActiveFilter(2)} className={activeFilter === 2 ? 'active' : ''}>
        Квизы<img src={filter} alt="#" />
      </div>
      <div id="quizes" className={activeFilter === 2 ? 'active' : ''}>
        <div className='input_search'>
          <img src={search} alt="#" onClick={handleSearch} />          
          <input
            type="text"
            placeholder="Поиск..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="scroll">
          {(filteredQuizes.length > 0 ? filteredQuizes : nameQuizes).map((quiz, index) => (
            <div key={index} className={names === quiz.name ? 'active' : ''}>
              <button onClick={() => dispatch(setName(quiz.name))}></button>{quiz.name}<p>{handleCount(quiz.id)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Город */}
      <div onClick={() => handleActiveFilter(3)} className={activeFilter === 3 ? 'active' : ''}>
        Город<img src={filter} alt="#" />
      </div>
      <div id="city" className={activeFilter === 3 ? 'active' : ''}>
        <div className='input_search'>
        <img src={search} alt="#" onClick={handleCitySearch} />
          <input
            type="text"
            placeholder="Поиск города..."
            value={citySearchQuery}
            onChange={(e) => setCitySearchQuery(e.target.value)}
          />
        </div>
        <div className="scroll">
          {(filteredCities.length > 0 ? filteredCities : cityQuizes).map((city, index) => (
            <div key={index} className={citys === city ? 'active' : ''}>
              <button onClick={() => dispatch(setCity(city))}></button>{city || 'Без города'}<p>{handleCityCount(city) === 0 ? applications.length : handleCityCount(city)}</p>
            </div>
          ))}         
        </div>
      </div>

      {/* За все время */}
      <div onClick={() => handleActiveFilter(4)} className={activeFilter === 4 ? 'active' : ''}>
        За все время<img src={filter} alt="#" />
      </div>
      <div id="time" className={activeFilter === 4 ? 'active' : ''}>
        <div className="inputs">
          <input
            type="date"
            value={dateFrom}
            onChange={handleDateFromChange}
          />
          <p>-</p>
          <input
            type="date"
            value={dateTo}
            onChange={handleDateToChange}
          />
        </div>
        <div className="types">
          <div className={time === 'all' ? 'active' : ''}><button onClick={() => handleTime('all')}></button><p>За все время</p></div>
          <div className={time === 'today' ? 'active' : ''}><button onClick={() => handleTime('today')}></button><p>Сегодня</p></div>
          <div className={time === 'yesterday' ? 'active' : ''}><button onClick={() => handleTime('yesterday')}></button><p>Вчера</p></div>
          <div className={time === 'week' ? 'active' : ''}><button onClick={() => handleTime('week')}></button><p>Неделя</p></div>
          <div className={time === 'month' ? 'active' : ''}><button onClick={() => handleTime('month')}></button><p>Месяц</p></div>
        </div>
      </div>




      <p onClick={() => handleReset()}><img src={reset} alt="#" />Сбросить</p>
    </div>
  );
};

export default Filters;