import React, { useEffect, useState } from 'react'
import {View, Text, StyleSheet, AsyncStorage} from 'react-native'
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
  const [correctCount, setCorrectCount] = useState(0)
  const [points, setPoints] = useState(0)

  const [displayFeedBack, setDisplayFeedback] = useState(false)
  const [answerStatus, setAnswerStatus] = useState(INCORRECT)
  const [isGameGoingOn, setIsGameGoingOn] = useState(true)
  // const [numberArray, setNumberArray] = useState([0, 1, 2, 3])
  const [currentTime, setTime] = useState(duration)
  const [currentRound, setCurrentRound] = useState(1)
  const [isAnswerGiven, setIsAnswerGiven] = useState(false)
  // const [questionIndex, setQuestionIndex] = useState(0)
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
    socket.emit("answerGiven");
  }

  // @ts-ignore
  useEffect(async () => {
    // @ts-ignore
    AsyncStorage.getItem('username').then((data) => {
      console.log("username: ", data)
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



    // return(() => {socket.close()})
  },[]);

  useEffect(() => {
    if (currentTime == 0 && isGameGoingOn && !isAnswerGiven) {

      setAnswerStatus(TIMEOUT)
      setDisplayFeedback(true)

      socket.emit("answerGiven")
    }
  }, [currentTime, isGameGoingOn])

  if (currentRound >= totalRound + 1 && isGameGoingOn) {

    // console.log("correct count: ", correctCount)
    setIsGameGoingOn(false)
    //TODO add functionality
    socket.emit('endGameStats', {
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
          navigation.navigate("RANKED_STATS", {
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

  // useEffect(() => {
  //
  //
  // }, [])

  // // yarram bandi coding ¯\_(ツ)_/¯
  // // yoksa array out of bounds yeriz render sirasinda
  // // cunku sonraki soruyu da getlemeye calisiyor
  // // sonraki sayfaya gecmeden hemen once
  // buraya doğal olarak giriş yapmıyor
  if (currentRound >= totalRound + 1) {
    return (<View style={styles.frame}/>);
  }

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

