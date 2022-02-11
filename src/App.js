import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';
import AuthService from "./services/authService";
import PrivateRoute from './routes/PrivateRoute';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import "bootstrap/dist/css/bootstrap.min.css";
import 'antd/dist/antd.css';
import './App.css';

function App() {
  const accessToken = AuthService.getAccessToken();
  const [token, setToken] = useState(accessToken);

  useEffect(() => {
    if (accessToken) {
      setToken(accessToken);
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={{ token, setToken }}>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/home" component={Home} />
          </Switch>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
