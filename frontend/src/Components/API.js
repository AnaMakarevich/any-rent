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

    static GetAllItems(){
        return fetch(`http://127.0.0.1:5000/all_items`, {
            method: "GET",
            headers: {
                'Content-Type':'application/json'
            }
        })
        .then(response => response.json())
        .catch(error => console.log(error))
    }

    static GetItem(id){
        return fetch(`http://127.0.0.1:5000/items/${id}`, {
            method: "GET",
            headers: {
                'Content-Type':'application/json'
            }
        })
        .then(response => response.json())
        .catch(error => console.log(error))
    }

    static PostRentRequest(body){
        return fetch(`http://127.0.0.1:5000/request_item`, {
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(body)
        })
        .then(response => response.json())
        .catch(error => console.log(error))
    }
    static GetUserProfile(id){
        return fetch(`http://127.0.0.1:5000/user_profile/${id}`, {
            method: "GET",
            headers: {
                'Content-Type':'application/json'
            }
        })
        .then(response => response.json())
        .catch(error => console.log(error))
    }

    static GetUserRunningProviderContracts(id){
        return fetch(`http://127.0.0.1:5000/running_provider_contracts/${id}`, {
            method: "GET",
            headers: {
                'Content-Type':'application/json'
            }
        })
        .then(response => response.json())
        .catch(error => console.log(error))
    }

    static GetUserRunningConsumerContracts(id){
        return fetch(`http://127.0.0.1:5000/running_consumer_contracts/${id}`, {
            method: "GET",
            headers: {
                'Content-Type':'application/json'
            }
        })
        .then(response => response.json())
        .catch(error => console.log(error))
    }

}