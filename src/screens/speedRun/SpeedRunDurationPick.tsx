import { AntDesign } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'

const SpeedRunDurationPick = ({navigation, route}) => {
  const {category} = route.params;
  const [currentDuration, setDuration] = useState(60);

  const handleBackButton = () => {
    navigation.navigate("SPEEDRUN_CATEGORYPICK")
  }

  const handleDurationButtons = (time) => {
      setDuration(time);
      //console.log(currentDuration)
      navigation.navigate("SPEEDRUN_GAME", {duration: time, category: category})
  }

  const DurationButton = ({time}) => {
      return(
        <LinearGradient colors={['#FFF2AC','#EE6565']} style={styles.durationButtonOuter}>
        <Pressable
          android_ripple={{ color: '#ccc' }}
          style={styles.durationButtonInner}
          onPress={ ()=>{handleDurationButtons(time)} }
        >
          <Text style={styles.durationButtonText}>{time.toString()} Seconds</Text>
        </Pressable>
      </LinearGradient>
      )
  }
  return (
    <View style={styles.frame}>
      <View style={styles.header}>
      <Pressable onPress={handleBackButton}>
          <AntDesign name="arrowleft" size={36} color="white" />
        </Pressable>
        <Text style={styles.title}>Pick a Duration</Text>
      </View>
      <Text style={styles.time}>
          {currentDuration} Seconds
      </Text>
      <View style={styles.categoryPanel}>
        <DurationButton time={30}/>
        <DurationButton time={45}/>
        <DurationButton time={60}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    backgroundColor: '#303030'
  },
  time: {
      color: "white",
      fontSize: 30,
      alignContent: "center",
      alignItems: "center",
      textAlign: "center",
      marginBottom: 70,
      fontWeight: "bold",
  },
  header: {
    flexDirection: 'row',
    top: 50,
    width: '100%',
    justifyContent: "space-evenly",
    flex: 1
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginRight: 80,
  },
  categoryPanel: {
    flex: 5,
    alignItems: 'center',
    alignContent: 'center'
  },
  durationButtonOuter: {
    overflow: 'hidden',
    width: '60%',
    height: '15%',
    borderRadius: 20,
    backgroundColor: 'yellow',
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  durationButtonInner: {
    flex: 1,
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: "100%",
  },
  durationButtonText: {
    fontSize: 30,
    textAlign: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 20,
  }
})

export default SpeedRunDurationPick;
