import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import CatagoryBoard from '../components/CatagoryBoard'

const MainMenuScreen = ({ navigation }) => {
  return (
    <View style={styles.mainFrame}>
      <View style={styles.catagoryPanel}>
        <CatagoryBoard />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainFrame: {
    flex: 1
  },
  catagoryPanel: {
    justifyContent: 'center',
    alignItems: "center",
    alignContent: "center"
  }
})

export default MainMenuScreen
