import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import CatagoryBoard from '../components/CatagoryBoard'
import MainMenuHeader from '../components/MainMenuHeader'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import 'react-native-gesture-handler'

const Drawer = createDrawerNavigator()

const HomeMenu = ({ navigation }) => {
  return (
    <View style={styles.mainFrame}>
      <View style={styles.headerPanel}>
        <MainMenuHeader navigation={navigation} />
      </View>
      <View style={styles.catagoryPanel}>
        <CatagoryBoard />
      </View>
    </View>
  )
}

const Profile = ({ navigation }) => {
  return (
      <View style={styles.mainFrame}>
        <View style={styles.headerPanel}>
          <MainMenuHeader navigation={navigation} />
        </View>
      </View>
  )
}

const Friends = ({ navigation }) => {
    return (
        <View style={styles.mainFrame}>
          <View style={styles.headerPanel}>
            <MainMenuHeader navigation={navigation} />
          </View>
        </View>
    )
  }

const Contribute = ({ navigation }) => {
  return (
      <View style={styles.mainFrame}>
        <View style={styles.headerPanel}>
          <MainMenuHeader navigation={navigation} />
        </View>
      </View>
  )
}

const MainMenuScreen = ({ navigation }) => {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName="Home"
      >
        <Drawer.Screen name="Home" component={HomeMenu} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Friends" component={Friends} />
        <Drawer.Screen name="Contribute" component={Contribute} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  mainFrame: {
    flex: 1
  },
  headerPanel: {
    height: '15%',
    marginBottom: 30
  },
  catagoryPanel: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  drawer: {
    backgroundColor: '#333E63'
  }
})

export default MainMenuScreen
