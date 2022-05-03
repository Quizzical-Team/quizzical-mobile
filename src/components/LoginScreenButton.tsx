import { View, Text, StyleSheet, Pressable } from 'react-native'

const LoginScreenButton = ({ style, onPress, text}) => {
  return (
    <View style={style}>
      <Pressable
        style={styles.buttonInner}
        onPress={onPress}
        android_ripple={{ color: 'white' }}
      >
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonInner: {
    height: '100%'
  },
  text: {
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
    color: 'white'
  }
})

export default LoginScreenButton
