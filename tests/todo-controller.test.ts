import { v4 as uuidv4 } from 'uuid'
import supertest from 'supertest'
import app from '../src/app'
import TodoModel from '../src/models/todo'

let testTodo: {
  id: string
  title: string
  complete: boolean
}

beforeEach(() => {
  // 每次測試前重設資料
  TodoModel.todos = [
    { id: uuidv4(), title: 'Test Todo 1', complete: false },
    { id: uuidv4(), title: 'Test Todo 2', complete: true }
  ]
  testTodo = TodoModel.todos[0]
})

test('/GET/ 取得所有代辦事項', async () => {
  const res = await supertest(app).get('/todos')
  expect(res.status).toBe(200)
  expect(res.body.status).toBe('success')
  expect(res.body.data).toEqual(TodoModel.todos)
})

test('/POST/ 建立新的代辦事項', async () => {
  const title = 'Test Todo 3'
  const res = await supertest(app).post('/todos').send({ title })
  expect(res.status).toBe(200)
  expect(res.body.status).toBe('success')
  expect(res.body.data.title).toBe(title)
  expect(res.body.data.complete).toBe(false)
})

test('/GET/ 透過 ID 取得特定待辦事項', async () => {
  const res = await supertest(app).get(`/todo/${testTodo.id}`)
  expect(res.status).toBe(200)
  expect(res.body.status).toBe('success')
  expect(res.body.data).toEqual(testTodo)
})

test('/PUT/ 更新特定待辦事項', async () => {
  const updatedData = { title: 'Edit Todo test', complete: true }
  const res = await supertest(app).put(`/todo/${testTodo.id}`).send(updatedData)
  expect(res.status).toBe(200)
  expect(res.body.status).toBe('success')
  expect(res.body.data.title).toBe('Edit Todo test')
  expect(res.body.data.complete).toBe(true)
})

test('/DELETE/ 刪除特定待辦事項', async () => {
  const res = await supertest(app).delete(`/todo/${testTodo.id}`)
  expect(res.status).toBe(200)
  expect(res.body.status).toBe('success')
  expect(res.body.data.title).toBe(testTodo.title)
  expect(res.body.data.complete).toBe(testTodo.complete)

  const deletedTodo = TodoModel.findByPk(testTodo.id)
  expect(deletedTodo).toBeUndefined()
})

// 錯誤流程測試
describe('建立代辦，但缺少 Title 欄位', () => {
  test('/POST/ 請求應該返回 400', async () => {
    const res = await supertest(app).post('/todos')
    expect(res.text).toBe('Please enter valid title')
    expect(res.status).toBe(400)
  })

  test('/PUT/ 請求應該返回 400', async () => {
    const res = await supertest(app).put(`/todo/${testTodo.id}`)
    expect(res.text).toBe('Please enter valid title')
    expect(res.status).toBe(400)
  })
})

describe('透過不存在的 ID 取得待辦事項', () => {
  test('/GET/ 請求應該返回 404', async () => {
    const res = await supertest(app).get('/todo/non-existent-id')
    expect(res.text).toBe("Todo doesn't exist")
    expect(res.status).toBe(404)
  })

  test('/PUT/ 請求應該返回 404', async () => {
    const title = 'Edit Todo test'
    const res = await supertest(app).put('/todo/non-existent-id').send({ title })
    expect(res.text).toBe("Todo doesn't exist")
    expect(res.status).toBe(404)
  })

  test('/DELETE/ 請求應該返回 404', async () => {
    const res = await supertest(app).delete('/todo/non-existent-id')
    expect(res.text).toBe("Todo doesn't exist")
    expect(res.status).toBe(404)
  })
})
