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
import EditFeedback from './components/feedback/EditFeedback';
import EditBlog from './components/blog/EditBlog';
import AddCarService from './components/carService/AddCarService';
import EditCarService from './components/carService/EditCarService';
import Users from './components/users/Users';
import VerifyEmail from './components/auth/emailVerify/VerifyEmail';
import NotFound from './pages/NotFound';
import EmailNotVerified from './components/layout/EmailNotVerified';
import ConfirmEmail from './components/auth/resetPassword/ConfirmEmail';
import NewPassword from './components/auth/resetPassword/NewPassword';

function App() {
  return (
    <Router>
      <Header branding='Bob Garage'/>
        <main>
          <EmailNotVerified />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='about' element={<About />}></Route>
            <Route path='service' element={<CarService />}></Route>
            <Route path='service/add' element={<AddCarService />}></Route>
            <Route path='service/edit/:id' element={<EditCarService />}></Route>
            <Route path='feedback' element={<Feedback />}></Route>
            <Route path='feedback/add' element={<AddFeedback />}></Route>
            <Route path='feedback/edit/:id' element={<EditFeedback />}></Route>
            <Route path='blog' element={<Blog />}></Route>
            <Route path='blog/add' element={<AddBlog />}></Route>
            <Route path='blog/edit/:id' element={<EditBlog />}></Route>
            <Route path='users' element={<Users />}></Route>
            <Route path='login' element={<Login />}></Route>
            <Route path='register' element={<Register />}></Route>
            <Route path='email/verify' element={<VerifyEmail />}></Route>
            <Route path='login/verify' element={<VerifyEmail />}></Route>
            <Route path='email/confirm' element={<ConfirmEmail />}></Route>
            <Route path='email/newpassword' element={<NewPassword />}></Route>
            <Route path='*' element={<NotFound />}></Route>
          </Routes>
        </main>
      <Footer/>
    </Router>
  )
}

export default App;
