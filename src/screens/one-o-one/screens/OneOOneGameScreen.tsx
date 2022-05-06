import React, { useEffect, useState } from 'react'
import {View, Text, StyleSheet, Image, AsyncStorage} from 'react-native'
import OneOOneTimeBar from '../components/OneOOneTimeBar'
import OneOOneQuizPanel from '../components/OneOOneQuizPanel'
import { AntDesign } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'
import { loggedInUser } from '../../../data/authentication'
import {socket} from "../../../server/socket";

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

  const [yourScore, setYourScore] = useState(0)
  const [enemyScore, setEnemyScore] = useState(0)
  const [gameStatus, setGameStatus] = useState(true)
  const [numberArray, setNumberArray] = useState([0, 1, 2, 3])
  const duration = 15
  const [currentTime, setTime] = useState(duration)
  const [currentRound, setCurrentRound] = useState(1)
  const totalRound = 7

  const [isAnswerGiven, setIsAnswerGiven] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [points, setPoints] = useState(0)
  const [isGameGoingOn, setIsGameGoingOn] = useState(true)
  const [user, setUser] = useState("null");
  const questions = route.params.questions;
  const [question, setQuestion] = useState({
    numberArray: [0,1,2,3],
    questionIndex: 0,
    question: route.params.questions[0].questionText,
    answers: [
      { answer: route.params.questions[0].correctAnswer, isTrue: true },
      { answer: route.params.questions[0].distractor1, isTrue: false },
      { answer: route.params.questions[0].distractor2, isTrue: false },
      { answer: route.params.questions[0].distractor3, isTrue: false },
    ]
  })

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

  const shuffle = (answers: Array<any>) => {
    const newAnswersArray = [...answers]

    for (let i = 0; i < question.answers.length; i++) {
      const newIndex = Math.floor(Math.random() * question.answers.length)

      const tempAnswer = newAnswersArray[newIndex]
      newAnswersArray[newIndex] = newAnswersArray[i]
      newAnswersArray[i] = tempAnswer
    }

    // console.log(question.numberArray)
    // console.log(answers)
    // console.log(newAnswersArray)

    return [ ...newAnswersArray ]
  }

  const handleAnswer = (trueness: boolean, timeout: boolean) => {
    if (trueness) {
      setCorrectCount((correctCount) => correctCount + 1);
      setPoints((points) => points + (2 * currentTime));
      setAnswerStatus(CORRECT)
    } else {
      setAnswerStatus(INCORRECT)
    }
    if (timeout) {
      setAnswerStatus(TIMEOUT)
      setDisplayFeedback(true)
      setTimeout(() => {
        setDisplayFeedback(false)
      }, 1000)
      // setTimeout(changeQuestion, 1000)
      return;
    }

    setDisplayFeedback(true)

    setIsAnswerGiven(true);
    socket.emit("answerGivenOneOnOne");
    socket.emit("sendScoreToEnemy", points);
  }

  // @ts-ignore
  useEffect(async () => {
    // @ts-ignore
    AsyncStorage.getItem('username').then((data) => {
      console.log("dataaaa: ", data)
      // @ts-ignore
      setUser(data)
    })

    setCorrectCount(0);
    setPoints(0);

    // @ts-ignore
    setQuestion((prevQuestion) => ({
      answers: shuffle(
          [
            { answer: `questions[prevQuestion.questionIndex + 1].correctAnswer`, isTrue: true},
            { answer: questions[prevQuestion.questionIndex + 1].distractor1, isTrue: false },
            { answer: questions[prevQuestion.questionIndex + 1].distractor2, isTrue: false },
            { answer: questions[prevQuestion.questionIndex + 1].distractor3, isTrue: false },
          ]),

      questionIndex: prevQuestion.questionIndex + 1,
      question: questions[prevQuestion.questionIndex + 1].questionText,
    }))

  }, []);

  const test = () => {
    // @ts-ignore
    setQuestion((prevQuestion) => ({
      answers: shuffle(
          [
            { answer: questions[prevQuestion.questionIndex + 1].correctAnswer, isTrue: true},
            { answer: questions[prevQuestion.questionIndex + 1].distractor1, isTrue: false },
            { answer: questions[prevQuestion.questionIndex + 1].distractor2, isTrue: false },
            { answer: questions[prevQuestion.questionIndex + 1].distractor3, isTrue: false },
          ]),

      questionIndex: prevQuestion.questionIndex + 1,
      question: questions[prevQuestion.questionIndex + 1].questionText,
    }))

    // console.log("given: ", socket.id)

    // * cleanup and iteration before next round
    // setTimeout(() => {
    setDisplayFeedback(false)
    // }, 750);

    setIsAnswerGiven(false)

    setTime(duration)
    setCurrentRound((currentRound: number) => currentRound + 1)
    // console.log('NEXXXT', currentRound)
  }

  useEffect(() => {
    socket.on("getEnemyScore",(pnts) => {
      console.log(`socket: ${socket.id}`, "points of the enemy: ", pnts)

      setEnemyScore(pnts)
    })
  })

  // * [HOOKS]
  useEffect(() => {
    socket.on("bothGiven", test);

    return(() => {socket.close()})
  },[]);

  useEffect(() => {
    if (currentTime == 0 && isGameGoingOn && !isAnswerGiven) {

      setAnswerStatus(TIMEOUT)
      setDisplayFeedback(true)

      socket.emit("answerGivenOneOnOne")
    }
  }, [currentTime, isGameGoingOn])

  if (currentRound >= totalRound + 1 && isGameGoingOn) {

    // console.log("correct count: ", correctCount)
    setIsGameGoingOn(false)
    //TODO add functionality
    socket.emit('endGameStatsOneOnOne', {
      correct: correctCount,
      questionCount: totalRound,
      points: points,
      socketNo: socket.id,
      userN: user
    })

    socket.on("winner", (obj) => {
      let stats = obj.stats;

      stats.forEach((stat, index) => {
        if(stat.socketNo == socket.id){
          navigation.navigate("ONEOONE_STATS", {
            correct: correctCount,
            questionCount: totalRound,
            place: stats.length - index,
            lp: 12,
            rank: "GOLD",
            points: points,
          })
        }
      })
    })

  }

  if (currentTime == 0 && gameStatus) {

  }

  return (
    <View style={styles.frame}>
      <FeedBackFrame trueness={answerStatus} display={displayFeedBack} />
      <OneOOneTimeBar
        currentTime={currentTime}
        setTime={setTime}
        duration={duration}
        gameStatus={isGameGoingOn}
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
          <Text style={styles.score}>{points}</Text>
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
        numberArray={question.numberArray}
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
