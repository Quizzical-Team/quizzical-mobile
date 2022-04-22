import { AntDesign } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { questions } from '../../data/Questions'

const SpeedRunQuizPanel = () => {
  const [currentQuestion, setQuestion] = useState(questions[0]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setInCorrectAnswers] = useState(0);

  const AnswerButton = ({ answer }) => {
    return (
      <LinearGradient
        colors={['#656CEE', '#ACB0FF']}
        style={styles.answerButtonOuter}
      >
        <Pressable
          android_ripple={{ color: '#ccc' }}
          style={styles.answerButtonInner}
        >
          <Text style={styles.answerButtonText}>{answer}</Text>
        </Pressable>
      </LinearGradient>
    )
  }

  const AnswerPanel = ({ answers }) => {
    return (
      <View style={styles.answerPanel}>
        <View style={styles.answerRow}>
          <AnswerButton answer={answers[0]} />
          <AnswerButton answer={answers[1]} />
        </View>
        <View style={styles.answerRow}>
          <AnswerButton answer={answers[2]} />
          <AnswerButton answer={answers[3]} />
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
      flexDirection: "row", 
      marginHorizontal: 20,
  },
  statsText: {
    color: 'white',
    fontSize: 40,
    marginHorizontal: 20,
  },
  question: {
    flex: 4,
    textAlign: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlignVertical: 'center',
    justifyContent: "flex-start",
    marginTop: 40,
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
