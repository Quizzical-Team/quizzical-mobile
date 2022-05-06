import { AntDesign } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React, {useEffect} from 'react'
import { View, StyleSheet, Pressable, Text } from 'react-native'
import {socket} from "../../../server/socket"

const RankedStatsScreen = ({ navigation, route }) => {
  const { correct, questionCount, place, lp, rank, points } = route.params
  let handleMenu = false;
  //
  // useEffect(() => {
  //   socket.emit('getPlayersInRoom');
  // })

  const handleMainMenu = () => {
    // socket.emit("endGame");
    socket.close();
    navigation.navigate('RANKED_START', { goHome: true })
  }

  const handleDetails = () => {
    //details
  }
  return (
    <View style={styles.frame}>
      <Text style={styles.text}>Solid Stuff!</Text>
      <View style={styles.icon}>
        <Text style={styles.place}>{place}</Text>
        <AntDesign name="Trophy" size={200} color="gold" />
      </View>
      <Text style={styles.text}>
        You answered {correct} out of {questionCount} questions correctly
      </Text>
      <Text style={styles.text}>{points} Points earned!</Text>
      <View>
        <Text style={styles.info}>Current Rank: {rank}</Text>
        <Text style={styles.info}>Current LP: {lp}</Text>
      </View>
      <View style={styles.buttonPanel}>
        <LinearGradient
          colors={['#22B21F', '#BDFFAC']}
          style={styles.ButtonOuter}
        >
          <Pressable
            android_ripple={{ color: '#ccc' }}
            style={styles.ButtonInner}
            onPress={() => {
              handleDetails()
            }}
          >
            <Text style={styles.ButtonText}>Details</Text>
          </Pressable>
        </LinearGradient>
        <LinearGradient
          colors={['#656CEE', '#ACB0FF']}
          style={styles.ButtonOuter}
        >
          <Pressable
            android_ripple={{ color: '#ccc' }}
            style={styles.ButtonInner}
            onPress={() => {
              handleMainMenu()
            }}
          >
            <Text style={styles.ButtonText}>Main Menu</Text>
          </Pressable>
        </LinearGradient>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    backgroundColor: '#303030',
    justifyContent: 'space-around'
  },
  text: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center'
  },
  place: {
    color: 'gold',
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    top: 40
  },
  buttonPanel: {
    width: '90%',
    height: '10%',
    alignSelf: 'center',
    flexDirection: 'row'
  },
  icon: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ButtonOuter: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: 'blue',
    margin: 5
  },
  ButtonInner: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center'
  },
  ButtonText: {
    color: 'white',
    fontWeight: 'bold',
    alignItems: 'center',
    fontSize: 20
  },
  info: {
    color: 'white',
    fontSize: 20,
    textAlign: 'left',
    marginLeft: 30
  }
})

export default RankedStatsScreen
