import { getRandomString } from 'native-base/lib/typescript/theme/tools'
import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, Image, Button} from 'react-native'
import { loggedInUser, enemies } from '../../../data/authentication'
import {socket} from "../../../server/socket";

const Enemy = (content) => {
  return <Image source={{ uri: content.picture }} style={content.style} />
}

const RankedLoadingScreen = ({ navigation }) => {
  //TODO ENEMIES

  const enemyComponent = (picture, style, id) => {
    return <Enemy key={id} picture={picture} style={style} />
  }

  const [enemyComponents, setEnemyComponents] = useState([
    enemyComponent(enemies[0].picture, styles.enemy, enemies[0].username)
  ])
  const addEnemy = () => {
    if (enemyComponents.length < 7) {
      var pic = enemies[enemyComponents.length].picture
      var id = enemies[enemyComponents.length].username
      setEnemyComponents((oldEnemies) => [
        ...oldEnemies,
        enemyComponent(pic, styles.enemy, id)
      ])
    }
  }

  // setTimeout(addEnemy, 500)

  const startGame = () => {
    navigation.navigate('RANKED_GAME', {
      restart: true
    })
  }
  // if (enemyComponents.length == 7) {
  //   setTimeout(startGame, 1000)
  // }

  useEffect(() => {
    // setTimeout(addEnemy, 500)

    socket.emit("addToQueue", "ranked");

    socket.on('gameFound', (res) => {
      console.log("found the gaaame ", res);

      // socket.emit("getQ");
    })

    socket.on("takeTheQ", (data) => {
      // console.log(data);

      navigation.navigate('RANKED_GAME', {
        restart: true,
        questions: data
      })
    })
  }, [])

  function leave(){
    socket.close();

    navigation.navigate('MAINMENU')
  }

  return (
    <View style={styles.frame}>
      <Text style={styles.title}>RANKED</Text>
      <Image source={{ uri: loggedInUser.picture }} style={styles.profile} />
      <Text style={[styles.text, { color: 'blue' }]}>YOU</Text>
      <Text style={[styles.text]}>VS</Text>
      <Text style={[styles.text, { color: 'red' }]}>ENEMIES</Text>
      <View style={styles.enemies}>{enemyComponents}</View>
      <Button title={"leave"} onPress={leave}></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    backgroundColor: '#303030',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
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
    borderColor: 'white',
    borderRadius: 100,
    marginHorizontal: 20,
    marginTop: 100
  },
  text: {
    fontSize: 50,
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 30
  },
  enemies: {
    flexDirection: 'row',
    marginTop: 10
  },
  enemy: {
    height: 40,
    width: 40,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 100,
    marginHorizontal: 5
  }
})

export default RankedLoadingScreen
