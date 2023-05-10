import './App.css';
import AddUsers from './components/AddUsers';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SingleUserPage from './pages/SingleUserPage';

function App() {
  return (
    <div className='has-text-link-light'>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/adduser" element={<AddUsers/>}/>
          <Route path="/user/:id" element={<SingleUserPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
