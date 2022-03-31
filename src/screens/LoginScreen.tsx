import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import PrimaryButton from '../components/PrimaryButton';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  return (
    <View style={styles.mainScreen}>
      <Text style={styles.loginText}>LOG IN</Text>
      <TextInput style={styles.inputs} placeholder="Email"></TextInput>
      <TextInput style={styles.inputs} placeholder="Password"></TextInput>
      <PrimaryButton style={styles.buttons}>LOG IN</PrimaryButton>
      <PrimaryButton style={styles.buttons}>SIGN UP</PrimaryButton>
      <Text>Forgot Password?</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainScreen: {
    backgroundColor: "yellow",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText:{
    textAlign: "center",
    fontSize: 40,
  },
  inputs:{
    width: 300,
    height: 60,
    borderColor: "black",
    backgroundColor: "white",
    margin: 10,
    borderRadius: 40,
    paddingLeft: 30,
  },
  buttons:{
    width: 300,
    height: 60,
    borderColor: "black",
    backgroundColor: "black",
    margin: 10,
    borderRadius: 40,
  }
})

export default LoginScreen;
