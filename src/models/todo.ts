import { v4 as uuidv4 } from 'uuid'

interface Todo {
  id: string
  title: string
  complete: boolean
}

interface fields {
  title: string
  complete?: boolean
}

class TodoModel {
  todos: Todo[]
  constructor () {
    this.todos = [
      {
        id: uuidv4(),
        title: '這是預設資料',
        complete: true
      }
    ]
  }

  findAll (): Todo[] {
    return this.todos
  }

  findByPk (id: string): Todo | undefined {
    return this.todos.find((todo) => todo.id === id)
  }

  create (title: string): Todo {
    const newTodo = {
      id: uuidv4(),
      title,
      complete: false
    }
    this.todos.push(newTodo)
    return newTodo
  }

  update (id: string, updatedFields: fields): Todo | undefined {
    const todo = this.findByPk(id)
    if (todo != null) {
      Object.assign(todo, updatedFields)
    }
    return todo
  }

  delete (id: string): Todo | undefined {
    const index = this.todos.findIndex((todo) => todo.id === id)
    if (index !== -1) {
      return this.todos.splice(index, 1)[0]
    }
  }
}

export default new TodoModel()
