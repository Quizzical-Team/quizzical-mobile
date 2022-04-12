import React, { useState } from 'react'
import { View, StyleSheet, Text, Pressable, FlatList } from 'react-native'
import { gameModes } from '../data/Catagories'
import CatagoryTile from './CatagoryTile'




const CatagoryBoard = ({navigation}) => {
  const renderCatagoryTile = (itemData) => {
    console.log(gameModes)
    return <CatagoryTile navigation={navigation} title={itemData.item.title} color={itemData.item.color} componentName={itemData.item.componentName}/>
  }
  return (
    <FlatList
      style={styles.board}
      data={gameModes}
      keyExtractor={(item) => item.id}
      renderItem={renderCatagoryTile}
      numColumns = {2}
    />
  )
}

const styles = StyleSheet.create({
  board: {
    width: '90%',
    height: '50%'
  }
})

export default CatagoryBoard
