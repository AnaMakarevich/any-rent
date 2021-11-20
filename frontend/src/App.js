import './App.css';
import { Outlet, Route, Routes } from 'react-router';
// Routes
import MainRoute from './components/Routes/MainRoute/MainRoute';
import HomeRoute from './components/Routes/HomeRoute/HomeRoute';
import ItemRoute from  './components/Routes/ItemRoute/ItemRoute';
import LoginRoute from './components/Routes/LoginRoute/LoginRoute';
import ProfileRoute from './components/Routes/ProfileRoute/ProfileRoute';
import RegisterRoute from './components/Routes/RegisterRoute/RegisterRoute';
import RentOutRoute from './components/Routes/RentOutRoute/RentOutRoute';
import OverviewRoute from './components/Routes/OverviewRoute/OverviewRoute';

function App() {
  return (
      <Routes>
        <Route path="/" element={<MainRoute />}>
          
          <Route index element={<HomeRoute />}/>

          <Route path="item" element={<Outlet/>}>
            <Route index element={<h4>Didnt insert any ItemId</h4>} />
            <Route path=":itemId" element={<ItemRoute/>}/>
          </Route>
          <Route path="rent-out" element={<RentOutRoute/>}/>
          <Route path="overview" element={<OverviewRoute/>}/>
          
          <Route path="profile" element={<ProfileRoute/>}/>
          <Route path="login" element={<LoginRoute/>}/>
          <Route path="register" element={<RegisterRoute/>}/>
        </Route>
      </Routes>
  );
}

export default App;