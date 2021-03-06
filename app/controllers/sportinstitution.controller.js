//sportinstitution
const db = require('../DBconnection')

class SportInstitutionController {
    //API get sport institutions
    async getSportInstitutions(req, res, next,) {
        try {
            let sql = `Select * from sportinstitution `
            let result = await db.query(sql)
            res.json(result.rows)

            // let sql1 = `Select * from sportinstitution where fk_director_id = 1`
            // let sql2 = `Select * from director where id = 1`

            // let sql1Result = await db.query(sql1)
            // let sql2Result = await db.query(sql2)

            // let json1 = JSON.stringify(sql1Result.rows)
            // // {
            // //     name: "Василий Иванович",
            // //     age: 35,
            // // };
              
            // let json2 = JSON.stringify(sql2Result.rows)
            // // {
            // //     address: {
            // //         street: "Широтная",
            // //         house: "29",
            // //         city: {
            // //             name: "Тюмень"
            // //         }
            // //     }
            // // }

            // let final =  JSON.parse(JSON.stringify(Object.assign(json1, json2)))
            
            // // let final =  JSON.parse(JSON.stringify(json1, json2))
            // res.json(final)

        }
        catch (error){
            console.error(error)
            next(error)
        }
    }


    async getAllFull(req, res, next) {
        try {
            let sql = `SELECT
                            
                            sportinstitution.id,
                            sportinstitution.name,
                            sportinstitution.classificationnumber,
                            sportinstitution.about,


                            locate.address,
                            locate.area,

                            director.fullname,


                            contacts.website,
                            contacts.phonenumber,
                            contacts.vk,
                            contacts.inst

                            
                        FROM 
                            sportinstitution 


                        
                        JOIN 
                            locate 
                        ON 
                            sportinstitution.fk_location_id = locate.id


                        JOIN 
                            director 
                        ON 
                            sportinstitution.fk_director_id = director.id

                    
                        JOIN 
                            contacts 
                        ON 
                            sportinstitution.fk_contacts_id = contacts.id;`

            let result = await db.query(sql)
            res.json(result.rows)
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }


    async getAllFullById(req, res, next) {
        try {
            const id = req.params.id
            let sql = `SELECT
                            
                            sportinstitution.id,
                            sportinstitution.name,
                            sportinstitution.classificationnumber,
                            sportinstitution.about,


                            locate.address,
                            locate.area,

                            director.fullname,


                            contacts.website,
                            contacts.phonenumber,
                            contacts.vk,
                            contacts.inst

                            
                        FROM 
                            sportinstitution 


                        
                        JOIN 
                            locate 
                        ON 
                            sportinstitution.fk_location_id = locate.id


                        JOIN 
                            director 
                        ON 
                            sportinstitution.fk_director_id = director.id

                    
                        JOIN 
                            contacts 
                        ON 
                            sportinstitution.fk_contacts_id = contacts.id
                            
                        WHERE sportinstitution.id = $1 `

            let result = await db.query(sql, [id])
            res.json(result.rows)
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }






    //API GET sport institution by id
    async getSportInstitutionById(req, res, next){
        try{
            const id = req.params.id
            let sql = `SELECT * FROM sportinstitution WHERE id = $1`
            let result = await db.query(sql, [id])
            res.json(result.rows)
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }
    //API POST new sport institution
    async postSportInstitution(req, res, next){
        try{
            const {name, classificationnumber, fk_location_id, fk_director_id, fk_contacts_id, about} = req.body
            const result = await db.query(`INSERT INTO sportinstitution (name, classificationnumber, fk_location_id, fk_director_id, fk_contacts_id, about) values($1, $2, $3, $4, $5, $6) RETURNING *`, [name, classificationnumber, fk_location_id, fk_director_id, fk_contacts_id, about])
            res.json(result.rows[0])
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }
    //API PUT sport institution
    async putSportInstitution(req, res, next){
        try{
            const {name, classificationnumber, fk_location_id, fk_director_id, fk_contacts_id, about} = req.body
            const id = req.params.id
            const result = await db.query(`UPDATE sportinstitution SET name = $1, classificationnumber = $2, fk_location_id = $3, fk_director_id = $4, fk_contacts_id = $5, about = $6 WHERE id = $7 RETURNING *`, [name, classificationnumber, fk_location_id, fk_director_id, fk_contacts_id, about, id])
            res.json(result.rows)
        }
        catch (error){
            console.error(error)
            next(error)
        }
    }
    //API DELETE sport institution
    async deleteSportInstitution(req, res, next){
        try{
            let sql = `DELETE FROM sportinstitution WHERE id = $1`
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

module.exports = new SportInstitutionController()