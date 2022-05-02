import {StyleSheet} from 'react-native'

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainFrame: {
    flex: 1
  },
  headerPanel: {
    height: '15%',
    marginBottom: 30
  },
  catagoryPanel: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  drawer: {
    backgroundColor: '#333E63'
  },
  mainScreen: {
    backgroundColor: 'black',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  warning: {
    color: 'darkred',
    opacity: 0
  },
  loginText: {
    textAlign: 'center',
    fontSize: 40
  },
  inputs: {
    width: 300,
    height: 60,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 40,
    paddingLeft: 30
  },
  loginButton: {
    width: 300,
    fontFamily: 'SFProRegular',
    height: 60,
    backgroundColor: 'black',
    margin: 5,
    borderRadius: 40,
    overflow: 'hidden'
  },
  signUpButton: {
    width: 300,
    height: 60,
    backgroundColor: '#EF5050',
    margin: 5,
    borderRadius: 40,
    overflow: 'hidden'
  },
  back: {
    position: 'absolute',
    top: 50,
    left: 30
  },
})
