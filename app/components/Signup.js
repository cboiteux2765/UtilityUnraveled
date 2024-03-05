import { StyleSheet, Text, TextInput, Button, View } from "react-native";
import React from 'react'
import { useState } from "react";

function Signup() {

  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [confirmPassword, onChangeConfirmPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text>UCSB Email</Text>
      <TextInput onChangeText={onChangeEmail} style={styles.inputField} value={email}></TextInput>
      <Text>Password</Text>
      <TextInput secureTextEntry={true} onChangeText={onChangePassword} style={styles.inputField} value={password}></TextInput>
      <Text>Confirm Password</Text>
      <TextInput secureTextEntry={true} onChangeText={onChangeConfirmPassword} style={styles.inputField} value={confirmPassword}></TextInput>
      <Button title="Sign Up"></Button>
    </View>
  );
}

function handlePress() {

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

export default Signup;