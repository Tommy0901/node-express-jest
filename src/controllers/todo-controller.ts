import { type Request, type Response } from 'express'
import { errorMsg } from '../helpers/message-helper'
import Todo from '../models/todo'

class TodoController {
  getTodos (req: Request, res: Response): Record<string, any> {
    return res.json({ status: 'success', data: Todo.findAll() })
  }

  getTodo (req: Request, res: Response): Record<string, any> {
    const { id } = req.params as { id: string }
    const todo = Todo.findByPk(id)
    if (todo === undefined) return errorMsg(res, 404, "Todo doesn't exist")

    return res.json({ status: 'success', data: todo })
  }

  newTodo (req: Request, res: Response): Record<string, any> {
    const { title } = req.body as { title: string }
    if (typeof title !== 'string') return errorMsg(res, 400, 'Please enter valid title')

    return res.json({ status: 'success', data: Todo.create(title) })
  }

  editTodo (req: Request, res: Response): Record<string, any> {
    const { id } = req.params as { id: string }
    const { title, complete: isTrue } = req.body as { title: string, complete: boolean }
    if (typeof title !== 'string') return errorMsg(res, 400, 'Please enter valid title')

    const todo = Todo.findByPk(id)
    if (todo === undefined) return errorMsg(res, 404, "Todo doesn't exist")

    const complete = isTrue || todo.complete

    return res.json({ status: 'success', data: Todo.update(id, { title, complete }) })
  }

  removeTodo (req: Request, res: Response): Record<string, any> {
    const { id } = req.params as { id: string }
    const todo = Todo.findByPk(id)
    if (todo === undefined) return errorMsg(res, 404, "Todo doesn't exist")

    return res.json({ status: 'success', data: Todo.delete(id) })
  }
}

export default TodoController
