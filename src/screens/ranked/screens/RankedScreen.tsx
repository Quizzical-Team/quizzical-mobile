import React from 'react'
import { View, StyleSheet, Text, Pressable } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import RankedMatchmakingScreen from './RankedMatchmakingScreen'
import RankedLoadingScreen from './RankedLoadingScreen'
import RankedGameScreen from './RankedGameScreen'
import RankedStatsScreen from './RankedStatsScreen'
import {connect, socket} from '../../../server/socket'

const Stack = createNativeStackNavigator()

const RankedScreen = ({ navigation }) => {
  const mainNavigation = navigation;
  
  const RankedFrame = ({ navigation, route }) => {
    const {goHome} = route.params;
    if(goHome){
      mainNavigation.navigate('MAINMENU')
    }
    const goBack = () => {
      mainNavigation.navigate('MAINMENU')
    }

    const handleMatchMaking = () => {
        // socket.emit("addToQueue")
        connect();
        navigation.navigate("RANKED_MATCHMAKING")

    }
    return (
      <View style={styles.frame}>
        <Pressable style={styles.back} onPress={goBack}>
          <AntDesign name="back" size={36} color="white" />
        </Pressable>
        <Text style={styles.title}>RANKED</Text>
        <Text style={styles.info}>
          Find the correct answer before your opponents!
        </Text>
        <AntDesign
          name="earth"
          size={250}
          color="white"
          style={{ marginTop: 100 }}
        />
        <View style={styles.buttonOuter}>
          <Pressable
            style={styles.button}
            android_ripple={{ color: '#ccc' }}
            onPress={handleMatchMaking}
          >
            <View style={styles.buttonInner}>
              <Text style={styles.buttonText}>FIND OPPONENTS</Text>
            </View>
          </Pressable>
        </View>
      </View>
    )
  }

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          gestureEnabled: false
        }}
      >
        <Stack.Screen name="RANKED_START" component={RankedFrame} initialParams={{goHome:false}}/>
        <Stack.Screen name="RANKED_MATCHMAKING" component={RankedMatchmakingScreen} initialParams={{}}/>
        <Stack.Screen name="RANKED_LOADING" component={RankedLoadingScreen} initialParams={{}}/>
        <Stack.Screen name="RANKED_GAME" component={RankedGameScreen} initialParams={{}}/>
        <Stack.Screen name="RANKED_STATS" component={RankedStatsScreen} initialParams={{}}/>
        
      </Stack.Navigator>
    </NavigationContainer>
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
    marginTop: 100
  },
  
  back: {
    position: 'absolute',
    top: 50,
    left: 30
  },
  buttonOuter: {
    margin: 100,
    height: 60,
    borderRadius: 16,
    elevation: 4,
    shadowColor: 'black',
    backgroundColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: 'hidden'
  },
  button: {
    flex: 1
  },
  info: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    width: '80%',
    marginTop: 30
  },
  buttonInner: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white'
  }
})

export default RankedScreen
