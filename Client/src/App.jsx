import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import About from './components/pages/About';

function App() {
  return (
    <Router>
      <Header branding='Bob Garage'/>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='about' element={<About />}></Route>
        </Routes>
      <Footer/>
    </Router>
  )
}

export default App
