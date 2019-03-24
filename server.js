let app = require('express')()

app.set('view engine', 'ejs')

app.get('/',(request,response) =>{
    //response.send('Hi Everyone')
    response.render('pages/index',{msg: 'Hi Everyone'})
})

app.listen(8080)