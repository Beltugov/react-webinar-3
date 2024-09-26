import { createRoot } from 'react-dom/client';
import App from './app';
import Store from './store';
import { StoreContext } from './store/context';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ItemPage from "./app/itemPage";
import Main from "./app/main";

const store = new Store();

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <App  />
  </StoreContext.Provider>,
);
