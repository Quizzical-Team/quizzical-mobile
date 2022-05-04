import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import RankedTimeBar from '../components/RankedTimeBar'
import RankedQuizPanel from '../components/RankedQuizPanel'
import { AntDesign } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'
import {socket} from "../../../server/socket";

const CORRECT = 'CORRECT'
const INCORRECT = 'INCORRECT'
const TIMEOUT = 'TIMEOUT'
const FeedBackFrame = ({ trueness, display }) => {
  //TODO add current ranking
  if (display) {
    if (trueness === CORRECT) {
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
  const totalRound = 4
  const duration = 5

  const [displayFeedBack, setDisplayFeedback] = useState(false)
  const [answerStatus, setAnswerStatus] = useState(INCORRECT)
  const [isGameGoingOn, setIsGameGoingOn] = useState(true)
  // const [numberArray, setNumberArray] = useState([0, 1, 2, 3])
  const [currentTime, setTime] = useState(duration)
  const [currentRound, setCurrentRound] = useState(1)
  const [isAnswerGiven, setIsAnswerGiven] = useState(false)
  // const [questionIndex, setQuestionIndex] = useState(0)
  const questions = route.params.questions;
  const [question, setQuestion] = useState({
    numberArray: [0,1,2,3],
    questionIndex: 0,
    question: route.params.questions[0].questionText,
    answers: [
      route.params.questions[0].correctAnswer,
      route.params.questions[0].distractor1,
      route.params.questions[0].distractor2,
      route.params.questions[0].distractor3,
    ]
  })

  const shuffle = (answers: Array<any>) => {
    const newNumberArray = [...question.numberArray]
    const newAnswersArray = [...answers]

    for (let i = 0; i < question.answers.length; i++) {
      const newIndex = Math.floor(Math.random() * question.answers.length)
      // swap with new index
      const temp = newNumberArray[newIndex]
      newNumberArray[newIndex] = newNumberArray[i]
      newNumberArray[i] = temp

      const tempAnswer = newAnswersArray[newIndex]
      newAnswersArray[newIndex] = newAnswersArray[i]
      newAnswersArray[i] = tempAnswer
    }

    // console.log(question.numberArray)
    console.log(newNumberArray)
    console.log(answers)
    console.log(newAnswersArray)

    return {
      numberArray: [ ...newNumberArray ],
      answers: [ ...newAnswersArray ]
    }
  }

  const handleAnswer = (trueness: boolean, timeout: boolean) => {
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

    setDisplayFeedback(true)

    setIsAnswerGiven(true);
    socket.emit("answerGiven");
  }
  const test = () => {

    setQuestion((prevQuestion) => ({
      ...shuffle([
                questions[prevQuestion.questionIndex + 1].correctAnswer,
                questions[prevQuestion.questionIndex + 1].distractor1,
                questions[prevQuestion.questionIndex + 1].distractor2,
                questions[prevQuestion.questionIndex + 1].distractor3,
      ]),

      questionIndex: prevQuestion.questionIndex + 1,
      question: questions[prevQuestion.questionIndex + 1].questionText,
    }))

    console.log("given: ", socket.id)

    // * cleanup and iteration before next round
    // setTimeout(() => {
    setDisplayFeedback(false)
    // }, 750);

    setIsAnswerGiven(false)

    setTime(duration)
    setCurrentRound((currentRound: number) => currentRound + 1)
    // console.log('NEXXXT', currentRound)
  }
  // * [HOOKS]
  useEffect(() => {
    socket.on("bothGiven", test)

    return(() => {socket.close()})
  },[]);

  useEffect(() => {
    if (currentTime == 0 && isGameGoingOn && !isAnswerGiven) {
      setAnswerStatus(TIMEOUT)
      setDisplayFeedback(true)

      socket.emit("answerGiven")
    }
  }, [currentTime, isGameGoingOn])

  if (currentRound >= totalRound + 1 && isGameGoingOn) {
    setIsGameGoingOn(false)
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

  // // yarram bandi coding ¯\_(ツ)_/¯
  // // yoksa array out of bounds yeriz render sirasinda
  // // cunku sonraki soruyu da getlemeye calisiyor
  // // sonraki sayfaya gecmeden hemen once
  // if (currentRound >= totalRound + 1) {
  //   return (<View style={styles.frame}/>);
  // }
  // ******* currentRound ve isGameGoingOn'lu useEffectin icini renderdan onceye alinca duzeldi gibi

  return (
    <View style={styles.frame}>
      <FeedBackFrame trueness={answerStatus} display={displayFeedBack} />
      <RankedTimeBar
        currentTime={currentTime}
        setTime={setTime}
        duration={duration}
        gameStatus={isGameGoingOn}
      />
      <Text style={styles.roundCount}>
        {currentRound}/{totalRound}
      </Text>
      <RankedQuizPanel
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
  }
})

export default RankedGameScreen

