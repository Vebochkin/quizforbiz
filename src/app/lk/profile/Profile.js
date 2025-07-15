import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PROFILE, PUTPROFILE, RESETPASSWORD } from '../../../middleware';
import LeftBar from '../../components/lk/leftBar/LeftBar';
import './style.scss';
import money from '../../img/profile/money.svg';
import copy from '../../img/profile/copy.svg';
import close from '../../img/close.svg';
import success from '../../img/success.svg';

const Profile = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile);
    const balance = useSelector((state) => state.balance);
    const token = useSelector((state) => state.Token);
    const id = useSelector((state) => state.id);
    const profileRate = useSelector((state) => state.profile_rate);
    const isProfile = useSelector((state) => state.isProfile);

    const [modalActive, setModalActive] = useState(false);
    const [modaSuccessActive, setModalSuccessActive] = useState(false);

    const [newEmail, setEmail] = useState(profile.email || '');
    const [newName, setName] = useState(profile.name || '');
    const [phoneInputValue, setPhoneInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const [dataForm, setDataForm] = useState({
        id: profile.id,
        password_old: '',
        password: '',
        password_confirmation: ''
    });

    const data = {
        id: profile.id,
        email: newEmail,
        phone: phoneInputValue.replace(/\D/g, '').slice(1), // Только цифры без +7
        name: newName
    };

    const handleSend = () => {
        dispatch(PUTPROFILE(token, data));
    };

    const handleReset = () => {
        setEmail(profile.email || '');
        setPhoneInputValue(profileRate.phone ? '+7' + profileRate.phone : '+7');
        setName(profile.name || '');
    };

    useEffect(() => {
        if (!isProfile) {
            dispatch(PROFILE(token));
        }
    }, [dispatch, isProfile, token, id]);

    useEffect(() => {
        setEmail(profile.email || '');
        setName(profile.name || '');
        setPhoneInputValue(profileRate.phone ? '+7' + profileRate.phone : '+7');
    }, [profile, profileRate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePost = () => {
        if (dataForm.password === dataForm.password_confirmation && dataForm.password !== '' && dataForm.password_old !== '') {
            dispatch(RESETPASSWORD(dataForm))
                .then(() => {
                    setModalActive(false);
                    setModalSuccessActive(true);
                    setDataForm({
                        id: profile.id,
                        password_old: '',
                        password: '',
                        password_confirmation: ''
                    });
                })
                .catch(() => {
                    console.error("Ошибка при изменении пароля");
                });
        }
    };

    const handlePhoneChange = (e) => {
        let value = e.target.value;

        // Оставляем только цифры
        const digits = value.replace(/\D/g, '');

        if (digits.startsWith('7')) {
            const rest = digits.slice(1, 11); // до 10 цифр после 7
            setPhoneInputValue('+7' + rest);
        } else {
            const rest = digits.slice(0, 10); // если нет 7, просто до 10
            setPhoneInputValue('+7' + rest);
        }
    };

    const handlePhoneFocus = () => {
        setIsFocused(true);
        // Оставляем только "+7" при фокусе
        setPhoneInputValue(prev => prev.startsWith('+7') ? '+7' : '+7');
    };

    const handlePhoneBlur = () => {
        setIsFocused(false);
        const digits = phoneInputValue.replace(/\D/g, '');

        if (digits.length > 1) {
            let formatted = '+7';
            const rest = digits.slice(1, 11);

            if (rest.length >= 3) {
                formatted += ` ${rest.slice(0, 3)}`;
                if (rest.length >= 6) {
                    formatted += ` ${rest.slice(3, 6)}`;
                    if (rest.length >= 8) {
                        formatted += ` ${rest.slice(6, 8)}`;
                        if (rest.length >= 10) {
                            formatted += `-${rest.slice(8, 10)}`;
                        } else if (rest.length > 8) {
                            formatted += `-${rest.slice(8, 10)}`;
                        }
                    } else if (rest.length > 6) {
                        formatted += ` ${rest.slice(6, 8)}`;
                    }
                } else if (rest.length > 3) {
                    formatted += ` ${rest.slice(3, 6)}`;
                }
            } else if (rest.length > 0) {
                formatted += ` ${rest}`;
            }

            setPhoneInputValue(formatted);
        } else {
            setPhoneInputValue('+7');
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-xxl-3 col-xl-3 col-lg-3 col-12">
                    <LeftBar />
                </div>
                <div className="col-xxl-9 col-xl-9 col-lg-9 col-12">
                    <div id="profile">
                        <div className="head">
                            <h2>Профиль</h2>
                            <p><img src={money} alt="#" />Текущий баланс</p>
                            <div className="balance">{balance} ₽</div>
                            <button>Пополнить</button>
                            <button>Вывести</button>
                        </div>
                        <div className="email">
                            <h6>Email</h6>
                            <input 
                                type="text" 
                                placeholder={profile.email} 
                                readOnly
                            />
                        </div>
                        <div className="name">
                            <h6>Ваше имя</h6>
                            <input 
                                type="text" 
                                placeholder={profile.name} 
                                value={newName} 
                                onChange={(e) => setName(e.target.value)} 
                            />
                        </div>
                        <div className="password">
                            <h6>Пароль</h6>
                            <input 
                                type="text" 
                                placeholder='сменить пароль' 
                                readOnly 
                                onClick={() => setModalActive(!modalActive)}
                            />
                        </div>
                        <div className="phone">
                            <h6>Телефон</h6>
                            <input 
                                type="text" 
                                value={phoneInputValue}
                                onFocus={handlePhoneFocus}
                                onBlur={handlePhoneBlur}
                                onChange={handlePhoneChange}
                            />
                            <button onClick={handleSend}>Сохранить изменения</button>
                            <p onClick={handleReset}>Не сохранять изменения</p>
                        </div>    
                        <div className="tg_notification">
                            <p><span>Уведомлять меня в Telegram</span><br/>чтобы знать, когда заканчиваются заявки или тариф</p>
                            <input type="text" placeholder='@tg....'/>
                        </div>                      
                        <div className="referal">
                            <p>Пригласите новых пользователей<br/>с помощью вашей уникальной ссылки:</p>
                            <div>q.pro/referal/#id324235</div>
                            <button>Копировать<img src={copy} alt="#" /></button>
                        </div>
                    </div>

                    {/* Модальное окно смены пароля */}
                    <div id="changePassword" style={{ display: modalActive ? 'block' : 'none' }}>
                        <h2>Вы действительно<br/>изменить пароль?</h2>
                        <input 
                            type="password" 
                            name="password_old" 
                            placeholder='Старый пароль' 
                            onChange={handleChange} 
                            value={dataForm.password_old} 
                            required 
                        />
                        <input 
                            type="password" 
                            name="password" 
                            placeholder='Новый пароль' 
                            onChange={handleChange} 
                            value={dataForm.password} 
                            required 
                        />
                        <input 
                            type="password" 
                            name="password_confirmation" 
                            placeholder='Повторите пароль' 
                            onChange={handleChange} 
                            value={dataForm.password_confirmation} 
                            required 
                        />
                        <div className="btns">
                            <button onClick={handlePost}>Да</button>
                            <button onClick={() => setModalActive(false)}>Нет</button>
                        </div>
                        <div className="close" onClick={() => setModalActive(false)}>
                            <img src={close} alt="#" />
                        </div>
                    </div>

                    {/* Успешное изменение пароля */}
                    <div id="changePasswordOk" style={{ display: modaSuccessActive ? 'block' : 'none' }}>
                        <h2>Ваш пароль<br/>успешно изменён</h2>
                        <img src={success} alt="#" />
                        <button onClick={() => setModalSuccessActive(false)}>Хорошо</button>
                        <div className="close" onClick={() => setModalSuccessActive(false)}>
                            <img src={close} alt="#" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;