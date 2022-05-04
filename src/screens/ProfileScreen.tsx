import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const user = {
  username: 'username',
  rankedLP: 12,
  rankedClass: 'GOLD',
  OneOOneClass: 'DIAMOND',
  OneOOneLP: 42,
  SpeedRunScore: 355,
  StreakScore: 674
}

const ProfileScreen = () => {
  return (
    <View style={styles.frame}>
      <Text style={styles.title}>{user.username}</Text>
      <View style={[styles.recordPanel, { backgroundColor: '#ffd5c9' }]}>
        <AntDesign style={styles.icon}  name="earth" size={60} color="black" />
        <View>
          <Text style={styles.recordTitle}>Ranked</Text>
          <Text style={styles.innerText}>LP: {user.rankedLP}</Text>
          <Text style={styles.innerText}>Class: {user.rankedClass}</Text>
        </View>
      </View>
      <View style={[styles.recordPanel, { backgroundColor: '#c9ffc2' }]}>
        <AntDesign style={styles.icon}  name="addusergroup" size={60} color="black" />
        <View>
          <Text style={styles.recordTitle}>One-o-One</Text>
          <Text style={styles.innerText}>LP: {user.OneOOneLP}</Text>
          <Text style={styles.innerText}>Class: {user.OneOOneClass}</Text>
        </View>
      </View>
      <View style={[styles.recordPanel, { backgroundColor: '#ccecff' }]}>
        <AntDesign style={styles.icon} name="hourglass" size={60} color="black" />
        <View>
          <Text style={styles.recordTitle}>Speed Run</Text>
          <Text style={styles.innerText}>High Score: {user.SpeedRunScore}</Text>
        </View>
      </View>
      <View style={[styles.recordPanel, { backgroundColor: '#ffca8a' }]}>
        <AntDesign style={styles.icon}  name="rocket1" size={60} color="black" />
        <View>
          <Text style={styles.recordTitle}>Streak</Text>
          <Text style={styles.innerText}>High Score: {user.StreakScore}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: '7%'
  },
  recordPanel: {
    height: '15%',
    width: '80%',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: '5%',
    flexDirection: "row",
    paddingLeft: "5%"
  },
  recordTitle: {
    fontWeight: 'bold',
    fontSize: 30
  },
  innerText: {
    fontSize: 20
  },
  icon:{
      marginRight: "8%"
  }
})

export default ProfileScreen
