import React, { useRef } from 'react'
import "./style.css"

interface Props{
    todo : string | undefined;
    setTodo : React.Dispatch<React.SetStateAction<string | undefined>>;
    handleAdd : (e : React.FormEvent) => void;
}
const InputField : React.FC<Props> = ({todo, setTodo, handleAdd}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form className='input' onSubmit={(e) => {
        handleAdd(e)
        inputRef.current?.blur();
        }}>

        <input 
        ref={inputRef}
        value={todo}
        onChange={(e)=>setTodo(e.target.value)}
        type="text" placeholder='Enter a task' className='input_box' />
        <button className='input_submit' type='submit'>Go</button>
        
    </form>
  )
}

export default InputField