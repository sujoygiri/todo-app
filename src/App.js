import { Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './Pages/Home';
import PageNotFound404 from './Pages/PageNotFound404';
import NavbarMain from './Components/Navbar';

function App() {
  return (
    <>
      <NavbarMain />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<PageNotFound404 />} />
      </Routes>
    </>
  );
}

export default App;


/*
"List": "/task-list/",
"Detail View": "/task-detail/(Enter task id field in request body)",
"Create": "/task-create/",
"Update": "/task-update/(Enter task id field in request body)",
"Delete": "/task-delete/(Enter task id field in request body)"
*/