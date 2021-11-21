import * as React from 'react';
import { BACKEND_BASE_URL } from '../constants';

export default class APIService{
    static AddHackathon(body){
        return fetch('${BACKEND_BASE_URL}/add_hackathon',{
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
        return fetch(`${BACKEND_BASE_URL}/all_items`, {
            method: "GET",
            headers: {
                'Content-Type':'application/json'
            }
        })
        .then(response => response.json())
        .catch(error => console.log(error))
    }

    static GetItem(id){
        return fetch(`${BACKEND_BASE_URL}/items/${id}`, {
            method: "GET",
            headers: {
                'Content-Type':'application/json'
            }
        })
        .then(response => response.json())
        .catch(error => console.log(error))
    }

    static PostRentRequest(body){
        return fetch(`${BACKEND_BASE_URL}/request_item`, {
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
        return fetch(`${BACKEND_BASE_URL}/account/${id}`, {
            method: "GET",
            headers: {
                'Content-Type':'application/json'
            }
        })
        .then(response => response.json())
        .catch(error => console.log(error))
    }

    static GetUserRunningProviderContracts(id){
        return fetch(`${BACKEND_BASE_URL}/running_provider_contracts/${id}`, {
            method: "GET",
            headers: {
                'Content-Type':'application/json'
            }
        })
        .then(response => response.json())
        .catch(error => console.log(error))
    }

    static GetUserRunningConsumerContracts(id){
        return fetch(`${BACKEND_BASE_URL}/running_consumer_contracts/${id}`, {
            method: "GET",
            headers: {
                'Content-Type':'application/json'
            }
        })
        .then(response => response.json())
        .catch(error => console.log(error))
    }

    static UpdateContract(action, body){
        return fetch(`${BACKEND_BASE_URL}/update_contract/${action}`, {
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(body)
        })
        .then(response => response.json())
        .catch(error => console.log(error))
    }

    static GetRequestsMadeToUser(id){
        return fetch(`${BACKEND_BASE_URL}/item_requests/${id}`, {
            method: "GET",
            headers: {
                'Content-Type':'application/json'
            }
        })
        .then(response => response.json())
        .catch(error => console.log(error))
    }
    
    static ConfirmRequest(body){
        return fetch(`${BACKEND_BASE_URL}/confirm_request`, {
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(body)
        })
        .then(response => response.json())
        .catch(error => console.log(error))
    }

}