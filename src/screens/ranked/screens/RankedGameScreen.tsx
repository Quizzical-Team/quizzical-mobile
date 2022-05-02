import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, _View } from 'react-native'
import RankedTimeBar from '../components/RankedTimeBar'
import RankedQuizPanel from '../components/RankedQuizPanel'
import { questions } from '../../../data/Questions'
import { AntDesign } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'
import {socket} from "../../../server/socket";
import {io} from "socket.io-client";

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
      );
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
      );
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
      );
    }
  } else {
    return (<View></View>);
  }
}

const RankedGameScreen = ({navigation, route}) => {
  const [displayFeedBack, setDisplayFeedback] = useState(false)
  const [answerStatus, setAnswerStatus] = useState(INCORRECT)
  const [question, setQuestion] = useState({
    question: '',
    answers: ['', '', '', '']
  })
  const [gameStatus, setGameStatus] = useState(true)
  const [numberArray, setNumberArray] = useState([0, 1, 2, 3])
  const duration = 5
  const [currentTime, setTime] = useState(duration)
  const [currentRound, setCurrentRound] = useState(1)
  const totalRound = 7
  // const [socket, setSocket] = useState(io(""));

  const restart = () => {
    answeredQuestions = [];
    setCurrentRound(1);
    setTime(duration);
    setGameStatus(true);
  }

  if(!useIsFocused()){
    rankedClosed = true
  }

  if(useIsFocused() && rankedClosed){
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
    // setTimeout(() => {
    //   setDisplayFeedback(false)
    // }, 1000)
    // setTimeout(changeQuestion, 1000)
    socket.emit("answerGiven");
  }

  const handleAnswer = (trueness, timeout) => {
    if (trueness) {
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

    showFeedBack()

  }

  useEffect(() => {

    // let ip=""; // enter the ip on which server operates
    // let socket = io(`http://${ip}:3000`)

    // setSocket(socket);

    // socket.open();

    // socket.emit("addToQueue");

    // socket.on("serverToClient", (data) => {
    //   console.log(data);
    // })
    //
    // socket.on('gameFound', (res) => {
    //   console.log("found the gaaame ", res);
    //   // navigation.navigate("RANKED_LOADING")
    // })

    socket.on("bothGiven", () => {
      console.log("given: ", socket.id)

      setTimeout(() => {
        setDisplayFeedback(false)
      }, 1000)

      changeQuestion();
      setTime(duration)
      setCurrentRound((currentRound) => currentRound + 1)
    })

    return(() => {socket.close()})
  }, []);


  useEffect(() => {
    if (currentTime == 0 && gameStatus) {
      // handleAnswer(false, true)

      setAnswerStatus(TIMEOUT)
      setDisplayFeedback(true)

      socket.emit("answerGiven")

    }
  })


  if(currentRound == totalRound+1 && gameStatus){
    setGameStatus(false)
    //TODO add functionality
    navigation.navigate("RANKED_STATS", {
      correct: 3, 
      questionCount: totalRound, 
      place: 2, 
      lp: 12, 
      rank: "GOLD", 
      points: 26,
    })
  }

  return (
    <View style={styles.frame}>
      <FeedBackFrame trueness={answerStatus} display={displayFeedBack} />
      <RankedTimeBar
        currentTime={currentTime}
        setTime={setTime}
        duration={duration}
        gameStatus={gameStatus}
      />
      <Text style={styles.roundCount}>
        {currentRound}/{totalRound}
      </Text>
      <RankedQuizPanel
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
  }
})

export default RankedGameScreen

