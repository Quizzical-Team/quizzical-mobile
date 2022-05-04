import { AntDesign } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Image
} from 'react-native'

const friends = [
  {
    username: 'username',
    avatar: 'https://cdn.discordapp.com/embed/avatars/5.png'
  },
  {
    username: 'username1',
    avatar: 'https://cdn.discordapp.com/embed/avatars/5.png'
  },
  {
    username: 'username2',
    avatar: 'https://cdn.discordapp.com/embed/avatars/5.png'
  },
  {
    username: 'username13',
    avatar: 'https://cdn.discordapp.com/embed/avatars/5.png'
  },
  {
    username: 'username4',
    avatar: 'https://cdn.discordapp.com/embed/avatars/5.png'
  },
  {
    username: 'username15',
    avatar: 'https://cdn.discordapp.com/embed/avatars/5.png'
  },
  {
    username: 'username6',
    avatar: 'https://cdn.discordapp.com/embed/avatars/5.png'
  },
  {
    username: 'username17',
    avatar: 'https://cdn.discordapp.com/embed/avatars/5.png'
  },
  {
    username: 'username8',
    avatar: 'https://cdn.discordapp.com/embed/avatars/5.png'
  },
  {
    username: 'username18',
    avatar: 'https://cdn.discordapp.com/embed/avatars/5.png'
  },
]

const requests = [
    {
      username: 'username',
      avatar: 'https://cdn.discordapp.com/embed/avatars/5.png'
    },
    {
      username: 'username1',
      avatar: 'https://cdn.discordapp.com/embed/avatars/5.png'
    }
  ]

const FriendsScreen = () => {

    const addFriend = (username) => {
        console.log(username) //TODO
    }

    const acceptRequest = (username) => {
        console.log(username) //TODO
    }
    const declineRequest = (username) => {
        console.log(username) //TODO
    }

  const RequestUserRow = ({ username, avatar }) => {
    return (
      <View style={styles.userRow}>
        <Image source={{ uri: avatar }} style={styles.picture} />
        <Text>{username}</Text>
        <View style={{flexDirection: "row"}}>
        <Pressable style={[styles.requestButton,{backgroundColor: "green"}]} onPress={()=>{
            acceptRequest(username)
        }}>
            <AntDesign name="pluscircleo" size={20} color="black" />
        </Pressable>
        <Pressable style={[styles.requestButton,{backgroundColor: "red"}]} onPress={()=>{
            declineRequest(username)
        }}>
            <AntDesign name="closecircleo" size={20} color="black" />
        </Pressable>
        </View>
        
      </View>
    )
  }

  const UserRow = ({ username, avatar }) => {
    return (
      <View style={styles.userRow}>
        <Image source={{ uri: avatar }} style={styles.picture} />
        <Text>{username}</Text>
        <View></View>
        <View></View>
      </View>
    )
  }

  const [friendName, setFriendName] = useState('')
  return (
    <View style={styles.frame}>
      <View style={styles.addFriendPanel}>
        <TextInput
          style={styles.inputs}
          placeholder="Add Friend"
          autoCapitalize="none"
          onChangeText={setFriendName}
        />
        <Pressable style={styles.button} onPress={()=>{
            addFriend(friendName)
        }}>
          <AntDesign name="adduser" size={40} color="black" />
        </Pressable>
      </View>
      <View style={styles.friendsPanel}>
        <View style={styles.requestsPanel}>
          <Text style={styles.title}>Friend Requests</Text>
          <ScrollView style={{width: "90%"}} showsVerticalScrollIndicator={false}>
            {requests.map((player) => {
              return (
                <RequestUserRow
                  key={player.username}
                  username={player.username}
                  avatar={player.avatar}
                />
              )
            })}
          </ScrollView>
        </View>
        <View style={styles.listPanel}>
          <Text style={styles.title}>Friends</Text>
          <ScrollView style={{width: "90%"}} showsVerticalScrollIndicator={false}>
            {friends.map((player) => {
              return (
                <UserRow
                  key={player.username}
                  username={player.username}
                  avatar={player.avatar}
                />
              )
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  frame: {
    flex: 1
  },
  title: {
    color: 'black',
    fontSize: 20
  },
  addFriendPanel: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30
  },
  button: {
    height: 60,
    width: 60,
    backgroundColor: '#0fffc8',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputs: {
    width: '85%',
    height: 60,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 40,
    paddingLeft: 30
  },
  friendsPanel: {
    flex: 8,
    backgroundColor: '#a1ffe9',
    margin: 20,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  requestsPanel: {
    height: '30%',
    width: '90%',
    backgroundColor: '#c2fff1',
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: '5%',
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.3)'
  },
  requestButton:{
      height: 20,
      width: 20,
      backgroundColor: "white",
      borderRadius: 20,
      marginRight: 10,
  },
  listPanel: {
    height: '60%',
    width: '90%',
    backgroundColor: '#c2fff1',
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.3)'
  },
  userRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    marginVertical: 2
  },
  picture: {
    height: 30,
    width: 30,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 100,
    marginLeft: "5%",
    marginRight: "5%",
  },
})

export default FriendsScreen