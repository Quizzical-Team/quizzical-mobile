import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  Image,
  AsyncStorage
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

const MainMenuHeader = ({ navigation }) => {
  const [user, setUser] = useState({})

  useEffect(() => {
    console.log('mount')

    AsyncStorage.multiGet(['id', 'username']).then((get) => {
      var obj = {}
      get.forEach((element) => {
        obj[element[0]] = element[1]
      })
      console.log(obj)

      setUser({
        name: obj.username,
        picture: `https://cdn.discordapp.com/embed/avatars/${
          parseInt(obj.id) % 6
        }.png`
      })
    })
  }, [])

  const drawerHandler = () => {
    navigation.openDrawer()
  }
  return (
    <View style={styles.headerTop}>
      <LinearGradient colors={['#fcbe03', '#fc7f03', "#fc4e03"]} style={styles.header}>
        <Pressable style={styles.menu} onPress={drawerHandler}>
          <AntDesign name="menufold" size={36} color="white" />
        </Pressable>
        <View style={styles.userInfo}>
          <Image source={{ uri: user.picture }} style={styles.profile} />
          <Text style={styles.username}>{user.name}</Text>
        </View>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  headerTop: {
    flex: 1,
    width: '100%',
    borderBottomEndRadius: 20,
    overflow: "hidden",
    borderBottomWidth: 3,
    borderColor: "black"
  },header: {
    flex: 1,
    width: '100%',
  },
  menu: {
    position: 'absolute',
    top: 37,
    left: 30
  },
  userInfo: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse'
  },
  username: {
    color: 'white',
    fontSize: 20
  },
  profile: {
    height: 60,
    width: 60,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 60,
    marginHorizontal: 20
  }
})

export default MainMenuHeader
