import { API, USER_SERVICE_API_KEY } from '.'

// import AsyncStorage from '@react-native-community/async-storage';  
// ! ignore deprecation this causes an error from expo
// fuck it
import { AsyncStorage } from 'react-native'

export async function logInWithUsernamePassword (username: String, password: String) {
  console.log('login request');
  
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
    
    const user : Object = await getUserWithUsername(username)
    if (user === {})
      return false

    const promiseArr = []
    
    promiseArr.push(AsyncStorage.setItem('id', `${user.id}`))
    promiseArr.push(AsyncStorage.setItem('username', user.username))

    await Promise.resolve(promiseArr)
    console.log('pushed', username);
    return true
  }                                                                          
  else
    return false
}

// can only fetch the logged in user
export async function getUserWithUsername(username: String) : Promise<Object> {
  console.log('get user request');
  
  const token = await AsyncStorage.getItem('token')

  if (token === null)
    return {}

  const response = await fetch(
    API + `/api/v1/players/${username}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'x-api-key': USER_SERVICE_API_KEY
      }
    }
  )

  if (response.ok) {
    const json = await response.json()
    // console.log(json);
    return json
  }

  return {}
}

export async function registerWithUsernameEmailPassword(email: string, username: string, password: string) {
  console.log('register user request');

  const response = await fetch(
    API + `/api/v1/players`, {
      method: 'POST',
      body: JSON.stringify({
        "username": username,
        "email": email,
        "password": password
      }),
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': USER_SERVICE_API_KEY
      }
    }
  )

  if (response.ok) {
    const json = await response.json()
    // console.log(json);
    return true
  }
  
  console.log(response.status);
  return false
}

export const validateTokenFromStorage = async () => {
  console.log('validate token request');
  
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

  if (js === 'true')
    return true
  
  AsyncStorage.removeItem('token')
  return false
}

