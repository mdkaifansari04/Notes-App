
import './App.css';
import ComplexNavbar from './components/Navbar';
import NoteState from './context/Note/notesStates';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import { useState, useEffect, useContext } from 'react';
import Home from './components/Home';
import Profile from './components/Profile';
import notesContext from './context/Note/notesContext';

function App() {


  const [mode, setMode] = useState("dark")


  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setMode("dark")
    } else {
      setMode("light")
    }

  }, [])
  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add("dark")
      document.documentElement.classList.remove("light")
    } else {
      document.documentElement.classList.remove("dark")
      document.documentElement.classList.add("light")
    }
  }, [mode])

  return (
    <>
      <NoteState>
        <Router>
          <ComplexNavbar mode={mode} setMode={setMode} />
          <div className="p-12 md:py-16 bg-[#f6f6f6] dark:bg-[#0F172A] w-full h-full" style={{height: "100vh", overflowY : "auto"}}>
            <Routes>
              <Route exact path="/" element={<Home mode={mode} />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
