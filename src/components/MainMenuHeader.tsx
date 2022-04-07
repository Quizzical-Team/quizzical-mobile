import React from 'react'
import { View, StyleSheet, Pressable, Text, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { loggedInUser } from '../data/authentication'

const MainMenuHeader = () => {
  return (
    <View style={styles.header}>
      <Pressable style={styles.menu}>
        <AntDesign name="menufold" size={36} color="white" />
      </Pressable>
      <View style={styles.userInfo}>
      <Image source={{uri: loggedInUser.picture}}
       style={styles.profile} />
      <Text style={styles.username}>{loggedInUser.name}</Text>
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: '#333E63',
    width: '100%',
    borderBottomEndRadius: 20,
  },
  menu: {
    position: 'absolute',
    top: 50,
    left: 30
  },
  userInfo:{
    paddingTop: "3%",
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row-reverse",
  },
  username:{
      color: "white",
      fontSize: 20,
  },
  profile:{
    height: 60,
    width: 60,
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 60,
    marginHorizontal: 20,
  }
})

export default MainMenuHeader
