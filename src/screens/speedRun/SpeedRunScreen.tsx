import React from 'react'
import { View, StyleSheet, Text, Pressable } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import SpeedRunCategoryPickScreen from './SpeedRunCategoryPickScreen'
import SpeedRunDurationPick from './SpeedRunDurationPick'
import SpeedRunGameScreen from './SpeedRunGameScreen'

const Stack = createNativeStackNavigator()

const SpeedRunScreen = ({ navigation }) => {
  const mainNavigation = navigation;
  const SpeedRunFrame = ({ navigation }) => {
    const goBack = () => {
      mainNavigation.navigate('MAINMENU')
    }
    const handleCategoryPick = () => {
      navigation.navigate('SPEEDRUN_CATEGORYPICK')
    }
    return (
      <View style={styles.frame}>
        <Pressable style={styles.back} onPress={goBack}>
          <AntDesign name="back" size={36} color="white" />
        </Pressable>
        <Text style={styles.title}>SPEEDRUN</Text>
        <Text style={styles.info}>
          Answer as many questions as possible in given time! Remember, you can
          only make 3 mistakes!
        </Text>
        <AntDesign
          name="hourglass"
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
          headerShown: false
        }}
      >
        <Stack.Screen name="SPEEDRUN_START" component={SpeedRunFrame} />
        <Stack.Screen
          name="SPEEDRUN_CATEGORYPICK"
          component={SpeedRunCategoryPickScreen}
        />
        <Stack.Screen
          name="SPEEDRUN_DURATIONPICK"
          component={SpeedRunDurationPick}
        />
        <Stack.Screen
          name="SPEEDRUN_GAME"
          component={SpeedRunGameScreen}
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

export default SpeedRunScreen
