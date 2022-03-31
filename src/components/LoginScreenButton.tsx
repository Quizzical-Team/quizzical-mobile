import { View, Text, StyleSheet, Pressable } from 'react-native'

const LoginScreenButton = ({ children, style, press }) => {
  return (
    <View style={style}>
      <Pressable
        style={styles.buttonInner}
        onPress={press}
        android_ripple={{ color: 'white' }}
      >
        <Text style={styles.text}>{children}</Text>
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
