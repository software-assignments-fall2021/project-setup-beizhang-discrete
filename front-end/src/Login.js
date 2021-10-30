import Button from '@restart/ui/esm/Button';
import React, {useEffect, useState} from 'react';
import { Redirect } from "react-router-dom";
import './Login.css';
const axios = require('axios');

const Login = (props) => {
    useEffect(() => {
        document.title = props.title || "";
    }, [props.title]);

    const returnProfile = () => {
        //User profile page
        return (
            <Redirect to="/user"/>
        )
    }
    useEffect(() => {
        props.updateUserProfileButton(false);
    }, [props]);

    // create state variables to hold username and password
    const [status, setStatus] = useState({});
  
    useEffect(() => {
      // if the login was a success, call the setUser function that was passed to this component as a prop
      if (status.success) {
        console.log(`User successfully logged in: ${status.username}`);
        props.setUser(status);
      }
    }, [status]);
  
    const handleSubmit = async e => {
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
          url: "https://my.api.mockaroo.com/login.json?key=1e756d10",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });
        // store the response data into the data state variable
        console.log(response.data);
        setStatus(response.data);
      } catch (err) {
        throw new Error(err);
      }
    }

    const handleCreate = async e => {
        e.preventDefault()
    
        // get the username and password from the form fields
        const username = e.target.username.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.password.confirmPassword;
    
        // send form data to API to authenticate
        const formData = new FormData()
        formData.append("username", username)
        formData.append("password", password)
        formData.append("confirmPassword", confirmPassword)
    
        try {
          // send the request to the server api to authenticate
          const response = await axios({
            method: "post",
            url: "https://my.api.mockaroo.com/createAccount.json?key=1e756d10",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
          });
          // store the response data into the data state variable
          console.log(response.data);
          setStatus(response.data);
        } catch (err) {
          throw new Error(err);
        }
      }
    
    const returnLoginOrCreate = () => {
        //Login or Create Account
        return (
            <div>
                <div className="UserProfile">
                    <p>
                        <br />
                        Server response (for debugging purposes):
                        <br />
                        Login successful: {status.success ? "True" : "False"} 
                        <br />
                        {JSON.stringify(status, null, 2)}
                    </p>
                    
                    <h4 className="header4">Login to Existing Account</h4>
        
                    <form className="loginForm" onSubmit={handleSubmit}>
                        <label className="formLabel">    
                            <input type="text" placeholder={'Username'} name="username"/>
                        </label>
                        <label className="formLabel">    
                            <input type="password" placeholder={'Password'} name="password"/>
                        </label>
                        <input type="submit" value="Log In" />
                    </form>


                    <h4 className="header4">Create Account</h4>

                    <form className="loginForm" onSubmit={handleCreate}>
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
    return(!status.success ? returnLoginOrCreate() : returnProfile())
}

export default Login;
