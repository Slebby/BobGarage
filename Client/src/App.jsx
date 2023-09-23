import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './components/blog/Blog';
import CarService from './components/carService/CarService';
import Feedback from './components/feedback/Feedback';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AddFeedback from './components/feedback/AddFeedback';
import AddBlog from './components/blog/AddBlog';

function App() {
  return (
    <Router>
      <Header branding='Bob Garage'/>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='about' element={<About />}></Route>
          <Route path='service' element={<CarService />}></Route>
          <Route path='feedback' element={<Feedback />}></Route>
          <Route path='feedback/add' element={<AddFeedback />}></Route>
          <Route path='blog' element={<Blog />}></Route>
          <Route path='blog/add' element={<AddBlog />}></Route> 
          <Route path='login' element={<Login />}></Route>
          <Route path='register' element={<Register />}></Route>
        </Routes>
      <Footer/>
    </Router>
  )
}

export default App
