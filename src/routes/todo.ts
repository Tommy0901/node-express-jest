import TodoController from '../controllers/todo-controller'
import Route from './route'

class TodoRoute extends Route {
  private readonly todoController = new TodoController()

  constructor () {
    super()
    this.setRoutes()
  }

  protected setRoutes (): void {
    this.router.get('/todos',
      this.todoController.getTodos.bind(this.todoController)
    )
    this.router.post('/todos',
      this.todoController.newTodo.bind(this.todoController)
    )
    this.router.get('/todo/:id',
      this.todoController.getTodo.bind(this.todoController)
    )
    this.router.put('/todo/:id',
      this.todoController.editTodo.bind(this.todoController)
    )
    this.router.delete('/todo/:id',
      this.todoController.removeTodo.bind(this.todoController)
    )
  }
}

export default TodoRoute
