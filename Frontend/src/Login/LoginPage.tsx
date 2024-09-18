import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {  useStateContext } from "../CustomHook/ContextProvider";

interface user{
    username: string;
    email: string;
    password: string;
}

type ErrorFormData = Partial<user>

const LoginPage = () => {

 
    const[formData , setFormData] = useState<user>({
        username : '',
        email: '',
        password : ''
    })

    const[error , setErrors] =useState<ErrorFormData>({})
    const [successMessage , setSuccessMessage] = useState<string>('');

    const { setUser , user } = useStateContext();

    const validate = (): boolean => {
      const newErrors: ErrorFormData = {};
      const { username, email, password } = formData;

      // Validate username
      if (!username.trim()) newErrors.username = 'Username is required';

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) newErrors.email = 'Email is required';
      else if (!emailRegex.test(email)) newErrors.email = 'Email is not valid';

      // Validate password length and confirmation
      if (!password) newErrors.password = 'Password is required';
      else if (password.length < 6)
      newErrors.password = 'Password must be at least 6 characters long';

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
  };

    // yar is ki ik generic fill bana lata hain
    const Handlechange = (e: React.ChangeEvent<HTMLInputElement> ) =>{
      const { name , value } = e.target;
      setFormData({
        ...formData,
        [name] : value
      })
    };
    

    const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>)  =>{
      e.preventDefault();
      try {
        if(validate()){
          const Response  = await axios.post('/api/signin/login',
            formData
          );
          //console.log(Response.data.message)
          setUser(Response.data.message)
          setSuccessMessage("Login successfull!")
          setErrors({});
        }
      } catch (error : any) {
        setSuccessMessage(error.response.data.message)
      }
    }

console.log(user)

    const navigate = useNavigate();
    
    const gotoSignIn = () =>{
      navigate('/signin')
    }


  return (
    <form onSubmit={HandleSubmit}>
      {successMessage && <p>{successMessage}</p>}
        <label>Name</label>
        <input type="text" name="username" value={formData.username} onChange={Handlechange} />   
        {error.username && <p className="error">{error.username}</p>}

        <label>Email</label> 
        <input type="text" name="email" value={formData.email} onChange={Handlechange} />
        {error.email && <p className="error">{error.email}</p>}

        <label>Password</label>
        <input type="password" name="password" value={formData.password} onChange={Handlechange} />
        {error.password && <p className="error">{error.password}</p>}

        <button type="submit">Login</button>
        <button type="button" onClick={gotoSignIn}>SignUp</button>
    </form>
  )
}

export default LoginPage