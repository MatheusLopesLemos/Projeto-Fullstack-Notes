

import React, { useState, useEffect } from "react";
import "./css/app.css";
import "./css/global.css";
import "./css/sidebar.css";
import "./css/main.css";
import Notes from './Components/Notes';
import api from "./services/api";



function App() {

  

  const [ title, setTitles ] = useState("")
  const [ notes, setNotes ] = useState("")
  const [ allNotes, setAllNotes ] = useState([])

  useEffect(() => {
    async function getAllNotes() {

      const response = await api.get('/annotations');
      
      setAllNotes(response.data)


    }

    getAllNotes()
    

  },[])

  async function  handleSubmit(e) {

    e.preventDefault();

    const response =  await api.post ('/annotations', { 
      title, 
      notes,
      priority: false,
    });

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
      </aside>
      <main>
        <ul>
          {allNotes.map(data => (
            <Notes data = {data}/>
          ))}         
        </ul>
      </main>
    </div>
  );
}

export default App;
