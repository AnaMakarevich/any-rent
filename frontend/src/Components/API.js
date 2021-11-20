import * as React from 'react';
export default class APIService{
    static AddHackathon(body){
        return fetch('http://localhost:5000/add_hackathon',{
            'method':'POST',
             headers : {
            'Content-Type':'application/json'
      },
      body:JSON.stringify(body)
    })
    .then(response => response.json())
    .catch(error => console.log(error))
    }

}