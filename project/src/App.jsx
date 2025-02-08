import { useState } from 'react';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import Subtask from './components/Subtask'
function App() {
  const [count, setCount] = useState(0);

  return (
      <Router>
         <ToastContainer position="top-center" autoClose={1000} />
      <Navbar/>
          <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/signup' element={<Signup/>}/>
              <Route path='/dashboard' element={<Dashboard/>}/>
              <Route path='/subtask/:task_id' element={<Subtask/>}/>
          </Routes>
      </Router>
  );
}

export default App;
