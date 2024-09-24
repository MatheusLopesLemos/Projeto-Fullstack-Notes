import React from 'react'
import "./style.css"

function RadioButton({ selectedValue, handleChange }){
  return (
    <div className='radio'>

      <input 
        type="radio" 
        name="radio" 
        value="all"
        checked={selectedValue === "all"}
        onChange={e => handleChange(e.target)}
        /> 
      <span>Todos</span>

      <input 
        type="radio" 
        name="radio" 
        value="true"
        checked={selectedValue === "true"}
        onChange={e => handleChange(e.target)}
        /> 
      <span>Prioridade</span>

      <input 
        type="radio" 
        name="radio" 
        value="false"
        checked={selectedValue === "false"}
        onChange={e => handleChange(e.target)}
        /> 
      <span>Normal</span>

    </div>
  )
}

export default RadioButton;

