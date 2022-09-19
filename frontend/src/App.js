import React, { useEffect } from 'react';
import {Route,Routes} from "react-router-dom";
import './App.css';
import Header from './components/Header';
import Auth from './components/Auth';
import Blogs from './components/Blogs';
import AddBlog from './components/AddBlog';
import UserBlogs from './components/UserBlogs';
import BlogDetail from './components/BlogDetail';
import {useSelector} from "react-redux"
import {useDispatch} from "react-redux";
import { authActions } from './store';


const App = () =>{
  const  isLoggedIn = useSelector(state=>state.isLoggedIn);

  const dispatch = useDispatch();

  useEffect(()=>{
      if(localStorage.getItem('userId')){
          dispatch(authActions.login());
      }
  },[dispatch]);

  return (
    <React.Fragment>
      <header>
        <Header/>
      </header>
      <main>
        <Routes>
          {!isLoggedIn ? 
          <>
          <Route path="/" element={<Auth/>} />
          <Route path="/auth" element={<Auth/>} />
          </>
          :
          <>
          <Route path="/blogs" element={<Blogs/>} />
          <Route path="/blogs/add" element={<AddBlog/>} />
          <Route path="/myBlogs" element={<UserBlogs/>} />
          <Route path="/myBlogs/:id" element={<BlogDetail/>} />
          </>
          }
        </Routes>
      </main>
    </React.Fragment>
)};


export default App;
