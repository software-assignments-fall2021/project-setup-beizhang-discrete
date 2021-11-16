import React, {useEffect} from 'react';
import { Redirect } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import { refreshToken } from './utils/refreshToken';
import '../css/Login.css';
const axios = require('axios');

const googleClientId = '863174738597-ddgpkjo6dklvjj60sret1qi6rckc54b4.apps.googleusercontent.com';


const Login = (props) => {

    const onSuccess = (res) => {
      console.log(`Success, current user: `, res.profileObj);
      refreshToken(res)
    }
    const onFailure = (res) => {
      console.log(`Login failed: `, res);
      alert('Invalid login (must be NYU account)')
    }

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
  
      try {
        // send the request to the server api to authenticate
        const response = await axios({
          method: "post",
          url: "/login",
          data: {
            username: username,
            password: password
          },
        });
        if(response.data.auth){
          props.setUser(response.data.user);
        }
        else {
          alert(response.data.message);
        }
      } catch (err) {
        console.log(err);
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
            url: "/register",
            data: {
              username: username,
              password: password
            },
          });
          if(response.data.auth){
            props.setUser(response.data.user);
          }
          else {
            alert(response.data.message);
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

                    <div style={{padding: '3vh'}}>
                      <GoogleLogin
                      clientId={googleClientId}
                      buttonText="Login with Google"
                      onSuccess={onSuccess}
                      onFailure={onFailure}
                      isSignedIn={true}
                      />
                    </div>


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
