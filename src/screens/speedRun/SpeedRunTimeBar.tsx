import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { View, StyleSheet, Text, Animated } from 'react-native'
import SpeedRunDurationPick from './SpeedRunDurationPick'

const SpeedRunTimeBar = ({
  duration,
  navigation,
  gameStatus,
  gameIsOver,
  correctAnswers,
  incorrectAnswers,
  setTimeLeft
}) => {
  const [currentTime, setTime] = useState(duration)
  const [width, setWidth] = useState( new Animated.Value(100))
  const [color, setColor] = useState("#00ff4c")
  useEffect(() => {
      if(currentTime == duration){
        changeWidth()
      }
    if (currentTime == 0 && gameStatus) {
      navigation.navigate('SPEEDRUN_STATS', {
        correct: correctAnswers,
        time: duration - currentTime
      })
      gameIsOver()
    } else {
      setTimeout(() => {
        setTime((currentTime) => currentTime - 1)
      }, 1000)
    }
    setTimeLeft(currentTime)
  }, [currentTime])

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


  const changeWidth = () => {
    Animated.timing(width, {
        toValue: 0,
        duration: duration*1080,
        useNativeDriver: false
    }).start()
  }
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

export default SpeedRunTimeBar
