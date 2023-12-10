"use client"

import { useRef } from "react";
import { createTodo } from "../actions/todo.actions";
import ButtonForm from "./button.form";
import toast from "react-hot-toast";
import { TodoZodSchema } from "../schema/todo.zod.schema";
import { ZodError } from "zod";


const FormTodo = () => {

    const formref = useRef<HTMLFormElement>(null);

    const handleSubmit = async(data: FormData) => {

        const title = data.get("title") as string;

        try {
          TodoZodSchema.parse({ title });

          const resBack = await createTodo(title);
          if (!resBack.success) {
            return toast.error(resBack.message);
          }

          toast.success(resBack.message);

        } catch (error) {
          if (error instanceof ZodError) {
            return error.issues.map((issue) => toast.error(issue.message));
          }
        } finally{
            formref.current?.reset();
        }

    }

  return (
    <form ref={formref} action={handleSubmit} className="flex" >
        <input type="text" name="title" className="w-full rounded border border-gray-400 mr-2 p-2" />
        <ButtonForm/>
    </form>
  )
}

export default FormTodo