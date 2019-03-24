let express = require('express')

let app = express()

let bodyParser = require('body-parser')

let session = require('express-session')


// Template

app.set('view engine', 'ejs')


// Middleware

app.use('/assets', express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(bodyParser.json())

app.use(session({
    secret: 'codesecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use(require('./midlleware/flash'))


// Routes

app.get('/', (request, response) =>{

    response.render('pages/index')

})

app.post('/', (request, response) =>{

    if (request.body.message === undefined || request.body.message === ''){

        request.flash('error', 'No message sent') 

    } else {

        let Country = require('./models/Country')
        
        Country.create(request.body.message, function(){

            request.flash('success', 'message is sent') 

        })

    }

    response.redirect('/')
    
})

app.listen(8080)