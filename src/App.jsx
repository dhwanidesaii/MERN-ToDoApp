import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddTodo from './components/AddTodo'
import Todos from './components/Todos'
import SignIn from './components/SignIn'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    const auth = getAuth();
    auth.signOut();
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/app" /> : <SignIn setUser={setUser} />} />
        <Route path="/app" element={user ? (
          <>
            <header className="flex justify-between items-center px-8 py-6 w-full">
              <h1 className="todo-app-title text-3xl m-0">My To-Do App</h1>
              <button className="todo-btn py-2 px-5 text-base" onClick={handleLogout}>Logout</button>
            </header>
            <AddTodo />
            <Todos />
          </>
        ) : <Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App