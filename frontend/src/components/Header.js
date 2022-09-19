import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {AppBar,Toolbar,Typography,Box,Button,Tabs,Tab} from "@mui/material"
import {useSelector} from "react-redux"
import {useDispatch} from "react-redux";
import { authActions } from '../store';

const Header = () => {
  const dispatch = useDispatch();
  const  isLoggedIn = useSelector(state=>state.isLoggedIn);
  const [value,setValue] = useState();

  return (
<AppBar
position='sticky' 
sx={{
  background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(116,9,121,1) 34%, rgba(0,212,255,1) 100%);"}}>
  
      <Toolbar>
         <Typography variant="h4">BlogApp</Typography>
        { isLoggedIn && <Box display="flex" marginLeft='auto' marginRight='auto'>
          <Tabs 
          textColor="inherit" value={value} onChange={(e,value)=>setValue(value)}>
            <Tab LinkComponent={Link} to="/blogs" label="All Blogs"/>
            <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs"/>
            <Tab LinkComponent={Link} to="/blogs/add" label="Add Blogs"/>
          </Tabs>
         </Box>
        }
         <Box display="flex" marginLeft="auto">
           {!isLoggedIn && <> <Button 
           LinkComponent={Link} to="/auth"
           variant="contained" sx={{margin:1 , borderRadius:10}} color="warning" > Login </Button>
           <Button 
           LinkComponent={Link} to="/auth"
           variant="contained" sx={{margin:1 , borderRadius:10}} color="warning"> Sign Up </Button>
            </>}
           {isLoggedIn && <Button 
           onClick={()=> dispatch(authActions.logout())}
           LinkComponent={Link} to="/auth"
           variant="contained" sx={{margin:1 , borderRadius:10}} color="warning"> Log Out </Button>
           }
         </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header