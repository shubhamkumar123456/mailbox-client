
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Signup/>
      <Routes>
   
      <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
