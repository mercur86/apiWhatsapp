import "dotenv/config"
import express from "express"
import cors from "cors"
import routes from "./infrastructure/router"
const port = process.env.PORT || 8101
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('tmp'))

const secretKey = 'wlana7c8'; // Reemplaza esto por una clave segura y guárdala de manera segura o en una variable de entorno

app.use(`/`,routes)

app.listen(port, () => console.log(`Ready...${port}`))
