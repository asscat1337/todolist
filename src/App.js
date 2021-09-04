import React,{useState}  from 'react'

import ListItem from "./components/ListItem/ListItem";

const App =()=>{
    const [task,setTask] = useState('')
    const [todo,setTodo] = useState([
        {
            name:'Выучить React',
            complete:false
        },
        {
            name:'Сделать TODO',
            complete:false
        }
    ])
    const onAddTask = ()=>{
        setTodo(prev=>[...prev,
            {
                name:task,
                complete:false
            }
            ])
        setTask('')
    }
    const onChangeInput = (event)=>{
        setTask(event.target.value)
    }
    const onRemoveItem = (id)=>{
        setTodo(prevState => prevState.filter((item,idx)=>idx !== id))
    }
    const onCompleteData = (id)=>{
      setTodo(prevState => prevState.map((item,index)=>{
          if(index===id){
              return {
                  ...item,
                  complete:!item.complete
              }
          }else{
              return item
          }
      }
      ))
        console.log(todo)
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
                                        key={idx}
                                        name={task.name}
                                        id={idx}
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
