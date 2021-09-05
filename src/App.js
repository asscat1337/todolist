import React,{useState,useEffect}  from 'react'
import axios from 'axios'


import ListItem from "./components/ListItem/ListItem";

const App =()=>{
    const [task,setTask] = useState('')
    const [todo,setTodo] = useState([])

    useEffect(()=>{
        async function fetchData(){
         const {data} = await axios.get('http://localhost:8080/')
         setTodo(data)
        }
        fetchData()
    },[])


    const onAddTask = async()=>{
        try{
           const {data} = await axios.post('http://localhost:8080/add',{title:task,complete:false})
        setTodo(prev=>[...prev,data])
            setTask('')
        }catch(e){
            console.log(e)
        }
    }
    const onChangeInput = (event)=>{
        setTask(event.target.value)
    }
    const onRemoveItem = async(id)=>{
        try{
            await axios.post('http://localhost:8080/delete',{id})
            setTodo(prevState => prevState.filter((item)=>item.id !== id))
        }catch(e){
            console.log(`Произошла ошибка ${e}`)
        }
    }
    const onCompleteData = async(id)=>{
        try{
            const findTask = todo.find((item)=>item.id===id)
            await axios.post('http://localhost:8080/update',findTask)
            setTodo(prevState => prevState.map((item,index)=>{
                if(item.id===id){
                    return {
                        ...item,
                        complete:!item.complete
                    }
                }else{
                    return item
                }
            }
            ))
        }catch(e){
            console.log(`Произошла ошибка при обновлении записи ${e}`)
        }
    }
    return(
       <div className="todo-container">
           <div className="todo-block">
              <div className="todo-header">
                  <h4>Список задач</h4>
              </div>
               <div className="todo__add-task">
                   <input type="text" placeholder="Введите текст задачи..."
                          onChange={onChangeInput}
                          value={task}/>
                   <button className="button__add-task" onClick={onAddTask}>
                       <img src="https://img.icons8.com/material-outlined/24/000000/plus--v1.png"/>
                   </button>
               </div>
                <div className="todo__list">
                    {todo.length ?
                        <>
                        {todo.map((task,idx)=>(
                                    <ListItem
                                        key={task.id}
                                        title={task.title}
                                        id={task.id}
                                        complete={task.complete}
                                        onComplete={(id)=>onCompleteData(id)}
                                        onRemoveItem={(data)=>onRemoveItem(data)}
                                    />
                                )
                            )}
                            </>
                        :
                        <div>Нет задач</div>
                    }
                </div>
           </div>
       </div>
    )
}
export default App;
