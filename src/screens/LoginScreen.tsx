import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable } from 'react-native'
import LoginScreenButton from '../components/LoginScreenButton';
import { LinearGradient } from 'expo-linear-gradient';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const login = () => {
    console.log("LOGIN");
  }

  const signup = () => {
    console.log("SIGN UP");
  }

  const forgotPass = () => {
    console.log("pass");
  }

  return (
    <LinearGradient colors={["#EE6565","#FFF2AC"]} style={styles.mainScreen}>
      <Text style={styles.loginText}>LOG IN</Text>
      <TextInput style={styles.inputs} placeholder="Email" keyboardType="email-address" autoCapitalize='none'></TextInput>
      <TextInput style={styles.inputs} secureTextEntry={true} placeholder="Password"></TextInput>
      <LoginScreenButton style={styles.loginButton} press={login}>LOG IN</LoginScreenButton>
      <LoginScreenButton style={styles.signUpButton} press={signup}>SIGN UP</LoginScreenButton>
      <Pressable onPress={forgotPass}><Text>Forgot Password?</Text></Pressable>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  mainScreen: {
    backgroundColor: "black",
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
    backgroundColor: "white",
    margin: 10,
    borderRadius: 40,
    paddingLeft: 30,
  },
  loginButton:{
    width: 300,
    height: 60,
    backgroundColor: "black",
    margin: 10,
    borderRadius: 40,
    overflow: "hidden",
  },
  signUpButton:{
    width: 300,
    height: 60,
    backgroundColor: "#EF5050",
    margin: 10,
    borderRadius: 40,
    overflow: "hidden",
  }
})

export default LoginScreen;
