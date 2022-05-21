const db = require('../DBconnection')

//APIs
class LocateController {
    //API GET all locates
    async getLocates(req, res, next) {
        try {
            let sql = `SELECT * FROM locate`
            let result = await db.query(sql)
            res.json(result.rows)

        }
        catch (error){
            console.error(error)
            next(error)
        }
    }

    //API GET all areas
    async getLocatesArea(req, res, next) {
        try {
            let sql = `SELECT area FROM locate`
            let result = await db.query(sql)
            res.json(result.rows)

        }
        catch (error){
            console.error(error)
            next(error)
        }
    }


    //API GET locate by id
    async getLocateById(req, res, next){
        try{
            const id = req.params.id
            let sql = `SELECT * FROM locate WHERE id = $1`
            let result = await db.query(sql, [id])
            // res.send(result)
            res.json(result.rows)
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }
    //API POST new locate
    async postLocate(req, res, next){
        try{
            const {address, longitude, latitude, area} = req.body
            // console.log(name, surname)
            const result = await db.query(`INSERT INTO locate (address, longitude, latitude, area) values($1, $2, $3, $4) RETURNING *`, [address, longitude, latitude, area])
            res.json(result.rows[0])
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }
    //API PUT locate
    async putLocate(req, res, next){
        try{
            const {address, longitude, latitude, area} = req.body
            const id = req.params.id
            // console.log(name, surname)
            const result = await db.query(`UPDATE locate SET address = $1, longitude = $2, latitude = $3, area = $4 WHERE id = $5 RETURNING *`, [address, longitude, latitude, area, id])
            res.json(result.rows)
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }
    //API DELETE locate
    async deleteLocate(req, res, next){
        try{
            let sql = `DELETE FROM locate WHERE id = $1`
            let id = req.params.id
            const result = await db.query(sql, [id])
            res.json(result.rows)
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }
}

module.exports = new LocateController()