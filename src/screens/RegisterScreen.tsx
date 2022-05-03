import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
  Alert
} from 'react-native'
import LoginScreenButton from '../components/LoginScreenButton'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign } from '@expo/vector-icons'
import { registerWithUsernameEmailPassword } from '../services/userService'

const styles = require('../style')

const validator = require('validator')

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [warningOpacity, setWarningOpacity] = useState(0)

  function onSignupButtonPress() {
    if (validator.isEmail(email)) {
      registerWithUsernameEmailPassword(username, email, password).then((response) => {
        if (response) {
          setWarningOpacity(0)
          navigation.navigate('LOGIN')
        } else
          setWarningOpacity(1)
      })   
    } else {
      setWarningOpacity(1)
    }
  }

  const onEmailChange = (_email: string) => {
    setEmail(_email.trim())
  }

  const onUsernameChange = (_username: string) => {
    setUsername(_username.trim())
  }

  const onPasswordChange = (_password: string) => {
    setPassword(_password.trim())
  }

  const onGoBackButtonPress = () => {
    navigation.navigate('LOGIN')
  }

  return (
    <LinearGradient colors={['#EE6565', '#FFF2AC']} style={styles.mainScreen}>
      <Pressable style={styles.back} onPress={onGoBackButtonPress}>
        <AntDesign name="back" size={36} color="black" />
      </Pressable>
      <Text style={styles.loginText}>REGISTER</Text>
      <TextInput
        style={styles.inputs}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={onEmailChange}
        />
      <TextInput
        style={styles.inputs}
        placeholder="Username"
        keyboardType="default"
        autoCapitalize="none"
        onChangeText={onUsernameChange}
        />
      <TextInput
        style={styles.inputs}
        secureTextEntry={true}
        placeholder="Password"
        onChangeText={onPasswordChange}
        />
      <Text style={[styles.warning, { opacity: warningOpacity }]}>
        This user already exists
      </Text>
      <LoginScreenButton style={styles.signUpButton} onPress={onSignupButtonPress} text="SIGN UP" />
    </LinearGradient>
  )
}

export default RegisterScreen
