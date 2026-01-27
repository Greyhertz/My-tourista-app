import { queryOptions } from "@tanstack/react-query"

export default function createTodoQueryOptions(id: number) {
    return queryOptions({
          queryKey: ['todos', id],
          queryFn: getTodos,
       
    })

   async function getTodos() {
    await new Promise(resolve => setTimeout(resolve, 1000)); // simulate delay
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
    return response.json()
  }
} 