let connection = require('../config/db')

class Country{

    static create(name, cb){

        connection.query('INSERT INTO country set uid = ?, code = ?, name = ?, currency = ?',['UIDV','COD',name,'CUR'],(err, result)=>{

            if(err) throw err

            cb(result)
            
        })

    }

}

module.exports = Country