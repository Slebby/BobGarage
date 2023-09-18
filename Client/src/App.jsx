import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

function App() {
  return (
    <Router>
      <Header branding='Bob Garage'/>
      <Routes>
        <Route></Route>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
