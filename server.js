import { App } from '@tinyhttp/app'

const app = new App()

app.use((req, res) => void res.send('Hello world!'))

app.listen(3000, () => console.log('Started on http://localhost:3000'))