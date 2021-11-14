import React, {useEffect, useState} from 'react';
import { Redirect } from "react-router-dom";
import '../css/Login.css';
const axios = require('axios');

const Login = (props) => {
    useEffect(() => {
        document.title = props.title || "";
    }, [props.title]);

    const returnProfile = () => {
        //User profile page
        return (
            <Redirect to="/"/>
        )
    }
    useEffect(() => {
        props.updateUserProfileButton(false);
    }, [props]);
  
    const handleLogin = async e => {
      e.preventDefault()
  
      // get the username and password from the form fields
      const username = e.target.username.value
      const password = e.target.password.value
  
      // send form data to API to authenticate
      const formData = new FormData()
      formData.append("username", username)
      formData.append("password", password)
  
      try {
        // send the request to the server api to authenticate
        const response = await axios({
          method: "post",
          url: "login",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });
        // store the response data into the data state variable
        console.log(response.data);
        props.setUser(response.data);
      } catch (err) {
        throw new Error(err);
      }
    }

    const handleSignUp = async e => {
        e.preventDefault()
    
        // get the username and password from the form fields
        const username = e.target.username.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;

        if(password !== confirmPassword) {
          alert("Passwords must match!");
          return;
        }
    
        try {
          // send the request to the server api to authenticate
          const response = await axios({
            method: "post",
            url: "/signUp",
            data: {
              username: username,
              password: password
            },
          });
          if(response.data.error){
            alert(response.data.message);
          }
          else {
            props.setUser(response.data);
          }
        } catch (err) {
          console.log(err);
        }
      }
    
    const returnLoginOrCreate = () => {
        //Login or Create Account
        return (
            <div>
                <div className="UserProfile">
                    <form className="loginForm" action="/">
                        <input type="submit" value="Continue as Guest" />
                    </form>

                    <h4 className="header4">Login to Existing Account</h4>
        
                    <form className="loginForm" onSubmit={handleLogin}>
                        <label className="formLabel">    
                            <input type="text" placeholder={'Username'} name="username"/>
                        </label>
                        <label className="formLabel">    
                            <input type="password" placeholder={'Password'} name="password"/>
                        </label>
                        <input type="submit" value="Log In" />
                    </form>


                    <h4 className="header4">Create Account</h4>

                    <form className="loginForm" onSubmit={handleSignUp}>
                        <label className="formLabel">    
                            <input type="text" placeholder={'Username'} name="username"/>
                        </label>
                        <label className="formLabel">    
                            <input type="password" placeholder={'Password'} name="password"/>
                        </label>
                        <label className="formLabel">    
                            <input type="password" placeholder={'Confirm Password'} name="confirmPassword"/>
                        </label>
                        <input type="submit" value="Create Account" />
                    </form>
                </div>

                {/* temp button while login unimplemented */}
                <br/>
            </div>
        )
    }
    return(props.user ? returnProfile() : returnLoginOrCreate())
}

export default Login;
