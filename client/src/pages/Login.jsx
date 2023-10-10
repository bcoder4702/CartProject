import styled from "styled-components";
import { mobile } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Box, Button, TextField, Typography } from "@material-ui/core";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      axios
        .post("auth/login", {
          email: email,
          password: password,
        })
        .then((res) => {
          localStorage.clear();
          // console.log("token", res.data.accessToken);
          localStorage.setItem("token", res.data.accessToken);
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
        maxWidth={400}
        display="flex" flexDirection={'column'} 
        alignItems='center' 
        justifyContent={'center'}
        boxShadow= "10px 10px 20px #ccc"
        padding={3}
        margin= "auto"
        marginTop={5}
        borderRadius={5} >
          <Typography variant='h3' padding={3} textAlign='center'>{"Login"}</Typography>
          <TextField name='email' onChange={(e) => setEmail(e.target.value)} value={email} type={'email'} placeholder='Email' margin='normal' />
          <TextField name='password' onChange={(e) => setPassword(e.target.value)} value={password} type={'password'} placeholder='Password' margin='normal' />
          <Button sx={{marginTop:3,marginBottom:3}} variant='contained' color='warning' type='submit'>Submit</Button>
          <Button onClick={() => navigate("/register")}>CREATE A NEW ACCOUNT</Button>
        </Box>
      </form>
    </div>
  );
};

export default Login;
