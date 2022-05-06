import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, Animated } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
let timeouts = []
const RankedTimeBar = ({ currentTime, setTime, duration, gameStatus }) => {
  const [width, setWidth] = useState( new Animated.Value(100))
  const [color, setColor] = useState("#00ff4c")

  const changeWidth = () => {
    Animated.timing(width, {
        toValue: 0,
        duration: duration*1080,
        useNativeDriver: false
    }).start()
  }

  const resetWidth = () => {
    Animated.timing(width, {
      toValue: 100,
      duration:0,
      useNativeDriver: false
  }).start()
  }


  useEffect(()=>{

    if(currentTime/duration>0.9){
      setColor("#00ff4c")
    }else if(currentTime/duration>0.8){
      setColor("#11ff00")
    }else if(currentTime/duration>0.7){
      setColor("#62ff00")
    }else if(currentTime/duration>0.6){
      setColor("#aeff00")
    }else if(currentTime/duration>0.5){
      setColor("#eeff00")
    }else if(currentTime/duration>0.4){
      setColor("#ffdd00")
    }else if(currentTime/duration>0.3){
      setColor("#ffb300")
    }else if(currentTime/duration>0.2){
      setColor("#ff6200")
    }else if(currentTime/duration>0.1){
      setColor("#ff3300")
    }
    else{
      setColor("#ff0400")
    }
    },[currentTime])



  useEffect(() => {
    if (currentTime == duration) {
      resetWidth()
      changeWidth()
      timeouts.forEach((element) => {
        clearTimeout(element)
      })
    }
    if (currentTime > 0) {
      const curTO = setTimeout(() => {
        setTime((currentTime) => currentTime - 1)
      }, 1000)
      timeouts.push(curTO)
    }
  }, [currentTime])

  return (
    <View style={styles.bar}>
      <Text style={styles.countdown}>{currentTime}</Text>
      <Animated.View
        style={[
          styles.innerBar,
          { 
            backgroundColor: color,
            width:  width.interpolate({
            inputRange: [0, 100],
            outputRange: ["0%", "100%"],
          }) }
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  bar: {
    top: 0,
    width: '100%',
    height: '5%',
    justifyContent: 'center'
  },
  innerBar: {
    height: '100%',
    backgroundColor: 'red',
    position: 'absolute'
  },
  countdown: {
    color: 'white',
    textAlign: 'right',
    fontSize: 20,
    fontWeight: 'bold',
    zIndex: 2,
    marginRight: 10
  }
})

export default RankedTimeBar
