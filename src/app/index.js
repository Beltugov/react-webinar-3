import {useCallback, useContext, useEffect, useState} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Login from "./login";
import Profile from "./profile";
import useStore from "../hooks/use-store";

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore()
  const token = localStorage.getItem("Token")


  const select = useSelector(state => ({
    modal: state.modals.name,
    user: state.user.data,
  }))

  useEffect(() => {
    if (token !== null) store.actions.user.check()
  }, [])

  useEffect(() => {
    if (select.user) store.actions.profile.setProfile(select.user.profile)
  }, [select.user])

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/profile'} element={token !== null ? <Profile/> : <Navigate to={'/login'}/>}/>
        <Route path={'/login'} element={token === null ? <Login/> : <Navigate to={'/profile'}/>}/>
      </Routes>

      {select.modal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
