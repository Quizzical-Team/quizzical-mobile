import { AntDesign } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import {View, Text, StyleSheet, AsyncStorage} from 'react-native'
import * as Progress from 'react-native-progress'
import { socket, connect } from '../../../server/socket'
import {getUserWithUsername} from "../../../services/userService";

const RankedMatchmakingScreen = ({navigation}) => {

  const [progress, setTime] = useState(0.0)

  if(progress<1){
    setTimeout(()=>{setTime(progress=>progress+0.1)},100)
  }

  if(progress>=1){
      // navigation.navigate("RANKED_LOADING")
  }
  
  useEffect(()=>{

    // connect();

    // socket.emit("addToQueue");

    // socket.on('gameFound', (res) => {
    //   console.log("found the gaaame ", res);
    //   navigation.navigate("RANKED_LOADING")
    // })

    socket.on("serverToClient", async() => {
      AsyncStorage.getItem('username').then((data) => {
        // console.log("username: ", data)
        return data;
      }).then(async (userName)=>{
        return await getUserWithUsername(userName);
      }).then((user) => {
        // console.log(user)

        if(user === undefined){
          return false;
        }else{
          socket.emit("clientToServer", user);
          return true;
        }
      }).then((gotTheUser) => {
        navigation.navigate("RANKED_LOADING")
      })
    })

  } ,[])
  
  
  return (
    <View style={styles.frame}>
      <AntDesign name="earth" size={250} color="white" />
      <Text style={styles.info}>Looking for players</Text>
      <Progress.Bar progress={progress} width={200} />
    </View>
  )
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    backgroundColor: '#303030',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  info: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    width: '80%',
    marginTop: 30,
    marginBottom: 10,
  },
  spin: {
    textAlign: 'center'
  }
})

export default RankedMatchmakingScreen
