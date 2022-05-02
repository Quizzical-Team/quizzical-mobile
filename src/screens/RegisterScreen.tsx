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

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [warningOpacity, setWarningOpacity] = useState(0)
  const [warningMessage, setWarningMessage] = useState(
    'Register information invalid.'
  )

  const register = () => {
    //REGISTER
    return true
  }

  const signup = () => {
    //console.log('SIGN UP')
    if (register()) {
      //GO TO MAIN MENU
      navigation.navigate('MAINMENU')
    } else {
    }
  }

  const emailHandler = (loginEmail) => {
    setEmail(loginEmail)
  }

  const passwordHandler = (loginPassword) => {
    setPassword(loginPassword)
  }

  const goBack = () => {
    navigation.navigate('LOGIN')
  }

  return (
    <LinearGradient colors={['#EE6565', '#FFF2AC']} style={styles.mainScreen}>
      <Pressable style={styles.back} onPress={goBack}>
        <AntDesign name="back" size={36} color="black" />
      </Pressable>
      <Text style={styles.loginText}>REGISTER</Text>
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
        {warningMessage}
      </Text>
      <LoginScreenButton style={styles.signUpButton} press={signup}>
        SIGN UP
      </LoginScreenButton>
    </LinearGradient>
  )
}

export default RegisterScreen
