import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { loggedInUser, enemies } from '../../../data/authentication'

const Enemy = (content) => {
    console.log(content.picture)
    return(
        <Image source={{uri: content.picture}}
       style={content.style} />
    )
}

const RankedLoadingScreen = ({navigation}) => {
  //TODO ENEMIES
  var enemyComponents = []
  for(var i = 0; i < 7; i++){
    enemyComponents.push(<Enemy picture={enemies[i].picture} style={styles.enemy}/>)
  }

  const startGame = () => {
      navigation.navigate("RANKED_GAME")
  }
  setTimeout(startGame, 2000);

  return (
    <View style={styles.frame}>
      <Text style={styles.title}>RANKED</Text>
      <Image source={{uri: loggedInUser.picture}}
       style={styles.profile} />
       <Text style={[styles.text, {color: "blue"}]}>YOU</Text>
       <Text style={[styles.text]}>VS</Text>
       <Text style={[styles.text, {color: "red"}]}>ENEMIES</Text>
       <View style={styles.enemies}>
           {enemyComponents}
       </View>
    </View>
  )
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    backgroundColor: '#303030',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  title: {
    fontSize: 50,
    color: 'white',
    marginTop: 50
  },
  profile: {
    height: 150,
    width: 150,
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 100,
    marginHorizontal: 20,
    marginTop: 100,
  },
  text:{
    fontSize: 50,
    color: 'white',
    textShadowColor: "black",
    textShadowRadius: 30,
  },
  enemies: {
      flexDirection: "row",
      marginTop: 10,
  },
  enemy:{
    height: 40,
    width: 40,
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 100,
    marginHorizontal: 5,
  }

})

export default RankedLoadingScreen
