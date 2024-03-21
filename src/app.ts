import express from 'express'
import { router } from './routes/router'

const app = express()
const port = 3000

app.use(express.json())

for (const route of router) {
  app.use(route.getRouter())
}

app.listen(port, () => { console.info(`Server is running on http://localhost:${port}`) })

export default app
