let express = require('express')

let app = express()

let bodyParser = require('body-parser')

let session = require('express-session')

let passport = require('passport')


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

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login' }));

app.get('/', (request, response) =>{

    let Country = require('./models/Country')

    Country.all(function(items){

        response.render('pages/index',{countries: items})

    })

})

app.post('/', (request, response) =>{

    if (request.body.message === undefined || request.body.message === ''){

        request.flash('error', 'No message sent') 

        response.redirect('/')

    } else {

        let Country = require('./models/Country')
        
        Country.create(request.body.message, function(){

            request.flash('success', 'message is sent') 

            response.redirect('/')

        })

    }
    
})

app.get('/country/:id', (request, response) =>{

    let Country = require('./models/Country')

    Country.find(request.params.id, function(result){

        response.render('pages/show',{country: result})

    })

})

app.listen(8080)