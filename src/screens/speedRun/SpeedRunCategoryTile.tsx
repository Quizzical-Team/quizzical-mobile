import { AntDesign } from "@expo/vector-icons";
import { background } from "native-base/lib/typescript/theme/styled-system";
import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";

const SpeedRunCategoryTile = ({title, color, componentName, navigation, icon}) => {

    const handleComponentPress = (title) => {
       navigation.navigate("SPEEDRUN_DURATIONPICK", {category: title});
    }
    
    //console.log(title)
    return(
        <View style={[styles.gridItem, {backgroundColor: color}]}>
            <Pressable android_ripple={{color: "#ccc"}} style={styles.button} onPress={() => handleComponentPress(title)}>
                <View style={styles.innerContainer}>
                    <AntDesign name={icon} size={55} color="black" />
                    <Text style={styles.title}>{title}</Text>
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    gridItem:{
        flex: 1,
        margin: 16,
        height: 150,
        borderRadius: 16,
        elevation: 4,
        shadowColor: "black",
        shadowOpacity: 0.25,
        shadowOffset: {width: 0, height:2},
        shadowRadius: 8,
        overflow: "hidden",
    },
    button: {
        flex: 1,
    },
    innerContainer:{
        flex: 1,
        padding: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        marginTop: 10,
        fontWeight: "bold",

    }
})
export default SpeedRunCategoryTile;