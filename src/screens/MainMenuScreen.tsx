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
import FriendsScreen from './FriendsScreen'
import ProfileScreen from './ProfileScreen'

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
      <ProfileScreen />
    </View>
  )
}

const Friends = ({ navigation }) => {
  return (
    <View style={styles.mainFrame}>
      <View style={styles.headerPanel}>
        <MainMenuHeader navigation={navigation} />
      </View>
      <FriendsScreen />
    </View>
  )
}

/* const Contribute = ({ navigation }) => {
  return (
    <View style={styles.mainFrame}>
      <View style={styles.headerPanel}>
        <MainMenuHeader navigation={navigation} />
      </View>
    </View>
  )
}
 */
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
          headerShown: false,
          drawerActiveTintColor: '#d9bde3', drawerInactiveTintColor: '#f0f0f0'
        }}

        drawerContent={(props) => {
          return (
            <DrawerContentScrollView style={{
                backgroundColor: '#303030',
                borderRightColor: '#202020',
            }} {...props}>
              <DrawerItemList {...props} />
              <DrawerItem
                label="Logout"
                onPress={async () => {
                  await onLogoutPress(mainNavigation)
                }}
                style={{
                   backgroundColor: '#fe6d6a'
                }}
              />
            </DrawerContentScrollView>
          )
        }}
      >
        <Drawer.Screen name="Home" component={HomeMenu} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Friends" component={Friends} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default MainMenuScreen
