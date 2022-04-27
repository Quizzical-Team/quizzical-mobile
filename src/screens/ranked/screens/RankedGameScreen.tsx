import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, _View } from 'react-native'
import RankedTimeBar from '../components/RankedTimeBar'
import RankedQuizPanel from '../components/RankedQuizPanel'
import { questions } from '../../../data/Questions'
import { AntDesign } from '@expo/vector-icons'

let answeredQuestions = []

const FeedBackFrame = ({ trueness, display }) => {
    //TODO add current ranking
  if (display) {
    if (trueness) {
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
    } else {
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
    }
  } else {
    return <View></View>
  }
}

const RankedGameScreen = () => {
  const [displayFeedBack, setDisplayFeedback] = useState(false)
  const [answerStatus, setAnswerStatus] = useState(false)
  const [question, setQuestion] = useState({question:"", answers:["","","",""]})
  const [numberArray, setNumberArray] = useState([0,1,2,3]);
  const duration = 15
  const [currentTime, setTime] = useState(duration);
  const [currentRound, setCurrentRound] = useState(0)
  const totalCount = 8


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

    setNumberArray( (numberArray) => numberArray.sort(() => Math.random() - 0.5) )
    setQuestion(getUnansweredQuestion());
  }

  useEffect(changeQuestion,[])

  const showFeedBack = () => {
    setDisplayFeedback(true)
    setTimeout(() => {
      setDisplayFeedback(false)
    }, 500)
    setTimeout(changeQuestion, 500)
  }

  const handleAnswer = (trueness) => {
    setAnswerStatus(trueness)
    showFeedBack()
    setTime(duration)
    setCurrentRound( (currentRound)=>currentRound+1 )
    if (trueness) {
    } else {
    }
  }

  return (
    <View style={styles.frame}>
      <FeedBackFrame trueness={answerStatus} display={displayFeedBack} />
      <RankedTimeBar currentTime={currentTime} setTime={setTime} duration={duration} />
      <Text style={styles.roundCount}>
        {currentRound}/{totalCount}
      </Text>
      <RankedQuizPanel question={question} handleAnswer={handleAnswer} numberArray={numberArray} />
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
