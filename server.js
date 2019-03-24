let express = require('express')

let bodyParser = require('body-parser')

let app = express()


// Template

app.set('view engine', 'ejs')


// Middleware

app.use('/assets', express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(bodyParser.json())


// Routes

app.get('/', (request, response) =>{
    //response.send('Hi Everyone')
    response.render('pages/index',{msg: 'Hi Everyone'})
})

app.post('/', (request, response) =>{
    if(request.body.message === undefined || request.body.message === ''){
        response.render('pages/index',{msg: 'no'}) 
    }else{
        response.render('pages/index',{msg: 'yes'}) 
    }
    console.log(request.body)
})

app.listen(8080)