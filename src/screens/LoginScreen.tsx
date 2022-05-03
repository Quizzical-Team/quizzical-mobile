import React, { useEffect, useState } from 'react'
import {
  Text,
  TextInput,
  Pressable,
} from 'react-native'
import LoginScreenButton from '../components/LoginScreenButton'
import { LinearGradient } from 'expo-linear-gradient'
import { connect } from '../server/socket'
import { logInWithUsernamePassword, validateTokenFromStorage } from '../services/userService'

const validator = require('validator')

const styles = require('../style')

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [warningOpacity, setWarningOpacity] = useState(0)

  // * [hooks]
  useEffect(() => {
    validateTokenFromStorage().then(
      (response) => {
        if (response) {
          navigation.navigate('MAINMENU');
        }
      }
    )
  }, [])

  // * [onPress functions]
  const onSignupButtonPress = () => navigation.navigate('REGISTER')
  const onForgotPasswordPress = () => navigation.navigate('FORGOTPASSWORD')

  const onLoginButtonPress = () => {
    logInWithUsernamePassword(username, password)
      .then((response) => {
      if (response) {
        connect()
        navigation.navigate('MAINMENU');
        setWarningOpacity(0)
      } else {
        setWarningOpacity(1)
      }
    })
  }



  return (
    <LinearGradient colors={['#EE6565', '#FFF2AC']} style={styles.mainScreen}>
      <Text style={styles.loginText}>LOGIN</Text>
      <TextInput
        style={styles.inputs}
        placeholder="Email"
        keyboardType="default"
        autoCapitalize="none"
        onChangeText={setUsername}
        />
      <TextInput
        style={styles.inputs}
        secureTextEntry={true}
        placeholder="Password"
        keyboardType='visible-password'
        onChangeText={setPassword}
        />
      <Text style={[styles.warning, {opacity: warningOpacity}]}>Incorrect credentials</Text>
      <LoginScreenButton style={styles.loginButton} onPress={onLoginButtonPress} text="LOGIN" />
      <LoginScreenButton style={styles.signUpButton} onPress={onSignupButtonPress} text="SIGN UP" />
      <Pressable onPress={onForgotPasswordPress}>
        <Text>Forgot Password?</Text>
      </Pressable>
    </LinearGradient>
  )
}

export default LoginScreen
