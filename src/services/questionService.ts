import { QUESTION_SERVICE_API_KEY, API } from ".";

const fetch = require('node-fetch')

export const getQuestionsByPage = async () => {
  console.log(API + '/api/v1/questions/page');
  
  const response = await fetch(
    API + '/api/v1/questions/page', {
      method: "GET",
      headers: {
        'x-api-key' : QUESTION_SERVICE_API_KEY
      }
    }
  )
  console.log('geldim');
  console.log('gidiyorum');
  
  if (response.ok) {
    console.log(response.body)
        const json = await response.json()
        console.log(json)
  }                                                                          
  else
    console.log(response.status)
}