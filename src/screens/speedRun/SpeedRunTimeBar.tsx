import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Animated } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import SpeedRunDurationPick from "./SpeedRunDurationPick";

const SpeedRunTimeBar = ({duration}) => {
    const [currentTime, setTime] = useState(duration)

    useEffect(() => {
        let interval = setInterval(() => {
          setTime(lastTimerCount => {
              lastTimerCount <= 1 && clearInterval(interval)
              return lastTimerCount - 1
          })
        }, 1000) //each count lasts for a second
        //cleanup the interval on complete
        return () => clearInterval(interval)
      }, []);
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