import { TodoInterface } from "@/app/todo/interfaces/todo.interface";
import ItemTodo from "./item.todo";

interface ListTodo{
    todos: TodoInterface[];
}

const ListTodo = ({todos}: ListTodo) => {
    if (!todos.length) return <div className="text-center" >No hay tareas</div>;

  return (
    <div>
        {
            todos.map((todo) => (
                <ItemTodo key={todo.id} todo={todo}/>
            ))
        }
    </div>
  )
}

export default ListTodo