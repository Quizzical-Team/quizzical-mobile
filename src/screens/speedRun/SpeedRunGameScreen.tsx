import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SpeedRunTimeBar from "./SpeedRunTimeBar";
const SpeedRunGameScreen = ({navigation, route}) => {
    const {duration, category} = route.params;
    console.log(duration)
    console.log(category)
    return(
        <View style={styles.frame}>
            <SpeedRunTimeBar duration={duration} />

        </View>
    )
}

const styles = StyleSheet.create(
    {
        frame: {
            flex: 1,
            backgroundColor: '#303030',
        }
    }
)

export default SpeedRunGameScreen;