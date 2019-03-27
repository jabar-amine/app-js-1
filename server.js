let express = require('express')

let app = express()

let bodyParser = require('body-parser')

let session = require('express-session')

let passport = require('passport')

let LocalStrategy = require('passport-local').Strategy;

let Country = require('./models/Country')

let Person = require('./models/Person')

passport.use(new LocalStrategy(
    function(username, password, done) {
        Person.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));

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
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

app.get('/login', (request, response) =>{

    response.render('pages/login')

})

app.get('/', (request, response) =>{

    Country.all(function(items){

        response.render('pages/index',{countries: items})

    })

})

app.post('/', (request, response) =>{

    if (request.body.message === undefined || request.body.message === ''){

        request.flash('error', 'No message sent') 

        response.redirect('/')

    } else {
        
        Country.create(request.body.message, function(){

            request.flash('success', 'message is sent') 

            response.redirect('/')

        })

    }
    
})

app.get('/country/:id', (request, response) =>{

    Country.find(request.params.id, function(result){

        response.render('pages/show',{country: result})

    })

})

app.listen(8080)