import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/navbar/Navbar'
import { Outlet } from 'react-router-dom';
import Notes from './pages/notes/Notes'
import Archived from './pages/archived/Archived'

const NavLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<NavLayout />}>
          <Route index element={<Notes />} />
        </Route>
        <Route path="/archived" element={<NavLayout />}>
          <Route index element={<Archived />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

