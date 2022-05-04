import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import OneOOneTimeBar from '../components/OneOOneTimeBar'
import OneOOneQuizPanel from '../components/OneOOneQuizPanel'
import { questions } from '../../../data/Questions'
import { AntDesign } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'
import { loggedInUser } from '../../../data/authentication'

let answeredQuestions = []
const CORRECT = 'CORRECT'
const INCORRECT = 'INCORRECT'
const TIMEOUT = 'TIMEOUT'
let rankedClosed = false

const FeedBackFrame = ({ trueness, display }) => {
  //TODO add current ranking
  if (display) {
    if (trueness == CORRECT) {
      return (
        <View
          style={[
            styles.feedBackFrame,
            { backgroundColor: 'rgba(124,252,0,0.1)' }
          ]}
        >
          <AntDesign name={'checkcircle'} size={200} color="green" />
          <Text style={styles.feedBackText}>Correct Answer</Text>
        </View>
      )
    } else if (trueness == INCORRECT) {
      return (
        <View
          style={[
            styles.feedBackFrame,
            { backgroundColor: 'rgba(220,20,60,0.1)' }
          ]}
        >
          <AntDesign name={'closecircle'} size={200} color="red" />
          <Text style={styles.feedBackText}>Wrong Answer</Text>
        </View>
      )
    } else if (trueness == TIMEOUT) {
      return (
        <View
          style={[
            styles.feedBackFrame,
            { backgroundColor: 'rgba(220,20,60,0.1)' }
          ]}
        >
          <AntDesign name={'hourglass'} size={200} color="red" />
          <Text style={styles.feedBackText}>Timeout!</Text>
        </View>
      )
    }
  } else {
    return <View></View>
  }
}

const OneOOneGameScreen = ({ navigation, route }) => {
  const [displayFeedBack, setDisplayFeedback] = useState(false)
  const [answerStatus, setAnswerStatus] = useState(INCORRECT)
  const [question, setQuestion] = useState({
    question: '',
    answers: ['', '', '', '']
  })
  const [yourScore, setYourScore] = useState(0)
  const [enemyScore, setEnemyScore] = useState(0)
  const [gameStatus, setGameStatus] = useState(true)
  const [numberArray, setNumberArray] = useState([0, 1, 2, 3])
  const duration = 15
  const [currentTime, setTime] = useState(duration)
  const [currentRound, setCurrentRound] = useState(1)
  const totalRound = 7

  const restart = () => {
    answeredQuestions = []
    setCurrentRound(1)
    setTime(duration)
    setGameStatus(true)
  }

  if (!useIsFocused()) {
    rankedClosed = true
  }

  if (useIsFocused() && rankedClosed) {
    restart()
    rankedClosed = false
  }

  const changeQuestion = () => {
    const getUnansweredQuestion = () => {
      let randomizeIndices = Array.from(Array(questions.length).keys())
      randomizeIndices = randomizeIndices.filter((number) => {
        return !(answeredQuestions.indexOf(number) > -1)
      })
      randomizeIndices = randomizeIndices.sort(() => Math.random() - 0.5)
      answeredQuestions.push(randomizeIndices[0])
      return questions[randomizeIndices[0]]
    }

    setNumberArray((numberArray) => numberArray.sort(() => Math.random() - 0.5))
    setQuestion(getUnansweredQuestion())
  }

  useEffect(changeQuestion, [])

  const showFeedBack = () => {
    setDisplayFeedback(true)
    setTimeout(() => {
      setDisplayFeedback(false)
    }, 1000)
    setTimeout(changeQuestion, 1000)
  }

  const handleAnswer = (trueness, timeout) => {
    if (trueness) {
      setAnswerStatus(CORRECT)
      const baseScore = 20
      setYourScore((yourScore)=>yourScore+baseScore+currentTime)
    } else {
      setAnswerStatus(INCORRECT)
    }
    if (timeout) {
      setAnswerStatus(TIMEOUT)
    }
    showFeedBack()
    setTime(duration)
    setCurrentRound((currentRound) => currentRound + 1)
  }

  if (currentTime == 0 && gameStatus) {
    handleAnswer(false, true)
  }

  if (currentRound == totalRound + 1 && gameStatus) {
    setGameStatus(false)
    //TODO add functionality
    navigation.navigate('ONEOONE_STATS', {
      correct: 3,
      questionCount: totalRound,
      place: 2,
      lp: 12,
      rank: 'GOLD',
      points: yourScore
    })
  }

  return (
    <View style={styles.frame}>
      <FeedBackFrame trueness={answerStatus} display={displayFeedBack} />
      <OneOOneTimeBar
        currentTime={currentTime}
        setTime={setTime}
        duration={duration}
        gameStatus={gameStatus}
      />
      <Text style={styles.roundCount}>
        {currentRound}/{totalRound}
      </Text>
      <View style={styles.profiles}>
        <View style={styles.profile}>
          <View style={styles.userInfo}>
            <Image
              source={{ uri: loggedInUser.picture }}
              style={[styles.profilePic, {borderColor: "blue"}]}
            />
            <Text style={styles.name}>{"YOU"}</Text>
          </View>
          <Text style={styles.score}>{yourScore}</Text>
        </View>
        <View style={styles.profile}>
          <Text style={styles.score}>{enemyScore}</Text>
          <View style={styles.userInfo}>
            <Image
              source={{ uri: loggedInUser.picture }}
              style={[styles.profilePic, {borderColor: "red"}]}
            />
            <Text style={styles.name}>{"ENEMY"}</Text>
          </View>
        </View>
      </View>
      <OneOOneQuizPanel
        question={question}
        handleAnswer={handleAnswer}
        numberArray={numberArray}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    backgroundColor: '#303030'
  },
  roundCount: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  feedBackFrame: {
    flex: 1,
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  feedBackText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold'
  },
  profiles: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: -25,
  },
  profile: {
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  userInfo: {
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  profilePic: {
    height: 75,
    width: 75,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 100,
    marginHorizontal: 10,
  },
  score: {
    color: "white",
    fontSize: 20,
    paddingBottom: 35,
  },
  name: {
    color: "white",
    fontSize: 20,
  }
})

export default OneOOneGameScreen
