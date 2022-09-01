import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StatsPage from '../components/StatsPage/StatsPage';



const MainRoutes = () => {

  const ROUTES = [
    {
      link: '/',
      element: <StatsPage />,
      id: 1
    }
  ]

  return (
    <>
      <Routes>
        {ROUTES.map((item) =>(
          <Route path={item.link} element={item.element} key={item.id}></Route>
        ))}
      </Routes>
    </>
  );
};

export default MainRoutes;