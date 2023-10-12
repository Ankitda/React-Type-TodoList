import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../model'
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai"
import { MdDone } from "react-icons/md"

interface Props {
    todo: Todo;
    todoList: Todo[];
    setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({ todo, todoList, setTodoList }) => {

    const [isEdited, setIsEdited] = useState<boolean>(false);
    const [todoValue, setTodoValue] = useState<string>(todo.todo);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        inputRef.current?.focus();
    },[isEdited])

    const handleDone = (id: number) => {
        setTodoList(todoList.map((todo) => (
            todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
        )))
    }
    const handleDelete = (id: number) => {
        setTodoList(todoList.filter((todo) => todo.id !== id))
    }

    const handleEdit = (e:React.FormEvent, id: number) => {
        e.preventDefault();
        setTodoList(todoList.map((todo)=>(
            todo.id === id ? {...todo, todo : todoValue} : todo
        )))
        setIsEdited(false);
    }

    return (
        <form className='todos__single' onSubmit={(e)=> {
            handleEdit(e,todo.id)
        }}>
            {isEdited ? (
                <input
                    className='todos__single--text'
                    ref={inputRef} 
                    type="text" 
                    value={todoValue}
                    onChange={(e)=>{
                        setTodoValue(e.target.value);
                    }}
                />
            ): todo.isDone ? (
            <s className='todos__single--text'>{todo.todo}</s>
            ) : (
            <span className='todos__single--text'>{todo.todo}</span>
            )}
            <div>
                <span className='icon' onClick={() => {
                    if (!isEdited && !todo.isDone) {
                        setIsEdited(!isEdited);
                    }
                }
                }><AiOutlineEdit /></span>
                <span className='icon' onClick={() => { handleDelete(todo.id) }}><AiFillDelete /></span>
                <span className='icon' onClick={() => { handleDone(todo.id) }}><MdDone /></span>
            </div>
        </form>
    )
}

export default SingleTodo