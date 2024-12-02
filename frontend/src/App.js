import logo from './logo.svg';
import './App.css';
import Home from './pages/home';
import { Route, Routes } from 'react-router-dom';
import Menu from './pages/menu';
import Upload from './pages/upload';
import Form from './pages/form';
import Visualise from './pages/visualize';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='menu' element={<Menu />} >
        <Route path='upload' element={<Upload />} />
        <Route path='form' element={<Form/>} />
        <Route path='visual' element={<Visualise/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
