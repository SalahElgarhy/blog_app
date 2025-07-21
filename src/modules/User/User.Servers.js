import db from "./../../DB/connection.js";

export const userProfile = (req, res) => {
    const { id } = req.params;

    let statement = `SELECT email , full_name , YEAR(CURDATE()) - YEAR(dob) AS Age FROM users WHERE id = ?`

    db.execute(statement, [id], (error, results) => {
        if (error)
            return res.status(500).json({ message: "Fail to execute Query" })
        if (!results.length)
            return res.status(404).json({ message: "User not found" });
        return res.status(200).json({ message: "profile Fetched Successfully", data: results })
    })
}



export const userUpdate = (req, res) => {
    
    const { id } = req.params;
    const { full_name } = req.body;

    let statement = `UPDATE users SET full_name = ? WHERE id = ?;`
    let values = [full_name, id];

    db.execute(statement, values, (error, results) => {
        if (error) 
            return res.status(500).json({ message: "Error in Queray" })
        if (results.affectedRows === 0)
            return res.status(404).json({ message: "user not found!" })
        return res.status(200).json({ message: "updated successfully " });
    })


}


export const userDelete = (req, res) => {
    const { id } = req.params
    
    let statement = `DELETE FROM users WHERE id = ?;`;
    let values = [id]

    db.execute(statement, values, (error, results) => {
        if (error) {
            return res.status(500).json({ message:` Error in queray ${error.message}` })
            
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({message:"User not found or already deleted."})
        }
        return res.status(200).json({message:"Deleted user successfully"})
    })
}


export const userSearch = (req, res) => {
    
    const { full_name } = req.query
    
    let statement = `SELECT email, dob, YEAR(CURDATE()) - YEAR(dob) AS Age FROM users WHERE full_name = ?;`;

    let values = [full_name]
    
    db.execute(statement, values, (error, results) => {
        if (error) {
            return res.status(500).json({message:"Error in queray"})
        }

        if (results.length === 0) {
            return res.status(404).json({message:"user not found"})
        }

        return res.status(200).json({ message: "Done", data: results });
    })
}

