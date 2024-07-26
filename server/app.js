const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const dbConnect = require('./database/db')
const foodRouter = require('./routes/food')
const authRouter = require("./routes/auth");
const cookieParser = require("cookie-parser");

const app = express();
dbConnect();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

dotenv.config();
const port = process.env._PORT;

app.use(authRouter);
app.use('/api',foodRouter)


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})



