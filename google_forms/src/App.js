
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import UserInput from './component/UserInput';
import Form from './component/Form';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path='/' element={<UserInput />} />
        <Route path="/forms" element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
