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
import UserState from './context/user/UserState';

function App() {


  return (
    <>
      <AlertState>
        <UserState>
          <ThemeState>
            <NoteState>
              <Router>
                <Navbar />
                <Alert />
                <MainRoutes />
              </Router>
            </NoteState>
          </ThemeState>
        </UserState>
      </AlertState>
    </>
  );
}

export default App;
