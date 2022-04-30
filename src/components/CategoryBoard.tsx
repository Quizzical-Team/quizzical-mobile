import { View, StyleSheet, Text, Pressable, FlatList } from 'react-native'
import { gameModes } from '../data/Categories'
import CategoryTile from './CategoryTile'




const CategoryBoard = ({navigation}) => {
  const renderCategoryTile = (itemData) => {
    //console.log(gameModes)
    return <CategoryTile navigation={navigation} title={itemData.item.title} color={itemData.item.color} componentName={itemData.item.componentName}/>
  }
  return (
    <FlatList
      style={styles.board}
      data={gameModes}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryTile}
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

export default CategoryBoard
