import React, { useEffect, useState } from 'react';
import Logout from './logout/Logout';
import LeftBar from './leftBar/LeftBar';
import { ARTICLEPUT, ARTICLEDELETE, BASEADMIN } from '../../../middleware';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

const ArticleAdmin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.Token);
    const dataIndex = useSelector((state) => state.admin.base_index);
    const index = useSelector((state) => state.admin.base_name_index);
    const data = useSelector((state) => state.admin.current_base[dataIndex]);

    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    useEffect(() => {
        if (data) {
            setDescription(data.description || ''); 
            setTitle(data.title || ''); 
        }
    }, [data]);

    const handleSave = () => {
        const shortDescription = description.slice(0, 100);
        dispatch(ARTICLEPUT(token, {
            "id": data.id,
            "category_id": index,
            "title": title,
            "description": shortDescription, 
            "text": description,
            enabled: 1
        }));
    };

    const handleBack = () => {
        navigate(-1);
        dispatch(BASEADMIN(token, index));
    };
    const handleDelete = () => {
        dispatch(ARTICLEDELETE(token, data.id))
        navigate(-1);
        dispatch(BASEADMIN(token, index));
    };

    return (
        <div className='container-fluid'>
            <div className="row admin">
                <LeftBar />       
                <div className="col-xxl-10" id='Base_article'>
                    <h1>Добавить статью</h1>
                    <button onClick={handleDelete}>Удалить статью</button>
                    <button onClick={handleSave}>Сохранить</button>
                    <button onClick={handleBack}>Назад</button>                
                    <Logout />
                    <div>
                        <input 
                            type="text" 
                            placeholder='Заголовок статьи'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} 
                        />
                        <div>
                            <textarea 
                                value={description} 
                                placeholder='Описание статьи'
                                onChange={(e) => setDescription(e.target.value)}  
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArticleAdmin;
