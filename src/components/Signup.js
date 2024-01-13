
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
     const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
     const navigate = useNavigate();

     const handleSubmit = async (e) => {
          e.preventDefault();
          const { name, email, password } = credentials
          const response = await fetch("http://localhost:5000/api/auth/createuser", {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json'
               },
               body: JSON.stringify({ name, email, password })
          });
          const json = await response.json()
          console.log(json);
          if (json.success) {
               // Save the auth token and redirect
               localStorage.setItem('token', json.authtoken);
               navigate("/login");
               props.showAlert("signup success", "primary")

          }
          else {
               props.showAlert("invalid credentials ", "danger")
          }
     }

     const onChange = (e) => {
          setCredentials({ ...credentials, [e.target.name]: e.target.value })
     }
     return (

          <div className='my-3 '>
               <h2>SignUp to Continue to Inotebook</h2>
               <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                         <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                         <input type="name" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" />
                    </div>

                    <div className="mb-3">
                         <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                         <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" />
                    </div>

                    <div className="mb-3">
                         <label htmlFor="password" className="form-label">Password</label>
                         <input type="password" className="form-control" id="password" name="password" onChange={onChange} />
                    </div>

                    <div className="mb-3">
                         <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                         <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
               </form>

          </div>
     )
}

export default Signup
