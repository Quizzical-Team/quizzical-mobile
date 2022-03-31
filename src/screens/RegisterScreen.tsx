import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable } from 'react-native'
import LoginScreenButton from '../components/LoginScreenButton';
import { LinearGradient } from 'expo-linear-gradient';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [warningOpacity, setWarningOpacity] = useState(0);

  const authentication = () => {
    if(email=="johndoe" && password=="abc"){
      return true;
    }
    return false;
  }

  const login = () => {
    if(authentication()){
      console.log("LOGGED IN")

      setWarningOpacity(0);
    }
    else{
      setWarningOpacity(1);
    }
  }

  const signup = () => {
    console.log("SIGN UP");
  }

  const forgotPass = () => {
    console.log("pass");
  }

  const emailHandler = (loginEmail) => {
    setEmail(loginEmail);
  }

  const passwordHandler = (loginPassword) => {
    setPassword(loginPassword)
  }

  return (
    <LinearGradient colors={["#EE6565","#FFF2AC"]} style={styles.mainScreen}>
      <Text style={styles.loginText}>REGISTER</Text>
      <TextInput style={styles.inputs} placeholder="Email" keyboardType="email-address" autoCapitalize='none' onChangeText={emailHandler}></TextInput>
      <TextInput style={styles.inputs} secureTextEntry={true} placeholder="Password" onChangeText={passwordHandler}></TextInput>
      <Text style={[styles.warning, {opacity: warningOpacity}]}>Wrong email or password</Text>
      <LoginScreenButton style={styles.signUpButton} press={signup}>SIGN UP</LoginScreenButton>
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
  warning:{
    color: "darkred",
    opacity: 0,
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
    margin: 5,
    borderRadius: 40,
    overflow: "hidden",
  },
  signUpButton:{
    width: 300,
    height: 60,
    backgroundColor: "#EF5050",
    margin: 5,
    borderRadius: 40,
    overflow: "hidden",
  }
})

export default RegisterScreen;
