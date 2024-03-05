import { React, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Link, NavigationContext } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function Login() {

  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");

  return (
    <View style={styles.container}>
      <Text>UCSB Email</Text>
      <TextInput onChangeText={onChangeEmail} style={styles.inputField} value={email}></TextInput>
      <Text>Password</Text>
      <TextInput secureTextEntry={true} onChangeText={onChangePassword} style={styles.inputField} value={password}></TextInput>
      <Text>Forgot Password?</Text>
      <Text>Don't have an account? <Link style={styles.link} to={{screen:"Signup"}}>Sign Up</Link></Text>
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
  link: {
    color:'red'
  }
});

export default Login;