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
      
        <Pressable style={styles.menu} onPress={drawerHandler}>
          <AntDesign name="menufold" size={36} color="#d9d9d9" />
        </Pressable>
        <View style={styles.userInfo}>
          <Image source={{ uri: user.picture }} style={styles.profile} />
          <Text style={styles.username}>{user.name}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerTop: {
    flex: 1,
    width: '100%',
    overflow: "hidden",
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.8)",
    backgroundColor: "#1c1c1c"
  },header: {
    flex: 1,
    width: '100%',
  },
  menu: {
    position: 'absolute',
    top: 30,
    left: 30
  },
  userInfo: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  username: {
    color: '#d9d9d9',
    fontSize: 20,
    fontWeight: "bold",
  },
  profile: {
    height: 50,
    width: 50,
    borderWidth: 3,
    borderColor: '#d9d9d9',
    borderRadius: 60,
    marginHorizontal: 10,
    marginRight: 35,
  }
})

export default MainMenuHeader
