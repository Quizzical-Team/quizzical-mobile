import React from 'react'
import { View, StyleSheet, Text, Pressable } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import StreakCategoryPickScreen from './StreakCategoryPickScreen'
import StreakGameScreen from './StreakGameScreen'
import StreakStats from './StreakStats'

const Stack = createNativeStackNavigator()

const StreakScreen = ({ navigation }) => {
  const mainNavigation = navigation;
  
  const SpeedRunFrame = ({ navigation, route }) => {
    const {goHome} = route.params;
    if(goHome){
      mainNavigation.navigate('MAINMENU')
    }
    const goBack = () => {
      mainNavigation.navigate('MAINMENU')
    }
    const handleCategoryPick = () => {
      navigation.navigate('STREAK_CATEGORYPICK')
    }
    return (
      <View style={styles.frame}>
        <Pressable style={styles.back} onPress={goBack}>
          <AntDesign name="back" size={36} color="white" />
        </Pressable>
        <Text style={styles.title}>STREAK</Text>
        <Text style={styles.info}>
        Answer as many questions without failing!
        </Text>
        <AntDesign
          name="rocket1"
          size={250}
          color="white"
          style={{ marginTop: 100 }}
        />
        <View style={styles.buttonOuter}>
          <Pressable
            style={styles.button}
            android_ripple={{ color: '#ccc' }}
            onPress={handleCategoryPick}
          >
            <View style={styles.buttonInner}>
              <Text style={styles.buttonText}>PICK A CATEGORY</Text>
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
        <Stack.Screen name="STREAK_START" component={SpeedRunFrame} initialParams={{goHome:false}}/>
        <Stack.Screen
          name="STREAK_CATEGORYPICK"
          component={StreakCategoryPickScreen}
        />
        <Stack.Screen
          name="STREAK_GAME"
          component={StreakGameScreen}
        />
        <Stack.Screen
          name="STREAK_STATS"
          component={StreakStats}
        />
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
    textAlign: 'center'
  },
  title: {
    fontSize: 50,
    color: 'white',
    marginTop: 100
  },
  info: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    width: '80%'
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

export default StreakScreen
