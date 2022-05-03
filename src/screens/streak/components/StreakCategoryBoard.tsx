import React from 'react'
import { View, StyleSheet, Text, FlatList } from 'react-native'
import { categories } from '../../../data/Categories'
import StreakCategoryTile from './StreakCategoryTile'

const StreakCategoryBoard = ({ navigation }) => {
  const renderCategoryTile = (itemData) => {
    return (
      <StreakCategoryTile
        navigation={navigation}
        title={itemData.item.title}
        color={itemData.item.color}
        componentName={itemData.item.componentName}
        icon={itemData.item.icon}
      />
    )
  }
  return (
    <FlatList
      style={styles.board}
      data={categories}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryTile}
      numColumns={2}
    />
  )
}

const styles = StyleSheet.create({
  board: {
    width: '90%',
    height: '50%'
  }
})

export default StreakCategoryBoard
