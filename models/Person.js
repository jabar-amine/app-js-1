let connection = require('../config/db')

let moment = require('../config/moment')

class Person{

    constructor (row){
        
        this.row = row

    }

    get id(){

        return this.row.id

    }

    get name(){

        return this.row.name

    }

    get created_at(){

        return moment(this.row.created_at)

    }

    static create(name, cb){

        connection.query('INSERT INTO country set uid = ?, code = ?, name = ?, currency = ?, created_at = ?, updated_at = ?',['UIDV','COD',name,'CUR',new Date(),new Date()],(err, result)=>{

            if(err) throw err

            cb(result)
            
        })

    }

    static all(cb){

        connection.query('SELECT * FROM country',(err, result)=>{

            if(err) throw err

            cb(result.map((row) => new Country(row)))

        })

    }

    static findOne(username, cb){

        connection.query('SELECT * FROM person WHERE username = ? LIMIT 1',[username],(err, result)=>{

            if(err) throw err

            cb(new Person(result[0]))

        })

    }

    static validPassword(password, cb){

        connection.query('SELECT * FROM person WHERE username = ? LIMIT 1',[username],(err, result)=>{

            if(err) throw err

            cb(new Person(result[0]))

        })

    }

}

module.exports = Person