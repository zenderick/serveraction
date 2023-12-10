"use client";

import { useTransition } from "react";
import { TodoInterface } from "@/app/todo/interfaces/todo.interface"
import { FaSpinner, FaTrash } from "react-icons/fa6";
import { removeItem } from "../actions/todo.actions";
import toast from "react-hot-toast";

interface ItemTodo {
    todo: TodoInterface
}

const ItemTodo = ({todo}: ItemTodo) => {

    let [isPending, startTransition] = useTransition();

    const handleClickRemove = async (id: string) => {
        const res = await removeItem(id);
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success(res.success as string);
        }
      };

  return (
    <div className="flex justify-between items-center border border-gray-400 p-2 rounded mb-2">
        <span>{todo.title}</span>
        <button onClick={() => startTransition(() => handleClickRemove(todo.id))}>
        {isPending ? (
          <span className="block animate-spin">
            <FaSpinner className="transform rotate-90" />
          </span>
        ) : (
          <FaTrash />
        )} 
        </button>
    </div>
  )
}

export default ItemTodo