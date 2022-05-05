import { AntDesign } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Image
} from 'react-native'
import {
  getAllFriendRequests,
  getAllFriendsOfPlayer,
  respondFriendRequest,
  sendFriendRequest
} from '../services/friendService'

const FriendsScreen = () => {
  const [requests, setRequests] = useState([])
  const [friends, setFriends] = useState([])
  const [searchFriend, setSearchFriend] = useState('')

  function updateRequestsAndFriends() {
    getAllFriendsOfPlayer().then((_friends) => setFriends(_friends))
    getAllFriendRequests().then((_requests) =>
      setRequests(_requests.map((_req) => _req.sender))
    )
  }

  useEffect(() => {
    updateRequestsAndFriends()
  }, [])

  const reset = () => {
    updateRequestsAndFriends()
    setTimeout(reset, 1000)
  }
  useEffect(()=>{
    reset()
  },[])

  const addFriend = async (username: string) => {
    
    await sendFriendRequest(username)
  }

  const removeFriend = async (username: string) => {
    
    //await sendFriendRequest(username)
  }

  const acceptRequest = async (username: string) => {
    await respondFriendRequest(username, true)
    updateRequestsAndFriends()
    // console.log(username) //TODO
  }
  const declineRequest = async (username: string) => {
    await respondFriendRequest(username, false)
    updateRequestsAndFriends()
    console.log(username) //TODO
  }

  const RequestUserRow = ({ username, avatar }) => {
    return (
      <View style={styles.userRow}>
        <Text>{username}</Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.requestButtonOutter}>
            <Pressable
              android_ripple={{ color: '#ccc' }}
              style={[styles.requestButton, { backgroundColor: 'green' }]}
              onPress={() => {
                acceptRequest(username)
              }}
            >
              <AntDesign name="pluscircleo" size={30} color="black" />
            </Pressable>
          </View>

          <View style={styles.requestButtonOutter}>
            <Pressable
              android_ripple={{ color: '#ccc' }}
              style={[styles.requestButton, { backgroundColor: 'red' }]}
              onPress={() => {
                declineRequest(username)
              }}
            >
              <AntDesign name="closecircleo" size={30} color="black" />
            </Pressable>
          </View>
        </View>
      </View>
    )
  }

  const UserRow = ({ username, avatar }) => {
    return (
      <View style={styles.userRow}>
        <Text>{username}</Text>
        <View style={styles.requestButtonOutter}>
            <Pressable
              android_ripple={{ color: '#ccc' }}
              style={[styles.requestButton, { backgroundColor: 'red' }]}
              onPress={() => {
                removeFriend(username)
              }}
            >
              <AntDesign name="deleteuser" size={25} color="black" />
            </Pressable>
          </View>
      </View>
    )
  }

  return (
    <View style={styles.frame}>
      <View style={styles.addFriendPanel}>
        <TextInput
          style={styles.inputs}
          placeholder="Add Friend"
          autoCapitalize="none"
          onChangeText={setSearchFriend}
          value={searchFriend}
        />
        <View style={styles.buttonOutter}>
          <Pressable
            android_ripple={{ color: '#ccc' }}
            style={styles.button}
            onPress={async () => {
              setSearchFriend("")
              await addFriend(searchFriend)
            }}
          >
            <AntDesign name="adduser" size={30} color="black" />
          </Pressable>
        </View>
      </View>
      <View style={styles.friendsPanel}>
        <View style={styles.requestsPanel}>
          <Text style={styles.title}>Friend Requests</Text>
          <ScrollView
            style={{ width: '90%' }}
            showsVerticalScrollIndicator={false}
          >
            {requests.sort((a, b) => {
            if (a.username < b.username) {
              return 1
            } else {
              return -1
            }
          }).map((player) => {
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
          <ScrollView
            style={{ width: '90%' }}
            showsVerticalScrollIndicator={false}
          >
            {friends.sort((a, b) => {
            if (a.username < b.username) {
              return 1
            } else {
              return -1
            }
          }).map((player) => {
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
  buttonOutter: {
    height: 60,
    width: 60,
    backgroundColor: '#0fffc8',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
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
  requestButton: {
    height: 30,
    width: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    marginRight: 10
  },
  requestButtonOutter: {
    height: 30,
    width: 30,
    borderRadius: 20,
    marginRight: 10,
    overflow: 'hidden'
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
    justifyContent: 'space-between',
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
    marginLeft: '5%',
    marginRight: '5%'
  }
})

export default FriendsScreen
