import { useCallback, useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Login from "./login";
import Profile from "./profile";

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const select = useSelector(state => ({
    modal: state.modals.name,
    user: state.user.data
  }))

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={select.user === null ? <Login /> : <Navigate to={'/profile'}/>} />
        <Route path={'/profile'} element={select.user !== null ?  <Profile/> : <Navigate to={'/login'} />} />
      </Routes>

      {select.modal === 'basket' && <Basket />}
    </>
  );
}

export default App;
