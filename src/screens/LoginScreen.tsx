import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable } from 'react-native'
import PrimaryButton from '../components/PrimaryButton';

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
    <View style={styles.mainScreen}>
      <Text style={styles.loginText}>LOG IN</Text>
      <TextInput style={styles.inputs} placeholder="Email" keyboardType="email-address" autoCapitalize='none'></TextInput>
      <TextInput style={styles.inputs} secureTextEntry={true} placeholder="Password"></TextInput>
      <PrimaryButton style={styles.buttons} press={login}>LOG IN</PrimaryButton>
      <PrimaryButton style={styles.buttons} press={signup}>SIGN UP</PrimaryButton>
      <Pressable onPress={forgotPass}><Text>Forgot Password?</Text></Pressable>
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
    backgroundColor: "white",
    margin: 10,
    borderRadius: 40,
    paddingLeft: 30,
  },
  buttons:{
    width: 300,
    height: 60,
    backgroundColor: "black",
    margin: 10,
    borderRadius: 40,
    overflow: "hidden",

  }
})

export default LoginScreen;
