let connection = require('../config/db')

let moment = require('../config/moment')

class Country{

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

    static find(id, cb){

        connection.query('SELECT * FROM country WHERE id = ? LIMIT 1',[id],(err, result)=>{

            if(err) throw err

            cb(new Country(result[0]))

        })

    }

}

module.exports = Country