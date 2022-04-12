import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { View, StyleSheet, Text, Pressable } from 'react-native'
import SpeedRunCategoryBoard from './SpeedRunCategoryBoard'

const SpeedRunCategoryPickScreen = ({ navigation }) => {
  const handleNextButton = () => {
    console.log()
  }
  return (
    <View style={styles.frame}>
      <View style={styles.header}>
        <Text style={styles.title}>Pick a Category</Text>
        <Pressable onPress={handleNextButton}>
          <AntDesign name="arrowright" size={36} color="white" />
        </Pressable>
      </View>
      <View style={styles.catagoryPanel}>
      <SpeedRunCategoryBoard/>
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
    justifyContent: 'space-around',
    flex: 1
  },
  title: {
    color: 'white',
    fontSize: 20
  },
  catagoryPanel: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
})

export default SpeedRunCategoryPickScreen
