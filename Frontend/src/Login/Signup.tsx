import axios from "axios";
import React, { useState } from "react"

// interface and type are both same 
interface FormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

type ErrorFormData = Partial<FormData>

const Signup : React.FC = () => {
   
const[ formData , setFormData] = useState<FormData>({
    username: '',  
    email: '',
    password: '',
    confirmPassword: ''
});

const [errors , setErrors] = useState<ErrorFormData>({});
const [successMessage, setSuccessMessage] = useState <string>('');

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,      // Spread the existing form data
      [name]: value     // Update only the field that changed
    });
  };

    const validate = (): boolean => {
        const newErrors: ErrorFormData = {};
        const { username, email, password, confirmPassword } = formData;

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
        if (password !== confirmPassword)
        newErrors.confirmPassword = 'Passwords do not match';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) : Promise<void> =>{
        e.preventDefault();
        try {
            if(validate()){
                console.log('Form data submitted:', formData);
                const response = await axios.post('/api/signin',{
                    formData : formData
                })
                console.log(response.data)
                setSuccessMessage('Signup successful!');
                setErrors({});
             }
        } catch (error) {
            setSuccessMessage('');
        }

  }



  /*
  the name attribute is Refference
  */
console.log(formData)

  return (
   <form  onSubmit={handleSubmit} >
    {successMessage && <p>{successMessage}</p>}

    <label>Name</label>
    <input type="text"  name="username"  value={formData.username} onChange={handleChange}/> 
    {errors.username && <p className="error">{errors.username}</p>}

    <label>Email</label>
    <input type="text"  name="email"  value={formData.email} onChange={handleChange}/> 
    {errors.email && <p className="error">{errors.email}</p>}

    <label>Password</label>
    <input type="password"  name="password"  value={formData.password} onChange={handleChange}/> 
    {errors.password && <p className="error">{errors.password}</p>}
    
    <label>ConfirmPassword</label>
    <input type="password"  name="confirmPassword"  value={formData.confirmPassword} onChange={handleChange}/> 
    {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

    <button type="submit" >Signin</button>
   </form>
  )
}

export default Signup