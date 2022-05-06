import React, {useEffect, useState} from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import {getTop10PlayersForLeaderboard} from "../services/userService";
import {parse} from "react-native-svg/lib/typescript";
const LeadershipBoard = () => {
  const [ leaders, setLeaders ] = useState([])

  useEffect(() => {
    getTop10PlayersForLeaderboard().then((response) => {
      setLeaders(response)
    })
    setTimeout(() => {
      // call user service and update leaders
      getTop10PlayersForLeaderboard().then((response) => {
        setLeaders(response)
      })
    }, 10000)
  }, [])

  const UserRow = ({ username, avatar, score }) => {
    return (
      <View style={styles.userRow}>
        <Image source={{ uri: avatar }} style={styles.picture} />
        <Text>{username}</Text>
        <Text>{score}</Text>
      </View>
    )
  }

  return (
    <LinearGradient colors={['#edd9ff','#edd9ff']} style={styles.frame}>
      <Text style={styles.title}>Leader Board</Text>
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {
          leaders.map((player) => {
          return (
              <UserRow
                key={player.id}
                username={player.username}
                avatar={`https://cdn.discordapp.com/embed/avatars/${parseInt(player.id)%6}.png`}
                score={player.matchmakingRatio}
                />
          )
        })
          // .sort((a, b) => {
          //   if (a.matchmakingRatio < b.score) {
          //     return 1
          //   } else {
          //     return -1
          //   }
          // })
          // .map((player) => {
          //   return (
          //     <UserRow
          //       key={player.username}
          //       username={player.username}
          //       avatar={player.avatar}
          //       score={player.score}
          //     />
          //   )
          // })
        }
      </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  frame: {
    backgroundColor: 'white',
    width: '82%',
    height: '55%',
    borderRadius: 16,
    alignItems: 'center',
    overflow: 'scroll',
  },
  picture: {
    height: 30,
    width: 30,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 100
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5
  },
  list: {
    width: '90%'
  },
  userRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    marginVertical: 2
  }
})

export default LeadershipBoard
