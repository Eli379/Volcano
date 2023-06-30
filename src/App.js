import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import VolcanoList from "./pages/Volcano List"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Volcano from "./pages/Volcano"
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/volcano" element={<Volcano />} />
        <Route path='/' exact element={<Home />} />
        <Route path='/volcanolist' element={<VolcanoList />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Login' element={<Login />} />
        <Route path='*' exact={true} element={<NotFound/ >} />
      </Routes>
    </Router>
  );
}
  
export default App;