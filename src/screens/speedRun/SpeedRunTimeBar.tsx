import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Text, Animated } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import SpeedRunDurationPick from "./SpeedRunDurationPick";

const SpeedRunTimeBar = ({duration, navigation, gameStatus, gameIsOver, correctAnswers, incorrectAnswers, setTimeLeft}) => {
    const [currentTime, setTime] = useState(duration)

      useEffect(()=>{
            
            if(currentTime == 0 && gameStatus){
                navigation.navigate('SPEEDRUN_STATS', {
                    correct: correctAnswers,
                    time: duration-currentTime
                  })
                gameIsOver();
            }
            else{
                setTimeout(()=>{setTime(currentTime=>currentTime-1)},1000)
            }
                    setTimeLeft(currentTime)
            
      },[ currentTime])

    return(
        <View style={styles.bar}>
            <Text style={styles.countdown}>{currentTime}</Text>
            <Animated.View style={[styles.innerBar, { width: ((currentTime/duration)*100).toString() + "%" } ]}/>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        bar: {
            top: 0,
            width: "100%",
            height: "5%",
            justifyContent: "center",
        },
        innerBar: {
            height: "100%",
            backgroundColor: "red",
            position: "absolute",
            
        },
        countdown: {
            color: "white",
            textAlign: "right",
            fontSize: 20,
            fontWeight: "bold",
            zIndex: 2,
            marginRight: 10,

        }
    }
)

export default SpeedRunTimeBar