import db  from "../../DB/connection.js";

export const Create = (req, res) => {

    const {title , body ,user_id} = req.body;
    
    let statement = `SELECT full_name FROM users WHERE id = ?`;

    let values = [user_id];

    db.execute(statement, values, (error, results) => {
        if (error) {
            return res.status(500).json({message:`Find errorr in Queray ${error.message} `})
        }

        if (results.length === 0) {
            return res.status(404).json({message:`user not find `})
        }

        // Create blog after shure user in data base

        let statement = `INSERT INTO blogs (title, body, user_id) VALUES (?, ?, ?);`;

        let values = [title, body, user_id]
        
        db.execute(statement, values, (error, results) => {
            if (error) {
            return res.status(500).json({message:`Find errorr in Queray ${error.message} `})
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({message:`user not find ${error.message}`})
            }
            return res.status(201).json({ message: "Done add blog" });
        })
    })


}


export const Update = (req, res) => {
    const { blogId } = req.params
    const { title, user_id } = req.body
    //check user existance or no 
    db.execute(`SELECT full_name FROM users WHERE id=?`, [user_id], (error, results) => {
        if (error) {
            return res.status(500).json({ message: "Fail to execute query" + error.message })
            
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "user not found" })
            
        }

        // check if blog exsits

        db.execute(`SELECT * FROM blogs WHERE id=?`, [blogId], (error, results) => {
            if (error) {
                return res.status(500).json({message:"Fail to execute query"}+ error.message)
            }

            if (results.length === 0) {
                return res.status(404).json({message:"blog not found"})
            }
            // check if the user is the owner of the blog or no 
            if (user_id == results[0].user_id) {
                db.execute(`UPDATE blogs SET title =? WHERE id = ? AND  user_id =?`, [title, blogId, user_id], (error, results) => {
                    if (error) {
                        return res.status(500).json({ message: "Fail toexeute query" + error.message })
                        
                    }
                    return res.status(200).json({message:"Done", data:results})
                })

            }
        })


    })
}



export const Delete = (req, res) => {
    const { blogId } = req.params
    const { user_id } = req.body
    
    //check user existe or no

    let statement = `SELECT full_name FROM users WHERE id = ?`

    db.execute(statement, [user_id], (error, results) => {

        if (error) {

            return res.status(500).json({ message: "finde error in qeury" + error.message } );
        }
        if (results.length === 0) {

            return res.status(404).json({ message: " error user not found" })
        }
        // check blog find ?!
        db.execute(`SELECT * FROM blogs WHERE id=?`, [blogId], (error, results) => {
            if (error) {
                return res.status(500).json({ message: "Fail to execute query" + error.message} )
            }

            if (results.length === 0) {
                return res.status(404).json({ message: "blog not found" })
            }


         // check if the user is the owner of the blog or no 
            if (user_id == results[0].user_id) {
                db.execute(`DELETE FROM blogs  WHERE id = ? AND  user_id =?`, [ blogId, user_id], (error, results) => {
                    if (error) {
                        return res.status(500).json({ message: "Fail toexeute query" + error.message })
                        
                    }
                    return res.status(200).json({message:"Done", data:results})
                })


            } else {
                return res.status(403).json({ message: "you are not the owner this blog " });
            }


        })
    

    })
}


export const Getone = (req, res) => {
    const { blogId } = req.params
    


    db.execute(`SELECT * FROM blogs WHERE id = ?;`, [blogId], (error, results) => {

        if (error) return res.status(500).json({ message: "Error in query" + error.message });
        
        if (results.length === 0) return res.status(404).json({ message: "blog not found" })
        
        return res.status(200).json({ message: "Done get data for blog", data:results})
        
        

    })
}


export const Getall = (req, res) => {
    
    


    db.execute(`SELECT * FROM blogs `,  (error, results) => {

        if (error) return res.status(500).json({ message: "Error in query" + error.message });
        
        if (results.length === 0) return res.status(404).json({ message: "not found' blogs" })
        
        return res.status(200).json({ message: "Done get data for blog", data:results})
        
        

    })
}