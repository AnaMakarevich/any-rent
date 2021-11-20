import * as React from 'react';
import { useState, useEffect } from "react";
import './App.css'
import HackathonsList from './Components/HackathonsList'
import AddHackathonForm from "./Components/AddHackathonForm";

function App() {
    // create variable for our data
    const [hackathons, setHackathons] = useState([]);
    const [showForm, setShowForm] = useState(false);

    // use hooks to load data from API
    useEffect( () => {
            fetch('http://localhost:5000/hackathons', {
                'methods': 'GET', headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(response => setHackathons(response))
                .catch(error => console.log(error))


        }, [])

    const addedHackathon = (hackathon) => {
        const new_hackathons = [...hackathons, hackathon]
        setHackathons(new_hackathons)
    }
    const toggleShowForm = () => {
        setShowForm(!showForm);
    }

    return (

        <div>
            <div>
             <h1>Flask and React Integrations</h1>
                Here goes a button for doing post request
                Add hackathon:
                  <button  onClick={toggleShowForm} className="btn btn-primary">
                      Add your hackathon
                      <i className="bi bi-pencil-square m-2"></i>
                  </button>
            </div>
            <div>
            <HackathonsList hackathons={hackathons} />
                {showForm && (
                    <AddHackathonForm addedHackathon={addedHackathon} />
                )}
            </div>
        </div>
    );
}

export default App;