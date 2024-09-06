import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { CiEdit } from "react-icons/ci";
import { v4 as uuidv4 } from 'uuid';
import { MdDelete } from "react-icons/md";


function App() {
  const [todo, setTodo] = useState("")  //input text which we are writing
  const [todos, setTodos] = useState([]) //  it is a blank array and it will store all written todos 
  const [showFinished, setshowFinished] = useState(true)




  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }




  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()

  }

  const handleDelete = (e, id) => {

    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    //newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    console.log(todos)
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }


  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto bg-violet-100 my-5 rounded-xl p-5 min-h-[80vh] md:w-1/2">
        <h1 className='font-bold text-center text-3xl'>iTask - Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-xl font-bold'>Add a Todo</h2>
          <div className="flex">
            <input onChange={handleChange} value={todo} type="text" className='w-full rounded-lg px-5 py-1 bg-violet-200' />
            <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white text-sm font-bold rounded-lg mx-2 disabled:bg-violet-600'>Save</button>
          </div>
        </div>
        <input className='my-4' onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
          {todos.map(item => {

            return (showFinished || item.isCompleted) && <div key={item.id} className="todo flex  justify-between my-3">
              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white text-sm font-bold rounded-md mx-1'> <CiEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white text-sm font-bold rounded-md mx-1'><MdDelete />
                </button>
              </div>
            </div>
          })}
        </div>

      </div>

    </>
  )
}

export default App
