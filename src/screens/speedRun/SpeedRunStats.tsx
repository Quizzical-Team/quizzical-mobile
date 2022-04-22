import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { View, StyleSheet, Pressable, Text } from 'react-native'

const SpeedRunStats = ({navigation, route}) => {
    const {correct, time} = route.params;
 const handleMainMenu =()=>{
    navigation.navigate("SPEEDRUN_START", {goHome: true})
 }
  return (
    <View style={styles.frame}>
        <Text style={styles.text}>Solid Stuff!</Text>
        <Text style={styles.text}>You answered {correct} questions correctly.</Text>
        <Text style={styles.text}>In {time} seconds!</Text>
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
    backgroundColor: '#303030'
  },
  text:{
    color: "white",
    fontSize: 30,
  },
  buttonPanel:{
    width: "50%",
    height: "10%",
    alignSelf: "center",
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

export default SpeedRunStats
