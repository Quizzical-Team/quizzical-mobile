import React from 'react'
import { View, StyleSheet, Text, Pressable } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import OneOOneMatchmakingScreen from './OneOOneMatchmakingScreen'
import OneOOneLoadingScreen from './OneOOneLoadingScreen'
import OneOOneGameScreen from './OneOOneGameScreen'
import OneOOneStatsScreen from './OneOOneStatsScreen'
import { socket } from '../../../server/socket'

const Stack = createNativeStackNavigator()

const OneOOneScreen = ({ navigation }) => {
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
        socket.emit("addToQueue")
        navigation.navigate("ONEOONE_MATCHMAKING")

    }
    return (
      <View style={styles.frame}>
        <Pressable style={styles.back} onPress={goBack}>
          <AntDesign name="back" size={36} color="white" />
        </Pressable>
        <Text style={styles.title}>One-o-One</Text>
        <Text style={styles.info}>
          Find the correct answer before your opponent!
        </Text>
        <AntDesign
          name="addusergroup"
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
              <Text style={styles.buttonText}>FIND OPPONENT</Text>
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
        <Stack.Screen name="ONEOONE_START" component={RankedFrame} initialParams={{goHome:false}}/>
        <Stack.Screen name="ONEOONE_MATCHMAKING" component={OneOOneMatchmakingScreen} initialParams={{}}/>
        <Stack.Screen name="ONEOONE_LOADING" component={OneOOneLoadingScreen} initialParams={{}}/>
        <Stack.Screen name="ONEOONE_GAME" component={OneOOneGameScreen} initialParams={{}}/>
        <Stack.Screen name="ONEOONE_STATS" component={OneOOneStatsScreen} initialParams={{}}/>
        
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

export default OneOOneScreen
