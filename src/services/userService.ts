import { API, USER_SERVICE_API_KEY } from '.'

// import AsyncStorage from '@react-native-community/async-storage';  
// ! ignore deprecation this causes an error from expo
// fuck it
import { AsyncStorage } from 'react-native'

export const logInWithUsernamePassword = async (username: String, password: String) => {
  const response = await fetch(
    API + '/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        'username': username,
        'password': password
      }),
      headers: {
        'Content-Type': 'application/json',
        'x-api-key' : USER_SERVICE_API_KEY
      }
      
    }
  )
  if (response.ok) {
    const json = await response.json()
    await AsyncStorage.setItem('token', json.tokenValue)
    return true
  }                                                                          
  else
    return false
}

export const validateTokenFromStorage = async () => {
  const token = await AsyncStorage.getItem('token')

  const res = await fetch(
    API + `/api/v1/auth/validateToken/${token}`, {
      method: 'POST',
      headers: {
        'x-api-key' : USER_SERVICE_API_KEY
      }
    }
  )
  const js = await res.text();
  return js === 'true'
  
}

