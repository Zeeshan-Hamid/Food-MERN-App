const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const dbConnect = require('./database/db')
const foodRouter = require('./routes/food')

const app = express();
dbConnect();
app.use(express.json())
app.use(cors())


dotenv.config();
const port = process.env._PORT

app.use('/api',foodRouter)


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})



