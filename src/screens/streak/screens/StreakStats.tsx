import { AntDesign } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { View, StyleSheet, Pressable, Text } from 'react-native'

const StreakStats = ({ navigation, route }) => {
  const { correct, time } = route.params
  const handleMainMenu = () => {
    navigation.navigate('STREAK_START', { goHome: true })
  }
  return (
    <View style={styles.frame}>
      <Text style={styles.text}>Sheeshh!</Text>
      <View style={styles.icon}>
        <AntDesign name="rocket1" size={150} color="orange" />
      </View>

      <Text style={styles.text}>
        You answered {correct} questions without a single mistake!
      </Text>
      <View style={styles.icon}>
        <AntDesign name="Trophy" size={100} color="gold"/>
      </View>
      <Text style={styles.text}>Your record: {42 /*TODO*/}</Text> 
      <View style={styles.buttonPanel}>
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
    alignContent: "center",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "space-around",
  },
  text: {
    color: 'white',
    fontSize: 30,
    textAlign: "center",
  },
  buttonPanel: {
    width: '50%',
    height: '10%',
    alignSelf: 'center'
  },
  icon: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
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
    alignItems: 'center'
  }
})

export default StreakStats
