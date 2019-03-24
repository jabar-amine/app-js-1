let exs = require('express')

let app = exs()

app.use('/assets', exs.static('public'))

app.set('view engine', 'ejs')

app.get('/', (request, response) =>{
    //response.send('Hi Everyone')
    response.render('pages/index',{msg: 'Hi Everyone'})
})

app.post('/', (request, response) =>{
    console.log(request.body)
})

app.listen(8080)