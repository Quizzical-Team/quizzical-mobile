import { getRandomString } from 'native-base/lib/typescript/theme/tools'
import React, { useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { loggedInUser, enemies } from '../../../data/authentication'

const OneOOneLoadingScreen = ({ navigation }) => {
  //TODO ENEMIES

  const startGame = () => {
    navigation.navigate('ONEOONE_GAME', {
      restart: true
    })
  }

  setTimeout(startGame,2000)

  return (
    <View style={styles.frame}>
      <Text style={styles.title}>One-o-One</Text>
      <Image source={{ uri: loggedInUser.picture }} style={styles.profile} />
      <Text style={[styles.text, { color: 'blue' }]}>YOU</Text>
      <Text style={[styles.text]}>VS</Text>
      <Text style={[styles.text, { color: 'red' }]}>{"ENEMY NAME"}</Text>
      <Image source={{ uri: loggedInUser.picture }} style={styles.enemyProfile} />
    </View>
  )
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    backgroundColor: '#303030',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  title: {
    fontSize: 50,
    color: 'white',
    marginTop: 50
  },
  profile: {
    height: 150,
    width: 150,
    borderWidth: 3,
    borderColor: 'blue',
    borderRadius: 100,
    marginHorizontal: 20,
    marginTop: 100
  },
  enemyProfile: {
    height: 150,
    width: 150,
    borderWidth: 3,
    borderColor: 'red',
    borderRadius: 100,
    marginHorizontal: 20,
  },
  text: {
    fontSize: 50,
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 30
  },
  enemies: {
    flexDirection: 'row',
    marginTop: 10
  },
  enemy: {
    height: 40,
    width: 40,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 100,
    marginHorizontal: 5
  }
})

export default OneOOneLoadingScreen
