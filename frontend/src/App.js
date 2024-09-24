

import React, { useState, useEffect } from "react";
import "./css/app.css";
import "./css/global.css";
import "./css/sidebar.css";
import "./css/main.css";
import Notes from './Components/Notes';
import RadioButton from './Components/RadioButton';
import api from "./services/api";




function App() {

  const [ selectedValue, setSelectedValue ] = useState("all")

  const [ title, setTitles ] = useState("")
  const [ notes, setNotes ] = useState("")
  const [ allNotes, setAllNotes ] = useState([])

  useEffect(() => {

    getAllNotes()
    
  },[])

  async function getAllNotes() {

    const response = await api.get('/annotations');
    
    setAllNotes(response.data)

  }

  async function handleDelete (id) {

    const deletedNote = await api.delete(`/annotations/${id}`)
    
    if(deletedNote) {

      setAllNotes(allNotes.filter(notes => notes._id != id))

    }

  }

  async function loadNotes(option) {

    const params = { priority: option }
    const response = await api.get(`/priorities`, { params })

    if (response){

      setAllNotes(response.data)

    }

  }

  async function handleChange(e) {

    setSelectedValue(e.value)

    if(e.checked && e.value != "all") {
      loadNotes(e.value)
    } else {
      getAllNotes()
    }

  }

  async function handleChangePriority(id) {

    const notes = await api.post(`/priorities/${id}`)

    if(notes && selectedValue != 'all') {
      loadNotes(selectedValue)
    } else if(notes) {
      setAllNotes()
    }

  }

  async function  handleSubmit(e) {

    e.preventDefault();

    const response =  await api.post ('/annotations', { 
      title, 
      notes,
      priority: false,
    });

    if(selectedValue != 'all') {

      getAllNotes()
      setSelectedValue("all")

    }

    setTitles(" ")
    setNotes(" ")
    setAllNotes([...allNotes, response.data])

  }



  useEffect(() => {

    let btn = document.getElementById('btn_submit')

    btn.style.background = '#ffd3ca'

    if(title && notes) {
      btn.style.background = '#eb8f7a'
    } 

  },[title, notes])


  return (
    <div id="app">
      <aside>
        <strong>Caderno de Notas</strong>
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="title">Título da anotação</label>
            <input 
              maxLength={30}
              value= {title} 
              required
              onChange={e => setTitles(e.target.value)}/>
          </div>
          <div className="input-block">
            <label htmlFor="nota">Anotações</label>
            <textarea 
              value={notes} 
              required
              onChange={e => setNotes(e.target.value)}></textarea>
          </div>
          <button id="btn_submit" type="submit" >Salvar</button>
        </form>
        <RadioButton 
          selectedValue={selectedValue} 
          handleChange={handleChange}
        />      
      </aside>
      <main>
        <ul>
          {allNotes.map(data => (
            <Notes 
            key={data.id}
            data = {data}
            handleDelete={handleDelete}
            handleChangePriority={handleChangePriority}/>
          ))}  
        </ul>
      </main>
    </div>
  );
}

export default App;
