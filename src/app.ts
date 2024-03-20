import express, { type Request, type Response } from 'express'

const app = express()
const port = 3000

app.get('/', (req: Request, res: Response) => {
  res.send('This is exress porject.')
})

app.listen(port, () => { console.info(`Server is running on http://localhost:${port}`) })

module.exports = app
