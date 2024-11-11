"use client"
import React, { useState } from 'react';
import '../auth.css';
import { ToastContainer, toast } from 'react-toastify';


const SignupPage = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
const handleSignup=async()=>
{
    try{
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/admin/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({  email, password }),
    credentials: 'include'
})
const data =await response.json();
if (data.ok) {
  const data=await response.json();
    console.log('Admin Login Successful', data);
    toast.success('Admin Login Successful'
    //,{
       // position: toast.POSITION.TOP_CENTER,}
       );
window.location.href='/pages/addworkout';
}
else {
    console.error('Admin Login Failed', response.statusText);
    toast.error('Admin Login Failed'
    //,{
      //  position: toast.POSITION.TOP_CENTER,}
      );
}}
catch(error){
    console.error('error Occurred',error);
    toast.error('error occured');}}
    return (
        <div className='formpage'>
         <input
   type='email'
        placeholder="Email"
        value={email}
      

        onChange={(e) => 
          setEmail(e.target.value)}/>
        
        <input
   type='password'
        placeholder="Password"
        value={password}
      

        onChange={(e) => 
          setPassword(e.target.value)}/>
        
    <button onClick={handleSignup}>Sign up</button>
    </div>
    );
        }
export default SignupPage;
