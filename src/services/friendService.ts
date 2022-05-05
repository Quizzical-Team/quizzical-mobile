import { API, USER_SERVICE_API_KEY } from "./index";
import {AsyncStorage} from "react-native";

export async function getAllFriendsOfPlayer() {
    //console.log('girdi')
    let username;
    let token;
    const resp = await AsyncStorage.multiGet(['username', 'token']);
    resp.forEach((res) => {
        if (res[0] === 'username')
            username = res[1]
        if (res[0] === 'token')
            token = res[1]
    })

    const response = await fetch(
        API + `/api/v1/players/friend/${username}`, {
            method: 'GET',
            headers: {
                'x-api-key' : USER_SERVICE_API_KEY,
                'Authorization': `Bearer ${token}`
            }
        }
    )

    if (response.ok) {
        const friends = await response.json()
        //console.log(friends)
        return friends
    }

    console.error('[FRIEND SERVICE]', response.status)
}


export async function getAllFriendRequests() {
    //console.log('girdi')
    let username;
    let token;
    const resp = await AsyncStorage.multiGet(['username', 'token']);
    resp.forEach((res) => {
        if (res[0] === 'username')
            username = res[1]
        if (res[0] === 'token')
            token = res[1]
    })

    const response = await fetch(
        API + `/api/v1/players/friend/requests/${username}`, {
            method: 'GET',
            headers: {
                'x-api-key' : USER_SERVICE_API_KEY,
                'Authorization': `Bearer ${token}`
            }
        }
    )

    if (response.ok) {
        const requests = await response.json()
        //console.log(requests)
        return requests
    }

    console.error('[FRIEND SERVICE]', response.status)
}

export async function respondFriendRequest(sender: string, friendResponse: boolean) {
    //console.log('girdi')
    let username;
    let token;
    const resp = await AsyncStorage.multiGet(['username', 'token']);
    resp.forEach((res) => {
        if (res[0] === 'username')
            username = res[1]
        if (res[0] === 'token')
            token = res[1]
    })
   //console.log(`/api/v1/players/friend/respond?receiver=${username}&sender=${sender}&response=${friendResponse}`)

    const response = await fetch(
        API + `/api/v1/players/friend/respond?receiver=${username}&sender=${sender}&response=${friendResponse}`, {
            method: 'PUT',
            headers: {
                'x-api-key' : USER_SERVICE_API_KEY,
                'Authorization': `Bearer ${token}`
            }
        }
    )

    if (response.ok) {
        const requests = await response.json()
        //console.log(requests)
        return requests
    }

    console.error('[FRIEND SERVICE]', response.status)
}


export async function sendFriendRequest(receiver: string) {
    //console.log('girdi')
    let username;
    let token;
    const resp = await AsyncStorage.multiGet(['username', 'token']);
    resp.forEach((res) => {
        if (res[0] === 'username')
            username = res[1]
        if (res[0] === 'token')
            token = res[1]
    })

    const response = await fetch(
        API + `/api/v1/players/friend/send?receiver=${receiver}&sender=${username}`, {
            method: 'PUT',
            headers: {
                'x-api-key' : USER_SERVICE_API_KEY,
                'Authorization': `Bearer ${token}`
            }
        }
    )

    if (response.ok) {
        const requests = await response.json()
        //console.log(requests)
        return requests
    }

    console.error('[FRIEND SERVICE]', response.status)
}
