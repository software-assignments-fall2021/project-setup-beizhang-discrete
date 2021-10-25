import Button from '@restart/ui/esm/Button';
import React, {useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom';
import './LogIn.css';
import UserProfile from './UserProfile';

const LogIn = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [user, setUser] = useState(false)
    
    useEffect(() => {
        //Check if user is already logged in here and assign to user
        // user logged in? setUser(true) else setUser(false) 
        // setUser(true)
        document.title = props.title || "";
    }, [props.title]);

    const returnProfile = () => {
        //User profile page
        return (
            <UserProfile title="User Page | All In Poker"/>
        )
    }

    const returnLoginOrCreate = () => {
        //Login or Create Account
        return (
            <div>
                <div className="UserProfile" style={{alignItems: 'center', textAlign: 'center'}}>
                    <h4 style={{color: 'white', margin: '6vh'}}>Login to Existing Account</h4>
        
                    <form style={{display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '6vh'}}>
                        <label style={{padding: '10px'}}>    
                            <input type="text" placeholder={'Email'} onChange = {change => setEmail(change.target.value)}/>
                        </label>
                        <label style={{padding: '10px'}}>    
                            <input type="password" placeholder={'Password'} onChange = {change => setPassword(change.target.value)}/>
                        </label>
                    </form>
                    <Button onClick={() => {handleLogin(email, password)}}>Login</Button>
                    <h4 style={{color: 'white', margin: '6vh'}}>Create Account</h4>
        
                    <form style={{display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '3vh'}}>
                        <label style={{padding: '10px'}}>    
                            <input type="text" placeholder={'Email'} onChange = {change => setEmail(change.target.value)}/>
                        </label>
                        <label style={{padding: '10px'}}>    
                            <input type="password" placeholder={'Password'} onChange = {change => setPassword(change.target.value)}/>
                        </label>
                        <label style={{padding: '10px'}}>    
                            <input type="password" placeholder={'Confirm Password'} onChange = {change => setConfirmPassword(change.target.value)}/>
                        </label>
                    </form>
                    <Button onClick={() => {handleCreate(email, password, confirmPassword)}}>Create Account</Button>
                </div>

                <a href='/userprofile'>
                    <Button>See User Profile</Button>
                </a>

            </div>

        )
    }
    
    return(!user ? returnLoginOrCreate() : returnProfile())

}

const handleLogin = (email, password) => {
    // Submit to backend server here
    alert(`Logging in with ${email}:${password}`)
}

const handleCreate = (email, password, confirmPassword) => {
    //Do validation logic on password == confirmPassword, valid email, etc
    //Submit new account request to backend here

    alert(`Creating account with ${email}:${password}`)
}
export default LogIn;
