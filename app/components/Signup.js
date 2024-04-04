import { StyleSheet, Text, TextInput, Button, View } from "react-native";
import React from 'react'
import { useState } from "react";
import tw from 'twrnc';
import Footer from "./Footer";

function Signup() {

  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [confirmPassword, onChangeConfirmPassword] = useState("");

  async function handleSubmit() {
    const mongoose = require('mongoose');
    const info = require('../info.json');
    main().catch(err => console.log(err));
  
    await mongoose.connect(info.connection_string);
    const connection = mongoose.connection;

    let objectID = require('mongodb').ObjectId; // temp
  
    try {
      let user = {
        email: email,
        password: password,
        _id: new objectID()
      }
      connection.collection('login-db').insertOne(user);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <View style={tw`flex-1 justify-center items-center bg-green-300`}>
      <Text>UCSB Email</Text>
      <TextInput onChangeText={onChangeEmail} style={tw`bg-white border rounded-lg border-black border-2`} value={email}></TextInput>
      <Text>Password</Text>
      <TextInput secureTextEntry={true} onChangeText={onChangePassword} style={tw`bg-white border rounded-lg border-black border-2`} value={password}></TextInput>
      <Text>Confirm Password</Text>
      <TextInput secureTextEntry={true} onChangeText={onChangeConfirmPassword} style={tw`bg-white border rounded-lg border-black border-2`} value={confirmPassword}></TextInput>
      <Button title="Sign Up" onPress={handleSubmit}></Button>
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
  }
});

export default Signup;