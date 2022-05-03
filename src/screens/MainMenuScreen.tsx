import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet, AsyncStorage, Pressable } from 'react-native'
import CategoryBoard from '../components/CategoryBoard'
import MainMenuHeader from '../components/MainMenuHeader'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList
} from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import 'react-native-gesture-handler'
import { Button, Stack } from 'native-base'
import LeadershipBoard from '../components/LeadershipBoard'

const styles = require('../style')

const Drawer = createDrawerNavigator()

async function onLogoutPress(mainNavigation) {
  await AsyncStorage.clear()
  console.log('logout')
  mainNavigation.navigate('LOGIN')
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

const Logout = ({ navigation }) => {
  return (
    <View style={styles.mainFrame}>
      <View style={styles.headerPanel}>
        <MainMenuHeader navigation={mainNavigation} />
      </View>
    </View>
  )
}

const MainMenuScreen = ({ navigation }) => {
  const mainNavigation = navigation
  const HomeMenu = ({ navigation }) => {
    return (
      <View style={styles.mainFrame}>
        <View style={styles.headerPanel}>
          <MainMenuHeader navigation={navigation} />
        </View>
        <View style={styles.categoryPanel}>
          <CategoryBoard navigation={mainNavigation} />
        </View>
        <View style={styles.leaderPanel}>
          <LeadershipBoard />
        </View>
      </View>
    )
  }
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false
        }}
        drawerContent={(props) => {
          return (
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
              <DrawerItem
                label="Logout"
                onPress={async () => {
                  await onLogoutPress(mainNavigation)
                }}
              />
            </DrawerContentScrollView>
          )
        }}
      >
        <Drawer.Screen name="Home" component={HomeMenu} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Friends" component={Friends} />
        <Drawer.Screen name="Contribute" component={Contribute} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default MainMenuScreen
