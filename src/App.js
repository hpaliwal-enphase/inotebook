import './App.css';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Alert from './Components/Alert';
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
