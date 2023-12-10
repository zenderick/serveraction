import FormTodo from "@/app/todo/components/form.todo";
import ListTodo from "@/app/todo/components/list.todo";
import { prisma } from "@/libs/prismadb";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/api";

const TodoPage = async () => {
  const user: User | null = await currentUser();

  if (!user) {
    return <div className="text-center text-2xl">User not found</div>;
  }

  const todos = await prisma.todo.findMany({
    where: {
      userId: user.id,
    },
  });

  return (
    <div className="space-y-5">
      <h1 className="text-center text-3xl my-10">Todos: {user.firstName}</h1>
      <UserButton afterSignOutUrl="/" />
      <FormTodo />
      <ListTodo todos={todos} />
    </div>
  );
};

export default TodoPage;
