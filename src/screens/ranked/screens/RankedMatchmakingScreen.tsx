import { AntDesign } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import * as Progress from 'react-native-progress'
import { socket } from '../../../server/socket'

const RankedMatchmakingScreen = ({navigation}) => {

  const [progress, setTime] = useState(0.0)
  const matchmake = () => {
    //TODO
    
  }

  if(progress<1){
    setTimeout(()=>{setTime(progress=>progress+0.1)},100)
  }

  if(progress>=1){
      navigation.navigate("RANKED_LOADING")
  }
  
  useEffect(()=>{

    // socket.on('gameFound', (res) => {
    //   console.log("found the gaaame ", res);
    //   navigation.navigate("RANKED_LOADING")
    // })
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
