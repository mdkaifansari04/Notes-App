
import './App.css';
import ComplexNavbar from './components/Navbar';
import NoteState from './context/Note/notesStates';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import { useState,useEffect } from 'react';
import Home from './components/Home';
import Profile from './components/Profile';

function App() {
  const [showAlert, setShowAlert] = useState({
    show : false,
    message : "",
    color: "blue",
})

const handleShowAlert = (message,color) =>{
    setShowAlert({
        show:true,
        message:message,
        color:color
    })
}

const [mode, setMode] = useState("dark")

      useEffect(() =>{
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          setMode("dark")
      }else{
        setMode("light")
      }
      },[])
      useEffect(() =>{
          if (mode === 'dark') {
            document.documentElement.classList.add("dark")
            document.documentElement.classList.remove("light")
          }else{
            document.documentElement.classList.remove("dark")
            document.documentElement.classList.add("light")
          }
      },[mode])

  return (
    <>
      <NoteState>
        <Router>
        <ComplexNavbar mode={mode} setMode={setMode} />
          <div className="pt-28 bg-[#f6f6f6] dark:bg-[#0F172A] overflow-hidden w-full h-full" style={{height: "100vh"}}>
            <Routes>
              <Route exact path="/" element={<Home mode={mode} showAlert={showAlert} handleShowAlert={handleShowAlert} setShowAlert={setShowAlert} />} />
              <Route exact path="/login" element={<Login handleShowAlert={handleShowAlert}  showAlert={showAlert} setShowAlert={setShowAlert} />} />
              <Route exact path="/signup" element={<Signup handleShowAlert={handleShowAlert} showAlert={showAlert} setShowAlert={setShowAlert} />} />
              <Route exact path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
