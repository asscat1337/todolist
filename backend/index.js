require('dotenv').config()
const express = require('express');
const cors = require('cors') 


const app = express()

const router = require('./router/router.js')

app.use(cors())
app.use(express.json())


app.use('/',router)




app.listen(process.env.PORT,()=>{
    console.log(`Server started on ${process.env.PORT}`)
})
