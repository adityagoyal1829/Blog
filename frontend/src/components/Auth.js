import React, { useState } from 'react';
import {Box,Typography,TextField,Button} from "@mui/material";
import {useDispatch} from "react-redux";
import axios from "axios";
import {authActions} from "../store/index.js";
import {useNavigate} from "react-router-dom";


const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    name:"",email:"",password:""
  });

  const [isSignup, setIsSignUp] = useState(false);

  const handleChange = (e) =>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }

  const sendRequest = async (type="login") =>{
    const res = await axios.post(`http://localhost:5000/api/user/${type}`,{
    name:inputs.name,  
    email: inputs.email,
      password : inputs.password
    }).catch((err) => console.log(err));
   
    const data = await res.data;
    console.log(data);
    return data;
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(inputs);

    if(isSignup){
      sendRequest("signup")
      .then((data)=>localStorage.setItem("userId",data.user._id))
      .then(()=>dispatch(authActions.login()))
      .then(()=>navigate("/blogs"))
      .then(data=>console.log(data))
      
    }else {
      sendRequest()
      .then((data)=>localStorage.setItem("userId",data.user._id))
      .then(()=>dispatch(authActions.login()))
      .then(()=>navigate("/blogs"))
      .then(data=>console.log(data));
    }
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
        <Box 
        maxWidth={400}
        display="flex" flexDirection='column' alignItems="center" justifyContent="center"
        boxShadow={"10px 10px 20px #ccc"}
        padding = {3}
        margin={"auto"}
        marginTop={5}
        borderRadius={5}
        >
          
          <Typography variant="h3" padding={3} textAlign="center" >
          {!isSignup ? "LOGIN" : "SIGN UP"}
          </Typography>
          {isSignup && <TextField name="name" onChange={handleChange} value={inputs.name} placeholder='Enter Name' margin='normal'/>}
          <TextField name="email" onChange={handleChange} value={inputs.email} type={"email"} placeholder='Enter Email' margin='normal'/>
          <TextField name="password" onChange={handleChange} value={inputs.password} type={"password"} placeholder='Enter Password' margin='normal'/>
          
          <Button 
          type="submit"
          variant="contained" sx={{borderRadius:3 , marginTop:3}} color="warning">Submit</Button>
          
          <Button 
          onClick={()=>setIsSignUp(!isSignup)} sx={{borderRadius:3 , marginTop:3}} >
          Change To {isSignup ? "LOGIN" : "SIGNUP"}
          </Button>
        </Box>
        </form>
      </div>
    </>
  )
}

export default Auth;  