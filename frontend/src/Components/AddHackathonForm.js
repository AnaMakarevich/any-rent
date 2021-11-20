import * as React from 'react';
import { useState } from 'react';
import APIService from '../Components/API'

const AddHackathonForm = (props) => {
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')
    const [organiser, setOrganiser] = useState('')

    const addHackathon = () => {
        APIService.AddHackathon({name,date, description, organiser})
            .then((response) => props.addedHackathon(response))
            .catch(error => console.log('error',error))
    }

    const handleSubmit=(event)=>{
        event.preventDefault()
        addHackathon()
        // clear form
        setName('')
        setDate('')
        setDescription('')
        setOrganiser('')
    }

  return (
<div className="shadow p-4">

        <form onSubmit = {handleSubmit} >

          <label htmlFor="name" className="form-label">Name</label>
          <input
          type="text"
          className="form-control"
          placeholder ="Hhackathon name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          required
          />

                      <label htmlFor="date" className="form-label">Date</label>
          <input
          type="text"
          className="form-control"
          placeholder ="Date"
          value={date}
          onChange={(e)=>setDate(e.target.value)}
          required
          />

                      <label htmlFor="description" className="form-label">Description</label>
          <input
          type="text"
          className="form-control"
          placeholder ="Enter hackathon description"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          required
          />

                      <label htmlFor="organiser" className="form-label">Organiser</label>
          <input
          type="text"
          className="form-control"
          placeholder ="Event organiser"
          value={organiser}
          onChange={(e)=>setOrganiser(e.target.value)}
          required
          />


          <button
          className="btn btn-primary mt-2"
          >
          Add hackathon</button>

        </form>


    </div>
  )}

export default AddHackathonForm;