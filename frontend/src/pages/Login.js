import { useState } from "react"

const Login = ()=>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const submitHandler = async (e)=>{
        e.preventDefault()
        console.log(email,password)
    }
    return (
        <form className ="login" onSubmit={submitHandler}>
            <h2>Log In</h2>
            <label>Email:</label>
            <input
            type = "email"
            autoComplete= "off"
            onChange={(e)=> setEmail(e.target.value)}
            value={email}
            />
            <label>Password:</label>
            <input
            type ="password"
            autoComplete= "off"
            onChange={(e)=> setPassword(e.target.value)}
            value={password} 
            />

            <button>Login</button>
        </form>
    )
};


export default Login

