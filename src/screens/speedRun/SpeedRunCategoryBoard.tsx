import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { categories } from "../../data/Catagories";
import SpeedRunCatagoryTile from "./SpeedRunCategoryTile";

const SpeedRunCategoryBoard = () => {
    const renderCatagoryTile = (itemData) => {
        return <SpeedRunCatagoryTile title={itemData.item.title} color={itemData.item.color} componentName={itemData.item.componentName}/>
      }
      return (
        <FlatList
          style={styles.board}
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={renderCatagoryTile}
          numColumns = {2}
        />
      )
}

const styles = StyleSheet.create(
    {
        board: {
            width: '90%',
            height: '50%'
          }
    }
)

export default SpeedRunCategoryBoard;

