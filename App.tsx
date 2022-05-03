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

const styles = require('./src/style')

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
          }}
        >
          
          <Stack.Screen name="MAINMENU" component={MainMenuScreen} />
          <Stack.Screen name="SPEEDRUN" component={SpeedRunScreen} />
          <Stack.Screen name="RANKED" component={RankedScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}
