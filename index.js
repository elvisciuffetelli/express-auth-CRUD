const express = require('express')
const colors = require('colors');
const dotenv = require('dotenv').config();
const cors = require('cors')
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 8000;



const app = express()
app.use(cors())
connectDB(app.listen(PORT, () => console.log('Listen on port ' + PORT)))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/exercises', require('./routes/exerciseRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

