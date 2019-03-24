let app = require('express')()

app.get('/',(request,response) =>{
    response.send('Hi Everyone')
})

app.listen(8080)