import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Provider } from './context/context';
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
import EditFeedback from './components/feedback/EditFeedback';
import EditBlog from './components/blog/EditBlog';
import AddCarService from './components/carService/AddCarService';

function App() {
  return (
    <Provider>
      <Router>
        <Header branding='Bob Garage'/>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='about' element={<About />}></Route>
            <Route path='service' element={<CarService />}></Route>
            <Route path='service/add' element={<AddCarService />}></Route>
            <Route path='feedback' element={<Feedback />}></Route>
            <Route path='feedback/add' element={<AddFeedback />}></Route>
            <Route path='feedback/edit/:id' element={<EditFeedback />}></Route>
            <Route path='blog' element={<Blog />}></Route>
            <Route path='blog/add' element={<AddBlog />}></Route>
            <Route path='blog/edit/:id' element={<EditBlog />}></Route> 
            <Route path='login' element={<Login />}></Route>
            <Route path='register' element={<Register />}></Route>
          </Routes>
        <Footer/>
      </Router>
    </Provider>
  )
}

export default App
