
const { error } = require('console');
const express = require('express');
const mysql = require("mysql2");
const bcrypt = require("bcrypt")
const app = express();
port = 3000
app.use(express.json())


// connect to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'blogs_app'
});

db.connect((error) => {
    if (error)
        return console.log(`Error in Conect To dataBase`)
    else
        return console.log("connection database succssfully");
})


// sing up

app.post("/auth/signup", async (req, res) => {
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
    
})

// login user
app.post("/auth/login", (req, res) => {
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
});

// get single user

app.get("/profile/:id", (req, res) => {
    const { id } = req.params;

    let statement = `SELECT email , full_name , YEAR(CURDATE()) - YEAR(dob) AS Age FROM users WHERE id = ?`

    db.execute(statement, [id], (error, results) => {
        if (error)
            return res.status(500).json({ message: "Fail to execute Query" })
        if (!results.length)
            return res.status(404).json({ message: "User not found" });
        return res.status(200).json({ message: "profile Fetched Successfully", data: results })
    })
});

// update user


app.patch("/update/:id", (req, res) => {
    
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


})

app.delete("/delete/:id", (req, res) => {
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
})

app.get("/search", (req, res) => {
    
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
})



app.listen(port, () => {
    console.log(`sever is run in port ${port}`);
})