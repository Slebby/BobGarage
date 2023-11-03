import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { store } from './store/store.js'
import { Provider } from 'react-redux';
import { fetchFeedbackList } from './reducer/feedbackSlice.js'
import { fetchBlogList } from './reducer/blogSlice.js'
import { fetchCarServiceList } from './reducer/carServiceSlice.js'
import { fetchUsers } from './reducer/userSlice.js'

store.dispatch(fetchFeedbackList());
store.dispatch(fetchBlogList());
store.dispatch(fetchCarServiceList());
store.dispatch(fetchUsers());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
