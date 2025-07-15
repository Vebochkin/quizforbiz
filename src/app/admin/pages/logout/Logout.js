import React from 'react';
import { LOGOUT } from '../../../../middleware';
import { useSelector, useDispatch } from 'react-redux';

const Logout = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.Token);
    const handleLogOut = () => {
        dispatch(LOGOUT(token));
    };
  return (
    <button onClick={handleLogOut}>Выйти</button>
  )
};

export default Logout;