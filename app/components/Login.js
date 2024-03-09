import { React, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { Link, NavigationContext } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import tw from 'twrnc';
import Footer from './Footer';

function Login() {

  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  function handleSubmit() {
    
  }

  return (
    <View style={tw`flex-1 justify-center items-center bg-green-300`}>
      <Text>UCSB Email</Text>
      <TextInput onChangeText={onChangeEmail} style={tw`bg-white border rounded-lg border-black border-2`} value={email}></TextInput>
      <Text>Password</Text>
      <TextInput secureTextEntry={true} onChangeText={onChangePassword} style={tw`bg-white border rounded-lg border-black border-2`} value={password}></TextInput>
      
      <Button title="Submit" onPress={handleSubmit}></Button>
      
      <Text>Forgot Password?</Text>
      <Text>Don't have an account? <Link style={{color:'blue'}} to={{screen:"Signup"}}>Sign Up</Link></Text>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aqua',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputField: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 50,
    margin: 12,
    padding:10
  },
});

export default Login;