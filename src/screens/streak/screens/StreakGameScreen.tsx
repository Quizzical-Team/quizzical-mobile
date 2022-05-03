import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import StreakQuizPanel from '../components/StreakQuizPanel'

const StreakGameScreen = ({ navigation }) => {
  const [gameStatus, setGameStatus] = useState(true)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [incorrectAnswers, setInCorrectAnswers] = useState(0)
  const gameIsOver = () => {
    setGameStatus(false)
  }

  const navigateStatsScreen = (correctCount) => {
    navigation.navigate('STREAK_STATS', {
      correct: correctCount,
    })
  }


  //console.log(duration)
  //console.log(category)
  return (
    <View style={styles.frame}>
      <StreakQuizPanel
        navigation={navigation}
        gameStatus={gameStatus}
        gameIsOver={gameIsOver}
        correctAnswers={correctAnswers}
        incorrectAnswers={incorrectAnswers}
        setCorrectAnswers={setCorrectAnswers}
        setInCorrectAnswers={setInCorrectAnswers}
        navigateStatsScreen={navigateStatsScreen}
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

export default StreakGameScreen
