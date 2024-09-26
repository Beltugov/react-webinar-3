import Basket from './basket';
import useSelector from '../store/use-selector';
import {BrowserRouter, createBrowserRouter, RouterProvider} from "react-router-dom";
import Main from "./main";
import ItemPage from "./itemPage";


/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <>
        <Main/>
        {activeModal === 'basket' && <Basket/>}
      </>,
    },
    {
      path: "/:id",
      element: <>
        <ItemPage/>
        {activeModal === 'basket' && <Basket/>}
        </>
    }
  ]);

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
