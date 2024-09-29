import Basket from './basket';
import useSelector from '../store/use-selector';
import {BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes} from "react-router-dom";
import Main from "./main";
import ItemPage from "./itemPage";


/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Main/>}/>
        <Route path={"/articles/:id"} element={<ItemPage/>}/>
      </Routes>
        {activeModal === 'basket' && <Basket/>}
    </BrowserRouter>
  );
}

export default App;
