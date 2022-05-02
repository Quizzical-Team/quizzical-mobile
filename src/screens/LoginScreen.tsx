import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable
} from 'react-native'
import LoginScreenButton from '../components/LoginScreenButton'
import { LinearGradient } from 'expo-linear-gradient'
import { connect } from '../server/socket'
import { logInWithUsernamePassword, validateTokenFromStorage } from '../services/userService'

const styles = require('../style')

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [warningOpacity, setWarningOpacity] = useState(0)

  const authentication = async () => 
    await logInWithUsernamePassword(email, password)

  useEffect(() => {
    validateTokenFromStorage().then(
      (response) => {
        if (response) {
          navigation.navigate('MAINMENU');
        }
      }
    )
  }, [])

  const login = () => {
    authentication().then((response) => {
      if (response) {
        connect()
        navigation.navigate('MAINMENU');
        setWarningOpacity(0)
      } else {
        setWarningOpacity(1)
      }
    })
    
  }

  const signup = () => {
    navigation.navigate('REGISTER')
  }

  const forgotPass = () => {
    navigation.navigate('FORGOTPASSWORD')
  }

  const emailHandler = (loginEmail) => {
    setEmail(loginEmail)
  }

  const passwordHandler = (loginPassword) => {
    setPassword(loginPassword)
  }

  return (
    <LinearGradient colors={['#EE6565', '#FFF2AC']} style={styles.mainScreen}>
      <Text style={styles.loginText}>LOGIN</Text>
      <TextInput
        style={styles.inputs}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={emailHandler}
      ></TextInput>
      <TextInput
        style={styles.inputs}
        secureTextEntry={true}
        placeholder="Password"
        onChangeText={passwordHandler}
      ></TextInput>
      <Text style={[styles.warning, { opacity: warningOpacity }]}>
        Wrong email or password
      </Text>
      <LoginScreenButton style={styles.loginButton} press={login}>
        LOGIN
      </LoginScreenButton>
      <LoginScreenButton style={styles.signUpButton} press={signup}>
        SIGN UP
      </LoginScreenButton>
      <Pressable onPress={forgotPass}>
        <Text>Forgot Password?</Text>
      </Pressable>
    </LinearGradient>
  )
}

export default LoginScreen
