import db from '../../DB/connection.js';

export const Register = (req, res) => {
    const { email, full_name, password, dob } = req.body;

    let statement = `SELECT email FROM users WHERE email = ? `
    let values = [email]

    db.execute(statement,values, (error, results) => {
        if (error)
            return res.status(500).json({ message: "Fail to execute Quary" })
        if (results.length > 0) 
            return res.status(409).json({ message: "Email already exsits" })
        
        let statement = `INSERT INTO users (email, full_name, password, dob) values(?,?,?,?)`
        let values = [email, full_name, password, dob]


        db.execute(statement , values , (error, results) => {
                if (error | results.affectedRows===0) {
                    return res.status(500).json({ message: "Fail to execute Quary" })                
                }
                return res.status(201).json({ message: "Mail Created", data: results });
                
            })
            
    })
    
}

export const Login = (req, res) => {
    const { email, password } = req.body;

    let statement = `SELECT id FROM users WHERE  email = ? AND password = ?`
    let values = [email, password];
    db.execute(statement, values, (error, results) => {
        if (error)
            return res.status(500).json({ message: "Fail to execute Query" })
        if (!results.length)
            return res.status(404).json({ message: "Incorect email OR password" })
        return res.status(200).json({ message: "Login successfully", data:results })
    });
}