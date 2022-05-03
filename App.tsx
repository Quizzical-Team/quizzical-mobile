import { StatusBar } from 'expo-status-bar'
import { AsyncStorage, StyleSheet, Text, View } from 'react-native'
import LoginScreen from './src/screens/LoginScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RegisterScreen from './src/screens/RegisterScreen'
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen'
import MainMenuScreen from './src/screens/MainMenuScreen'
import SpeedRunScreen from './src/screens/speedRun/SpeedRunScreen'
import RankedScreen from './src/screens/ranked/screens/RankedScreen'
import React from 'react'
import StreakScreen from './src/screens/streak/screens/StreakScreen'
import OneOOneScreen from './src/screens/one-o-one/screens/OneOOneScreen'

const Stack = createNativeStackNavigator()
export default function App() {
  return (
    <>
      <StatusBar style="auto" hidden/>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: "fade",
            gestureEnabled: false
          }}
        >
          <Stack.Screen
            name="LOGIN"
            component={LoginScreen} />
          <Stack.Screen
            name="REGISTER"
            component={RegisterScreen} />
          <Stack.Screen
            name="FORGOTPASSWORD"
            component={ForgotPasswordScreen} />
          <Stack.Screen
            name="MAINMENU"
            component={MainMenuScreen} />
          <Stack.Screen
            name="SPEEDRUN"
            component={SpeedRunScreen} />
          <Stack.Screen
            name="RANKED"
            component={RankedScreen} />
            <Stack.Screen
            name="STREAK"
            component={StreakScreen} />
            <Stack.Screen
            name="ONEOONE"
            component={OneOOneScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}
