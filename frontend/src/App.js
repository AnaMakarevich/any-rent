import * as React from 'react';
import './App.css'
import {
    BrowserRouter,
    Routes,
    Route,
    Outlet
  } from "react-router-dom";
import HomeRoute from './Components/Routes/HomeRoute/HomeRoute';
import ItemRoute from './Components/Routes/ItemRoute/ItemRoute';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Outlet/>}>
                    <Route index element={<HomeRoute />} />
                    <Route path="item" element={<ItemRoute />} />
                </Route>
            </Routes>
      </BrowserRouter>
    );
  }

export default App;