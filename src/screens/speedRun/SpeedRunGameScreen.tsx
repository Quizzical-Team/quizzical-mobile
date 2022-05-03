import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import SpeedRunTimeBar from './SpeedRunTimeBar'
import SpeedRunQuizPanel from './SpeedRunQuizPanel'

const SpeedRunGameScreen = ({ navigation, route }) => {
  const { duration, category } = route.params
  const [timeLeft, setTimeLeft] = useState(duration)
  const [gameStatus, setGameStatus] = useState(true)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [incorrectAnswers, setInCorrectAnswers] = useState(0)
  const gameIsOver = () => {
    setGameStatus(false)
  }


  //console.log(duration)
  //console.log(category)
  return (
    <View style={styles.frame}>
      <SpeedRunTimeBar
        duration={duration}
        navigation={navigation}
        gameStatus={gameStatus}
        gameIsOver={gameIsOver}
        correctAnswers={correctAnswers}
        incorrectAnswers={incorrectAnswers}
        setTimeLeft = {setTimeLeft}
      />
      <SpeedRunQuizPanel
        navigation={navigation}
        time={duration}
        gameStatus={gameStatus}
        gameIsOver={gameIsOver}
        correctAnswers={correctAnswers}
        incorrectAnswers={incorrectAnswers}
        setCorrectAnswers={setCorrectAnswers}
        setInCorrectAnswers={setInCorrectAnswers}
        timeLeft={timeLeft}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    backgroundColor: '#303030'
  }
})

export default SpeedRunGameScreen
