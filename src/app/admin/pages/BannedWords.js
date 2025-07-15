import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BANNEDWORDS, DELETEWORD, PUTWORD, POSTWORD } from '../../../middleware';
import Logout from './logout/Logout';
import LeftBar from './leftBar/LeftBar';
import eye from '../img/eye_close.svg';
import trash from '../img/trash.svg';
import edit from '../img/edit.svg';

const BannedWords = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.Token);
  const words = useSelector((state) => state.admin.bannedWords);
  const [action, setAction] = useState('');
  const [currentWord, setCurrentWord] = useState('');
  const [wordId, setWordId] = useState(null);
  const [editedWords, setEditedWords] = useState({});

  const handleAction = (id) => {
    dispatch(BANNEDWORDS(token));
    if (action === 'delete') {
      dispatch(DELETEWORD(token, id));
      dispatch(BANNEDWORDS(token));
    }
  };

  const handlePost = () => {
    setAction('');
    const names = 'newWord' + Math.floor(Math.random() * 100);
    dispatch(POSTWORD(token, {'word': names}));
    dispatch(BANNEDWORDS(token));
  };
  useEffect(() => {
    setEditedWords({});
  }, [action]);

  const handleEditChange = (id, value) => {
    setEditedWords(prev => ({ ...prev, [id]: value }));
    dispatch(PUTWORD(token, { 'id': id, 'word': value }));
  };
  useEffect(() => {
    dispatch(BANNEDWORDS(token));
  }, []);
  return (
    <div className='container-fluid'>
      <div className="row admin">
        <LeftBar />       
        <div className="col-xxl-10" id='BannedWords'>
          <h1>Запрещенные слова</h1>
          <Logout />
          <div>
            <input type="search" placeholder='Поиск...'/>
            <div className="btns">
              <button onClick={handlePost}>+</button>
              <button onClick={() => setAction('delete')}><img src={trash} alt="#" /></button>          
              <button onClick={() => setAction('edit')}><img src={edit} alt="#" /></button>
            </div>
            <div className='items' style={{gridAutoRows: '44px'}}>
              {words.map((word) => (
                <div className={`${action} item`} key={word.id}>
                  {action === 'edit' ? (
                    <input
                      type="text"
                      value={editedWords[word.id] !== undefined ? editedWords[word.id] : word.text}
                      onChange={(e) => handleEditChange(word.id, e.target.value)}
                    />
                  ) : (
                    <input readOnly placeholder={word.text} />
                  )}
                  <div onClick={() => handleAction(word.id)}></div>
                </div>
              ))}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BannedWords;