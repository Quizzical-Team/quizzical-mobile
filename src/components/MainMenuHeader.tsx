import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, StyleSheet, Pressable, Text, Image, AsyncStorage } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

const MainMenuHeader = ({navigation}) => {
  const [user, setUser] = useState({})

  useEffect(() => {
    console.log('mount');
  
    AsyncStorage.multiGet(['id', 'username']).then((get) => {
      var obj = {};
      get.forEach(element => {
        obj[element[0]] = element[1]
      });
      console.log(obj);
      

      setUser({
        name: obj.username,
        picture: `https://cdn.discordapp.com/embed/avatars/${parseInt(obj.id)%6}.png`
      })
    })
  }, [])  

  const drawerHandler = () => {
      navigation.openDrawer();
  }
  return (
    <LinearGradient colors={['black', '#1f1f1f','#242424','#4f4f4f','#e8e8e8']} style={styles.header}>
      <Pressable style={styles.menu} onPress={drawerHandler}>
        <AntDesign name="menufold" size={36} color="white" />
      </Pressable>
      <View style={styles.userInfo}>
      <Image source={{uri: user.picture}}
       style={styles.profile} />
      <Text style={styles.username}>{user.name}</Text>
      </View>
      
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    width: '100%',
    borderBottomEndRadius: 20,
  },
  menu: {
    position: 'absolute',
    top: 50,
    left: 30
  },
  userInfo:{
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row-reverse",
    paddingBottom: 15,
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
