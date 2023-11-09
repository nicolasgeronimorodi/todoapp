import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/shadcn/ui/card'

import { TodoItem } from '@/lib/types/TodoItem'

interface TodoCardProps {
  todo: TodoItem
}
export default function TodoCard({ todo }: TodoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{todo.name}</CardTitle>
        <CardDescription>{todo.message}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, ipsum.
          Incidunt fugit laborum harum veniam. Vitae sint voluptatibus,
          consectetur, aliquid
        </p>
      </CardContent>
      <CardFooter>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum,
          excepturi!
        </p>
      </CardFooter>
    </Card>
  )
}
