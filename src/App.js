import { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile';
import Users from './components/Users';

function App() {

  const { user } = useContext(UserContext);

  return (
    <div className="w-full">
      <BrowserRouter>
        <Routes>
        {user && (
            <>
              <Route path="/" element={<Home />} exact />
              <Route path="/dashboard" element={<Home />} exact />
              <Route path="/profile" element={<Profile />} exact />
              <Route path="/users" element={<Users />} exact />
            </>
          )}
          {!user && (
            <>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Register />} />
            </>
          )}
          <Route path="*" element={<Navigate to={user ? '/' : '/login'} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;