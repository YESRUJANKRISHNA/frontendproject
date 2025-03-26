
import './App.css';
import Registration from './components/Registration';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Success from './components/success';

function App() {
  return (
    <div className="App">
      <Router>
<Routes>
  <Route path="/"element={<Registration/>} />
<Route path="login/"element={<Login/>}/>
<Route path="success/" element={<Success/>}/>
</Routes>

      </Router>
    </div>
  );
}

export default App;
