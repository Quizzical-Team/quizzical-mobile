import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
const LeadershipBoard = () => {
  const UserRow = ({ username, avatar, score }) => {
    return (
      <View style={styles.userRow}>
        <Image source={{ uri: avatar }} style={styles.picture} />
        <Text>{username}</Text>
        <Text>{score}</Text>
      </View>
    )
  }

  const renderUserRow = (itemData) => {
    return (
      <UserRow
        username={itemData.item.username}
        avatar={itemData.item.avatar}
        score={itemData.item.score}
      />
    )
  }

  const players = [
    {
      username: 'username',
      avatar: 'https://cdn.discordapp.com/embed/avatars/5.png',
      score: 18
    },
    {
      username: 'username1',
      avatar: 'https://cdn.discordapp.com/embed/avatars/5.png',
      score: 128
    },
    {
      username: 'username2',
      avatar: 'https://cdn.discordapp.com/embed/avatars/5.png',
      score: 418
    },
    {
      username: 'username3',
      avatar: 'https://cdn.discordapp.com/embed/avatars/5.png',
      score: 318
    },
    {
      username: 'username4',
      avatar: 'https://cdn.discordapp.com/embed/avatars/5.png',
      score: 18
    },
    {
      username: 'username5',
      avatar: 'https://cdn.discordapp.com/embed/avatars/5.png',
      score: 148
    },
    {
      username: 'username6',
      avatar: 'https://cdn.discordapp.com/embed/avatars/5.png',
      score: 185
    },
    {
      username: 'username7',
      avatar: 'https://cdn.discordapp.com/embed/avatars/5.png',
      score: 118
    }
  ]

  return (
    <LinearGradient colors={['#b4f4fa', '#789eff']} style={styles.frame}>
      <Text style={styles.title}>Leader Board</Text>
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false} >
          {players.map((player) => {
            return (
              <UserRow
                key={player.username}
                username={player.username}
                avatar={player.avatar}
                score={player.score}
              />
            )
          })}
      </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  frame: {
    backgroundColor: 'white',
    width: '81%',
    height: '55%',
    borderRadius: 16,
    alignItems: 'center',
    overflow: 'scroll'
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
