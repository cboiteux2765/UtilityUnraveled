import React from 'react';

const Login = () => {
  return (
    <div>
        <input value="UCSB Email"></input>
        <input value="Password"></input>
        <Link><Text>Forgot Password?</Text></Link>
        <Text>Don't have an account? <Link>Sign Up</Link></Text>
    </div>
  );
}

export default Login;