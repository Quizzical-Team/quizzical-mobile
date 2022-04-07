import React, { useState } from 'react'
import { View, StyleSheet, Text, Pressable, FlatList } from 'react-native'
import CatagoryTile from './CatagoryTile'
import { catagories } from '../data/Catagories'

const renderCatagoryTile = (itemData) => {
  console.log(catagories)
  return <CatagoryTile title={itemData.item.title} color={itemData.item.color}/>
}

const CatagoryBoard = () => {
  return (
    <FlatList
      style={styles.board}
      data={catagories}
      keyExtractor={(item) => item.id}
      renderItem={renderCatagoryTile}
      numColumns = {2}
    />
  )
}

const styles = StyleSheet.create({
  board: {
    borderWidth: 1,
    width: '90%',
    height: '50%'
  }
})

export default CatagoryBoard
