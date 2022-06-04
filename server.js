require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieSession = require("cookie-session")
const cookieParser= require('cookie-parser');
const router = require('./router/index');
const errorMiddleware = require('./middlewares/error-middleware');
const config = require('./config');

const app = express();

const PORT = config.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/api', router);
app.use(errorMiddleware);

app.use(cookieSession({
    name: 'session',
    keys: ["this's my secret"],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

const start = async() => {
  try {
      app.listen(PORT, () => console.log(`server was running on PORT = ${config.PORT}`))
  } catch (e) {
    console.log(e);
  }
}

start()

mongoose.connect(config.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connect to DB");
});
mongoose.connection.on("error", (err) => {
  console.log("Not succesfull conection to database" + err);
});