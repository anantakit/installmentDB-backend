const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const financialInfo = require('./src/db/financialInfo')

mongoose.connect('mongodb://103.74.254.244:27017/oddsInstallmentDB' , {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

app.use(bodyParser.json())
const port = 3000

app.get('/', (req, res) => res.send({ mesaage: 'hq'}))
app.get('/finacials', (req, res) => {
    const financialInfo = financialInfo
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))