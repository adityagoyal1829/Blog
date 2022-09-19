import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Box,Typography,TextField,Button,InputLabel} from "@mui/material";
import {useParams} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

const labelStyle = {mb:1,mt:2,fontSize:'24px',fontWeight:"bold"};
const BlogDetail = () => {
    
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    title:"",description:"",imageURL:""
  });

  const handleChange = (e) =>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name] : e.target.value,
    }));
  };
  

  const [blog, setBlog] = useState();

  const id = useParams().id;
  // console.log(id);
  
  const fetchDetails = async() =>{
    const res = await axios
    .get(`http://localhost:5000/api/blog/${id}`)
    .catch((err)=>console.log(err));

    const data = await res.data;
    return data;
  }

  useEffect(() =>{
      fetchDetails()
      .then((data)=>{
        setBlog(data.blog);
        setInputs({
          title:data.blog.title,
          description: data.blog.description,
        })
      });
  },[id]);
  
  const sendRequest = async () =>{
    const res = await axios.put(`http://localhost:5000/api/blog/update/${id}`,{
       title: inputs.title,
       description : inputs.description
    }).catch(err=>console.log(err)) ;

      const data = await res.data;

      return data;
  }
  
  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(inputs); 
    
    sendRequest()
    .then((data)=>console.log(data))
    .then(()=>navigate("../myBlogs/"))
  } 

  // console.log(blog);

  return (
    <div>
        {inputs && (
        <form onSubmit={handleSubmit}>
        <Box border={3}  
        borderColor="linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(116,9,121,1) 34%, rgba(0,212,255,1) 100%);" 
        borderRadius={10} 
        boxShadow="10px 10px 20px #ccc"
        padding={3} margin={"auto"} marginTop={3}
        display="flex"
        flexDirection={"column"}
        width="80%"
        >
          <Typography fontWeight={'bold'} padding={3} color={'grey'}
          variant={"h2"}
          textAlign={"center"}
          >UPDATE YOUR BLOG</Typography>
          <InputLabel sx={labelStyle}>Title</InputLabel>
          <TextField name="title" onChange={handleChange} value={inputs.title} margin='normal' variant='outlined' />
          
          <InputLabel sx={labelStyle}>Description</InputLabel>
          <TextField name="description" onChange={handleChange} value={inputs.description} margin='normal' variant='outlined' />
          
          
          <Button type="submit" sx={{mt:2,borderRadius:4}} variant="contained" color="warning">Submit</Button>
        </Box>
      </form>
      )}
    </div>
  )
}

export default BlogDetail