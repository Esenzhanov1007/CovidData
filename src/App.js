import { useEffect } from "react";
import { Provider } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import MainRoutes from "./Routes/MainRoutes";
import {configureStore} from './store/index';
import {useSelector, useDispatch} from 'react-redux';

function App() {

  const store = configureStore();

  return (
    <>
      <Provider store={store}>
        <Navbar/>
        <MainRoutes/>
      </Provider>
    </>
  );
}

export default App;
