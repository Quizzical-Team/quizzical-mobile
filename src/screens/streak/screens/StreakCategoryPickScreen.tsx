import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { View, StyleSheet, Text, Pressable } from 'react-native'
import StreakCategoryBoard from '../components/StreakCategoryBoard'


const StreakCategoryPickScreen = ({ navigation }) => {
  const handleBackButton = () => {
    navigation.navigate("STREAK_START", {goHome: false})
  }
  return (
    <View style={styles.frame}>
      <View style={styles.header}>
      <Pressable onPress={handleBackButton}>
          <AntDesign name="arrowleft" size={36} color="white" />
        </Pressable>
        <Text style={styles.title}>Pick a Category</Text>
      </View>
      <View style={styles.categoryPanel}>
      <StreakCategoryBoard navigation={navigation}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    backgroundColor: '#303030'
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
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
})

export default StreakCategoryPickScreen
