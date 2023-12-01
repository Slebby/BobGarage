import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { store } from './store/store.js'
import { Provider } from 'react-redux';
import { fetchFeedbackList } from './reducer/feedbackSlice.js'
import { fetchBlogList } from './reducer/blogSlice.js'
import { fetchCarServiceList } from './reducer/carServiceSlice.js'
import { fetchUsersNames } from './reducer/userSlice.js'
import { loadUser } from './reducer/authSlice.js'
import setAuthToken from './utils/setAuthToken.js'

store.dispatch(fetchUsersNames());
store.dispatch(fetchFeedbackList());
store.dispatch(fetchBlogList());
store.dispatch(fetchCarServiceList());

// If we have a token, load the user from the token
const token = localStorage.getItem('token');
if(token){
  setAuthToken(token);
  store.dispatch(loadUser());
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
