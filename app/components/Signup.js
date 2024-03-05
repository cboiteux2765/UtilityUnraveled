import { Button } from "react-native";
import React from 'react'

const Signup = () => {
  return (
    <div>
      <input value="UCSB Email"></input>
      <input value="Password"></input>
      <input value="Confirm Password"></input>
      <Button title="Sign Up"></Button>
    </div>
  );
}

export default Signup;