import { background } from "native-base/lib/typescript/theme/styled-system";
import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";

const CategoryTile = ({title, color, componentName, navigation}) => {

    const handleComponentPress = () => {
        navigation.navigate(componentName);
    }
    
    console.log(title)
    return(
        <View style={[styles.gridItem, {backgroundColor: color}]}>
            <Pressable android_ripple={{color: "#ccc"}} style={styles.button} onPress={handleComponentPress}>
                <View style={styles.innerContainer}>
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
        fontWeight: "bold",

    }
})
export default CategoryTile;