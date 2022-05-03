import { AntDesign } from '@expo/vector-icons'
import { NavigationRouteContext } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { questions } from '../../data/Questions'

let answeredQuestions = []
let currentQuestion

const getUnansweredQuestion = () => {
  let randomizeIndices = Array.from(Array(questions.length).keys())
  randomizeIndices = randomizeIndices.filter((number) => {
    return !(answeredQuestions.indexOf(number) > -1)
  })
  randomizeIndices = randomizeIndices.sort(() => Math.random() - 0.5)
  answeredQuestions.push(randomizeIndices[0])
  return questions[randomizeIndices[0]]
}

const SpeedRunQuizPanel = ({
  navigation,
  time,
  gameStatus,
  gameIsOver,
  correctAnswers,
  setCorrectAnswers,
  incorrectAnswers,
  setInCorrectAnswers,
  timeLeft,
}) => {
  const [currentQuestion, setQuestion] = useState({ question: '', answers: [] })
  const [gameStarted, setGameStarted] =  useState(false)
  
  if (!gameStarted) {
    setGameStarted(true)
    //console.log("GAME STARTED")
    setQuestion(getUnansweredQuestion())
  }

  const handleAnswer = (trueness) => {
    if (trueness) {
      setCorrectAnswers((correctAnswers) =>
        setCorrectAnswers(correctAnswers + 1)
      )
    } else {
      setInCorrectAnswers((incorrectAnswers) =>
        setInCorrectAnswers(incorrectAnswers + 1)
      )
    }
    //console.log(answeredQuestions)
    if (questions.length == answeredQuestions.length || incorrectAnswers >= 2) {
      gameIsOver()
      answeredQuestions = []
      navigation.navigate('SPEEDRUN_STATS', {
        correct: correctAnswers,
        time: timeLeft
      })
    } else {
      setQuestion(getUnansweredQuestion)
    }
  }

  const AnswerButton = ({ answer, trueness }) => {
    return (
      <LinearGradient
        colors={['#656CEE', '#ACB0FF']}
        style={styles.answerButtonOuter}
      >
        <Pressable
          android_ripple={{ color: '#ccc' }}
          style={styles.answerButtonInner}
          onPress={() => {
            handleAnswer(trueness)
          }}
        >
          <Text style={styles.answerButtonText}>{answer}</Text>
        </Pressable>
      </LinearGradient>
    )
  }

  const AnswerPanel = ({ answers }) => {
    var numberArray = [0, 1, 2, 3]
    numberArray = numberArray.sort(() => Math.random() - 0.5)
    return (
      <View style={styles.answerPanel}>
        <View style={styles.answerRow}>
          <AnswerButton
            answer={answers[numberArray[0]]}
            trueness={numberArray[0] == 0}
          />
          <AnswerButton
            answer={answers[numberArray[1]]}
            trueness={numberArray[1] == 0}
          />
        </View>
        <View style={styles.answerRow}>
          <AnswerButton
            answer={answers[numberArray[2]]}
            trueness={numberArray[2] == 0}
          />
          <AnswerButton
            answer={answers[numberArray[3]]}
            trueness={numberArray[3] == 0}
          />
        </View>
      </View>
    )
  }

  return (
    <View style={styles.quiz}>
      <View style={styles.stats}>
        <View style={styles.statsInner}>
          <AntDesign name="checkcircle" size={50} color="green" />
          <Text style={styles.statsText}>{correctAnswers}</Text>
        </View>
        <View style={styles.statsInner}>
          <Text style={styles.statsText}>{incorrectAnswers}</Text>
          <AntDesign name="closecircle" size={50} color="red" />
        </View>
      </View>
      <View style={styles.question}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
      </View>
      <AnswerPanel answers={currentQuestion.answers} />
    </View>
  )
}

const styles = StyleSheet.create({
  quiz: {
    flex: 1
  },
  stats: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlignVertical: 'center',
    justifyContent: 'space-between'
  },
  statsInner: {
    flexDirection: 'row',
    marginHorizontal: 20
  },
  statsText: {
    color: 'white',
    fontSize: 40,
    marginHorizontal: 20
  },
  question: {
    flex: 4,
    textAlign: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlignVertical: 'center',
    justifyContent: 'flex-start',
    marginTop: 40
  },
  questionText: {
    color: 'white',
    alignItems: 'center',
    fontSize: 40,
    fontWeight: 'bold'
  },
  answerPanel: {
    flex: 2,
    margin: 10
  },
  answerRow: {
    flexDirection: 'row',
    flex: 1
  },
  answerButtonOuter: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: 'blue',
    margin: 5
  },
  answerButtonInner: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center'
  },
  answerButtonText: {
    color: 'white',
    fontWeight: 'bold',
    alignItems: 'center'
  }
})

export default SpeedRunQuizPanel
