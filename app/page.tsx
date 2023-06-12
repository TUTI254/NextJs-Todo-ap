import Link from "next/link";
import { prisma } from "./db";
import { TodoItem } from "./components/TodoItem";

function getTodos(){
 return prisma.todo.findMany() // get all todos from the database
}

async function  toggoleTodo(id: string, complete: boolean){
  "use server" //  this function is server code and never runs on the client only runs on the server

  await prisma.todo.update({ where: { id }, data: { complete } })
}
export default async function Home() {

  const  todos = await getTodos() //call our function to get todos
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Todos</h1>
        <Link className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none" href="/new">New </Link>
      </header>

      {/* list our Todos */}
      <ul className="pl-4">
        {todos.map(todo =>(
          <TodoItem  key={todo.id} {...todo} toggoleTodo={toggoleTodo}/>
        ))}
      </ul>
    </>
  )
}
