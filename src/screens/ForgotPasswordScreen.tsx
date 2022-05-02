import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable
} from 'react-native'
import LoginScreenButton from '../components/LoginScreenButton'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign } from '@expo/vector-icons'

const styles = require('../style')

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [warningOpacity, setWarningOpacity] = useState(0)

  const forgotPassword = () => {
    //console.log('RESET PASSWORD')
    //FORGOT PASSWORD

    //NAVIGATE TO LOGIN PAGE
    navigation.navigate('LOGIN')
  }

  const emailHandler = (loginEmail) => {
    setEmail(loginEmail)
  }

  const goBack = () => {
    navigation.navigate('LOGIN')
  }

  return (
    <LinearGradient colors={['#EE6565', '#FFF2AC']} style={styles.mainScreen}>
      <Pressable style={styles.back} onPress={goBack}>
        <AntDesign name="back" size={36} color="black" />
      </Pressable>
      <Text style={styles.loginText}>RESET PASSWORD</Text>
      <TextInput
        style={styles.inputs}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={emailHandler}
      ></TextInput>
      <Text style={[styles.warning, { opacity: warningOpacity }]}>Wrong</Text>
      <LoginScreenButton style={styles.signUpButton} press={forgotPassword}>
        SEND RESET REQUEST
      </LoginScreenButton>
    </LinearGradient>
  )
}

export default ForgotPasswordScreen
