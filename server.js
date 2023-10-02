require('dotenv').config();
const cors = require('cors');
const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
const router = require('./router/index');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/error-middleware');
// const { v4: uuid } = require('uuid');
// const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
      credentials: true,
      origin: process.env.CLIENT_URL,
    })
);
app.use('/', router);
app.use(errorMiddleware);

const PORT = process.env.PORT || config.get('PORT');


app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));

