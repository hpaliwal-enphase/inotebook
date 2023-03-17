import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import Alert from './Components/Alert';
import Signup from './Components/Signup';
import Login from './Components/Login';
import AlertState from './context/alerts/AlertState';
import ThemeState from './context/theme/ThemeState';
import NoteState from './context/notes/NoteState';
import MainRoutes from './MainRoutes';



function App() {


  return (
    <>
      <AlertState>
        <ThemeState>
          <NoteState>
            <Router>
              <Navbar/>
              <Alert/>
              <MainRoutes />
            </Router>
          </NoteState>
        </ThemeState>
      </AlertState>
    </>
  );
}

export default App;
